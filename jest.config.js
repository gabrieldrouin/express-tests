import { createDefaultPreset } from "ts-jest";

/** @type {import('ts-jest').JestConfigWithTsJest} */
const jestConfig = {
  ...createDefaultPreset(),
  globals: {
    "ts-jest": {
      tsconfig: "./tsconfig.test.json",
    },
  },
};

export default jestConfig;
