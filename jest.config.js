// eslint-disable-next-line import/no-extraneous-dependencies
const { jestConfigBase } = require('./jest.config.base');

module.exports = {
  ...jestConfigBase,
  coverageThreshold: {
    global: {
      statements: 88,
      branches: 77,
      functions: 90,
      lines: 88
    }
  },
  setupFiles: [...jestConfigBase.setupFiles]
};
