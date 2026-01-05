import type { Config } from "jest";

const config: Config = {
  preset: `ts-jest`,
  testEnvironment: `node`,
  roots: ["<rootDir>/tests"],
  testMatch: ["**/*.test.ts"],
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { useESM: true }],
  },
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  extensionsToTreatAsEsm: [".ts"],
};
export default config;
