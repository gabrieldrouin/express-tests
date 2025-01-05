// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import plugin from "eslint-plugin-jest";

export default tseslint.config(
  {
    ignores: ["**/*.js"],
  },
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ["**/*.spec.js", "**/*.test.js"],
    plugins: { jest: plugin },
    languageOptions: {
      globals: plugin.environments.globals.globals,
    },
    ...plugin.configs["flat/recommended"],
  },
);
