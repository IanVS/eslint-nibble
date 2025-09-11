/*
These will be used as custom formatters.
 */

const summary = require.resolve('../summary.js');
const stats = require.resolve('../stats.js');
const detailed = require.resolve('eslint-formatter-friendly');

module.exports = {
  stats,
  summary,
  detailed,
};
