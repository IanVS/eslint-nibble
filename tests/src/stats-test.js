'use strict';

const test = require('tape');
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

test('group formatter :: No Issues', function (t) {
  t.plan(2);
  const result = stats(noIssues.results);
  t.ok(result, 'returns result');
  t.deepEqual(result, []);
});

test('group formatter :: One Error, One Fixable Error', function (t) {
  t.plan(2);
  const result = stats(oneFileOneErrorOneFixableError.results);
  t.ok(result, 'returns result');
  t.deepEqual(result, [
    {
      name: 'semi: 1| ',
      value: 'semi',
      short: 'semi',
    },
  ]);
});

test('group formatter :: One Error', function (t) {
  t.plan(2);
  const result = stats(oneFileOneError.results);
  t.ok(result, 'returns result');
  t.deepEqual(result, [
    {
      name: 'no-unused-vars: 1| ',
      value: 'no-unused-vars',
      short: 'no-unused-vars',
    },
  ]);
});

test('group formatter :: One Fatal Error', function (t) {
  t.plan(2);
  const result = stats(oneFileOneFatalError.results);
  t.ok(result, 'returns result');
  t.deepEqual(result, [{ name: 'undefined: 1| ', value: 'undefined', short: 'undefined' }]);
});

test('group formatter :: One Warning', function (t) {
  t.plan(2);
  const result = stats(oneFileOneWarning.results);
  t.ok(result, 'returns result');
  t.deepEqual(result, [{ name: 'no-unused-vars: 1| ', value: 'no-unused-vars', short: 'no-unused-vars' }]);
});

test('group formatter :: One File, Two Errors, One Rule', function (t) {
  t.plan(2);
  const result = stats(oneFileTwoErrorsNoWarningsOneRule.results);
  t.ok(result, 'returns result');
  t.deepEqual(result, [{ name: 'no-unused-vars: 2|  ', value: 'no-unused-vars', short: 'no-unused-vars' }]);
});

test('group formatter :: One File, Two Errors, Two Rules', function (t) {
  t.plan(2);
  const result = stats(oneFileTwoErrorsNoWarningsTwoRules.results);
  t.ok(result, 'returns result');
  t.deepEqual(result, [
    { name: 'eqeqeq:         1| ', value: 'eqeqeq', short: 'eqeqeq' },
    { name: 'no-unused-vars: 1| ', value: 'no-unused-vars', short: 'no-unused-vars' },
  ]);
});

test('group formatter :: One File, Two Errors, One Fixable Error', function (t) {
  t.plan(2);
  const result = stats(oneFileTwoErrorsNoWarningsOneFixableError.results);
  t.ok(result, 'returns result');
  t.deepEqual(result, [
    { name: 'func-name-matching: 1| ', value: 'func-name-matching', short: 'func-name-matching' },
    { name: 'semi:               1| ', value: 'semi', short: 'semi' },
  ]);
});

test('group formatter :: Two Files, Two Errors, One Rule', function (t) {
  t.plan(2);
  const result = stats(twoFilesTwoErrorsNoWarningsOneRule.results);
  t.ok(result, 'returns result');
  t.deepEqual(result, [{ name: 'no-unused-vars: 2|  ', value: 'no-unused-vars', short: 'no-unused-vars' }]);
});

test('group formatter :: Two Files, Two Errors, Two Rules', function (t) {
  t.plan(2);
  const result = stats(twoFilesTwoErrorsNoWarningsTwoRules.results);
  t.ok(result, 'returns result');
  t.deepEqual(result, [
    { name: 'eqeqeq:         1| ', value: 'eqeqeq', short: 'eqeqeq' },
    { name: 'no-unused-vars: 1| ', value: 'no-unused-vars', short: 'no-unused-vars' },
  ]);
});
