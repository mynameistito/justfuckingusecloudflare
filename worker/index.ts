interface Env {
  ASSETS: {
    fetch: (request: Request) => Promise<Response>;
  };
}

export { DemoQuota } from "./demo-quota";

export default {
  fetch(request: Request, env: Env): Promise<Response> {
    return env.ASSETS.fetch(request);
  },
};
