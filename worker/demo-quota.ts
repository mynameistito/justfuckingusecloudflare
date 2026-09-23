import { DurableObject } from "cloudflare:workers";

export interface QuotaDecision {
  readonly allowed: boolean;
  readonly used: number;
  readonly limit: number;
  readonly resetAt: string;
}

/** A strongly consistent, per-demo daily usage gate. */
export class DemoQuota extends DurableObject<Env> {
  public constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
    this.ctx.storage.sql.exec(
      "CREATE TABLE IF NOT EXISTS usage (id INTEGER PRIMARY KEY CHECK (id = 1), used INTEGER NOT NULL)"
    );
  }

  public async take(limit: number, resetAt: string): Promise<QuotaDecision> {
    if (!Number.isInteger(limit) || limit < 1 || limit > 10_000) {
      throw new Error("Invalid quota limit");
    }

    const current =
      [
        ...this.ctx.storage.sql.exec<{ readonly used: number }>(
          "SELECT used FROM usage WHERE id = 1"
        ),
      ][0]?.used ?? 0;

    if (current >= limit) {
      return { allowed: false, limit, resetAt, used: current };
    }

    const used = current + 1;
    this.ctx.storage.sql.exec(
      "INSERT INTO usage (id, used) VALUES (1, ?) ON CONFLICT(id) DO UPDATE SET used = excluded.used",
      used
    );
    await this.ctx.storage.setAlarm(Date.parse(resetAt));

    return { allowed: true, limit, resetAt, used };
  }

  public override async alarm(): Promise<void> {
    await this.ctx.storage.deleteAll();
  }
}
