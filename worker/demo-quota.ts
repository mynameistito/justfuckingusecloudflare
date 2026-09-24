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
      "CREATE TABLE IF NOT EXISTS usage (id INTEGER PRIMARY KEY CHECK (id = 1), used INTEGER NOT NULL, reset_at INTEGER NOT NULL DEFAULT 0)"
    );
    const columns = [
      ...this.ctx.storage.sql.exec<{ readonly name: string }>(
        "PRAGMA table_info(usage)"
      ),
    ];
    if (!columns.some(({ name }) => name === "reset_at")) {
      this.ctx.storage.sql.exec(
        "ALTER TABLE usage ADD COLUMN reset_at INTEGER NOT NULL DEFAULT 0"
      );
    }
  }

  public async take(limit: number, resetAt: string): Promise<QuotaDecision> {
    if (!Number.isInteger(limit) || limit < 1 || limit > 10_000) {
      throw new Error("Invalid quota limit");
    }

    const resetTimestamp = Date.parse(resetAt);
    if (!Number.isFinite(resetTimestamp) || resetTimestamp <= Date.now()) {
      throw new Error("Invalid quota reset time");
    }

    const [stored] = this.ctx.storage.sql.exec<{
      readonly used: number;
      readonly reset_at: number;
    }>("SELECT used, reset_at FROM usage WHERE id = 1");
    const current =
      stored && (stored.reset_at === 0 || stored.reset_at === resetTimestamp)
        ? stored.used
        : 0;

    if (current >= limit) {
      return { allowed: false, limit, resetAt, used: current };
    }

    const used = current + 1;
    this.ctx.storage.sql.exec(
      "INSERT INTO usage (id, used, reset_at) VALUES (1, ?, ?) ON CONFLICT(id) DO UPDATE SET used = excluded.used, reset_at = excluded.reset_at",
      used,
      resetTimestamp
    );
    await this.ctx.storage.setAlarm(resetTimestamp);

    return { allowed: true, limit, resetAt, used };
  }

  public override alarm(): void {
    this.ctx.storage.sql.exec("DELETE FROM usage WHERE id = 1");
  }
}
