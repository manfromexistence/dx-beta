/**
 * Commitlint Config
 */
const commitlintConfig = {
  extends: ['@commitlint/config-conventional'],
  plugins: ['commitlint-plugin-function-rules']
};

module.exports = commitlintConfig;
