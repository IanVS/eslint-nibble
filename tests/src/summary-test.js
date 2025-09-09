'use strict';

var test = require('tape-catch');
var summary = require('../../src/summary');

const aPass = { messages: [] };
const aWarning = { messages: ['A warning'], warningCount: 1, errorCount: 0 };
const aError = { messages: ['A error'], warningCount: 0, errorCount: 1 };

test('summary :: A Pass', async function (t) {
  t.plan(2);
  const result = summary([aPass]);
  t.ok(result, 'returns summary');
  t.equal(result, '\n1 file checked.  1 passed.  0 failed.\n', 'Summary with 1 pass, 0 fail');
});

test('summary :: A Warning', async function (t) {
  t.plan(2);
  const result = summary([aWarning]);
  t.ok(result, 'returns summary');
  t.equal(result, '\n1 file checked.  0 passed.  1 failed.  1 warning.  0 errors.\n', 'Summary with 0 pass, 1 fail');
});

test('summary :: A Error', async function (t) {
  t.plan(2);
  const result = summary([aError]);
  t.ok(result, 'returns summary');
  t.equal(result, '\n1 file checked.  0 passed.  1 failed.  0 warnings.  1 error.\n', 'Summary with 0 pass, 1 fail');
});

test('summary :: A mix of Pass/Warning/Errors', async function (t) {
  t.plan(2);
  const result = summary([aPass, aPass, aWarning, aWarning, aError, aError]);
  t.ok(result, 'returns summary');
  t.equal(result, '\n6 files checked.  2 passed.  4 failed.  2 warnings.  2 errors.\n', 'Summary with 2 pass, 4 fail');
});
