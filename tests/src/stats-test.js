'use strict';

const test = require('tape');
const chalk = require('chalk');
const stats = require('../../src/stats.js');

const noIssues = require('../fixtures/reports/no-issues.js');
const oneFileOneErrorOneFixableError = require('../fixtures/reports/one-file-one-error-one-fixable-error.js');
const oneFileOneError = require('../fixtures/reports/one-file-one-error.js');
const oneFileOneFatalError = require('../fixtures/reports/one-file-one-fatal-error.js');
const oneFileOneWarning = require('../fixtures/reports/one-file-one-warning.js');
const oneFileTwoErrorsNoWarningsOneRule = require('../fixtures/reports/one-file-two-errors-no-warnings-one-rule.js');
const oneFileTwoErrorsNoWarningsTwoRules = require('../fixtures/reports/one-file-two-errors-no-warnings-two-rules.js');
const oneFileTwoErrorsNoWarningsOneFixableError = require('../fixtures/reports/one-file-two-errors-one-fixable-error.js');
const twoFilesTwoErrorsNoWarningsOneRule = require('../fixtures/reports/two-files-two-errors-no-warnings-one-rule.js');
const twoFilesTwoErrorsNoWarningsTwoRules = require('../fixtures/reports/two-files-two-errors-no-warnings-two-rules.js');

process.stdout.columns = 100;

test('stats formatter :: No Issues', function (t) {
  chalk.level = 1;
  t.plan(2);
  const result = stats(noIssues.results);
  t.ok(result, 'returns result');
  t.deepEqual(result, []);
});

test('stats group formatter :: One Error, One Fixable Error', function (t) {
  chalk.level = 1;
  t.plan(2);
  const result = stats(oneFileOneErrorOneFixableError.results);
  t.ok(result, 'returns result');
  t.deepEqual(result, [
    {
      name: 'semi: \x1B[35m1\x1B[39m|\x1B[41m \x1B[49m',
      value: 'semi',
      short: 'semi',
    },
  ]);
});

test('stats formatter :: One Error', function (t) {
  chalk.level = 1;
  t.plan(2);
  const result = stats(oneFileOneError.results);
  t.ok(result, 'returns result');
  t.deepEqual(result, [
    {
      name: 'no-unused-vars: \x1B[35m1\x1B[39m|\x1B[41m \x1B[49m',
      value: 'no-unused-vars',
      short: 'no-unused-vars',
    },
  ]);
});

test('stats formatter :: One Fatal Error', function (t) {
  chalk.level = 1;
  t.plan(2);
  const result = stats(oneFileOneFatalError.results);
  t.ok(result, 'returns result');
  t.deepEqual(result, [
    { name: 'undefined: \x1B[35m1\x1B[39m|\x1B[41m \x1B[49m', value: 'undefined', short: 'undefined' },
  ]);
});

test('stats formatter :: One Warning', function (t) {
  chalk.level = 1;
  t.plan(2);
  const result = stats(oneFileOneWarning.results);
  t.ok(result, 'returns result');
  t.deepEqual(result, [
    { name: 'no-unused-vars: \x1B[35m1\x1B[39m|\x1B[43m \x1B[49m', value: 'no-unused-vars', short: 'no-unused-vars' },
  ]);
});

test('stats formatter :: One File, Two Errors, One Rule', function (t) {
  chalk.level = 1;
  t.plan(2);
  const result = stats(oneFileTwoErrorsNoWarningsOneRule.results);
  t.ok(result, 'returns result');
  t.deepEqual(result, [
    { name: 'no-unused-vars: \x1B[35m2\x1B[39m|\x1B[41m  \x1B[49m', value: 'no-unused-vars', short: 'no-unused-vars' },
  ]);
});

test('stats formatter :: One File, Two Errors, Two Rules', function (t) {
  chalk.level = 1;
  t.plan(2);
  const result = stats(oneFileTwoErrorsNoWarningsTwoRules.results);
  t.ok(result, 'returns result');
  t.deepEqual(result, [
    { name: 'eqeqeq:         \x1B[35m1\x1B[39m|\x1B[41m \x1B[49m', value: 'eqeqeq', short: 'eqeqeq' },
    { name: 'no-unused-vars: \x1B[35m1\x1B[39m|\x1B[41m \x1B[49m', value: 'no-unused-vars', short: 'no-unused-vars' },
  ]);
});

test('stats formatter :: One File, Two Errors, One Fixable Error', function (t) {
  chalk.level = 1;
  t.plan(2);
  const result = stats(oneFileTwoErrorsNoWarningsOneFixableError.results);
  t.ok(result, 'returns result');
  t.deepEqual(result, [
    {
      name: 'func-name-matching: \x1B[35m1\x1B[39m|\x1B[41m \x1B[49m',
      value: 'func-name-matching',
      short: 'func-name-matching',
    },
    { name: 'semi:               \x1B[35m1\x1B[39m|\x1B[41m \x1B[49m', value: 'semi', short: 'semi' },
  ]);
});

test('stats formatter :: Two Files, Two Errors, One Rule', function (t) {
  chalk.level = 1;
  t.plan(2);
  const result = stats(twoFilesTwoErrorsNoWarningsOneRule.results);
  t.ok(result, 'returns result');
  t.deepEqual(result, [
    { name: 'no-unused-vars: \x1B[35m2\x1B[39m|\x1B[41m  \x1B[49m', value: 'no-unused-vars', short: 'no-unused-vars' },
  ]);
});

test('stats formatter :: Two Files, Two Errors, Two Rules', function (t) {
  chalk.level = 1;
  t.plan(2);
  const result = stats(twoFilesTwoErrorsNoWarningsTwoRules.results);
  t.ok(result, 'returns result');
  t.deepEqual(result, [
    { name: 'eqeqeq:         \x1B[35m1\x1B[39m|\x1B[41m \x1B[49m', value: 'eqeqeq', short: 'eqeqeq' },
    { name: 'no-unused-vars: \x1B[35m1\x1B[39m|\x1B[41m \x1B[49m', value: 'no-unused-vars', short: 'no-unused-vars' },
  ]);
});
