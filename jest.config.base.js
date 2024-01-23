module.exports.jestConfigBase = {
  transform: {
    "^.+\\.ts$": [
      "ts-jest",
      {
        isolatedModules: true,
      },
    ],
  },
  testPathIgnorePatterns: [
    "<rootDir>/dist/",
    "<rootDir>/lib/",
    "<rootDir>/node_modules/",
  ],
  testRegex: "(<rootDir>/src/.*|(\\.|/)(test|spec))\\.ts$",
  moduleFileExtensions: ["ts", "js", "json"],
  collectCoverage: true,
  coverageReporters: [["lcov", "html", { skipFull: true }]],
  collectCoverageFrom: [
    "src/**/*.ts",
    "!**/*/index.*",
    "!src/tests/**/*",
    "!src/models/**/*",
    "!src/resolvers/**/*",
    "!src/tests/**/*",
  ],
  setupFiles: [],
};
