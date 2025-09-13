'use strict';

var test = require('tape-catch');
var summary = require('../../src/summary');

const aPass = { messages: [] };
const aWarning = { messages: ['A warning'], warningCount: 1, errorCount: 0 };
const aError = { messages: ['A error'], warningCount: 0, errorCount: 1 };

test('summary :: A Pass', async function (t) {
  process.env.FORCE_COLOR = 1;
  t.plan(2);
  const result = summary([aPass]);
  t.ok(result, 'returns summary');
  t.equal(result, '\n\x1B[1m1 file checked.\x1B[22m  \x1B[1m1 passed.\x1B[22m  \x1B[1m0 failed.\x1B[22m\n');
});

test('summary :: A Warning', async function (t) {
  process.env.FORCE_COLOR = 1;
  t.plan(2);
  const result = summary([aWarning]);
  t.ok(result, 'returns summary');
  t.equal(
    result,
    '\n\x1B[1m1 file checked.\x1B[22m  \x1B[1m0 passed.\x1B[22m  \x1B[1m1 failed.\x1B[22m  \x1B[33m\x1B[1m1 warning.\x1B[22m\x1B[39m  \x1B[31m\x1B[1m0 errors.\x1B[22m\x1B[39m\n'
  );
});

test('summary :: A Error', async function (t) {
  process.env.FORCE_COLOR = 1;
  t.plan(2);
  const result = summary([aError]);
  t.ok(result, 'returns summary');
  t.equal(
    result,
    '\n\x1B[1m1 file checked.\x1B[22m  \x1B[1m0 passed.\x1B[22m  \x1B[1m1 failed.\x1B[22m  \x1B[33m\x1B[1m0 warnings.\x1B[22m\x1B[39m  \x1B[31m\x1B[1m1 error.\x1B[22m\x1B[39m\n'
  );
});

test('summary :: A mix of Pass/Warning/Errors', async function (t) {
  process.env.FORCE_COLOR = 1;
  t.plan(2);
  const result = summary([aPass, aPass, aWarning, aWarning, aError, aError]);
  t.ok(result, 'returns summary');
  t.equal(
    result,
    '\n\x1B[1m6 files checked.\x1B[22m  \x1B[1m2 passed.\x1B[22m  \x1B[1m4 failed.\x1B[22m  \x1B[33m\x1B[1m2 warnings.\x1B[22m\x1B[39m  \x1B[31m\x1B[1m2 errors.\x1B[22m\x1B[39m\n'
  );
});
