import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginMarkdown from "eslint-plugin-markdown";
import pluginJsonc from "eslint-plugin-jsonc";
import pluginCss from "eslint-plugin-css";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    // Alle Dateitypen, die geprüft werden sollen
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx,json,css,md}"],

    // Plugins für zusätzliche Dateitypen
    plugins: {
      js,
      markdown: pluginMarkdown,
      jsonc: pluginJsonc,
      css: pluginCss,
    },

    // Standard-Regeln
    extends: ["js/recommended"],

    // Globale Variablen aus Browser + Node erlauben
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
]);
