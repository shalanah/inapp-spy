module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  coveragePathIgnorePatterns: [
    "/src/tests/",
    "/src/*.test.ts",
    "/src/fixtures/",
  ],
};
