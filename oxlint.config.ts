import { defineConfig } from "oxlint";
import core from "ultracite/oxlint/core";
import jsPlugins from "ultracite/oxlint/js-plugins";
import react from "ultracite/oxlint/react";
import vitest from "ultracite/oxlint/vitest";
// These plugins load typescript-eslint, which does not support TypeScript 7 yet.
const selectedJsPluginNames = new Set(["react-doctor"]);
const selectedJsPluginRulePrefixes = new Set(["react-doctor"]);

const selectedJsPlugins = {
  ...jsPlugins,
  ...(jsPlugins.jsPlugins === undefined || jsPlugins.jsPlugins === null
    ? {}
    : {
        jsPlugins: jsPlugins.jsPlugins.filter(
          (plugin) =>
            typeof plugin !== "string" && selectedJsPluginNames.has(plugin.name)
        ),
      }),
  ...(jsPlugins.overrides === undefined
    ? {}
    : {
        overrides: jsPlugins.overrides.map((override) => ({
          ...override,
          rules: Object.fromEntries(
            Object.entries(override.rules ?? {}).filter(([ruleName]) =>
              selectedJsPluginRulePrefixes.has(
                ruleName.split("/")[0] ?? ruleName
              )
            )
          ),
        })),
      }),
  rules: Object.fromEntries(
    Object.entries(jsPlugins.rules ?? {}).filter(([ruleName]) =>
      selectedJsPluginRulePrefixes.has(ruleName.split("/")[0] ?? ruleName)
    )
  ),
};

export default defineConfig({
  extends: [core, react, vitest, selectedJsPlugins],
  ...(core.ignorePatterns === undefined
    ? {}
    : { ignorePatterns: core.ignorePatterns }),
  // This Vite SPA has no Next.js image pipeline; native static assets are the correct runtime API.
  rules: {
    "react-doctor/nextjs-no-img-element": "off",
  },
});
