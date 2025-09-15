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

const MAGENTA_FG = '\x1B[35m';
const DEFAULT_FG = '\x1B[39m';
const RED_BG = '\x1B[41m';
const DEFAULT_BG = '\x1B[49m';

process.stdout.columns = 100;

test('stats formatter :: No Issues', function (t) {
  process.env.FORCE_COLOR = 1;
  t.plan(2);
  const result = stats(noIssues.results);
  t.ok(result, 'returns result');
  t.deepEqual(result, []);
});

test('stats group formatter :: One Error, One Fixable Error', function (t) {
  process.env.FORCE_COLOR = 1;
  t.plan(2);
  const result = stats(oneFileOneErrorOneFixableError.results);
  t.ok(result, 'returns result');
  t.deepEqual(result, [
    {
      name: `semi: ${MAGENTA_FG}1${DEFAULT_FG}|${RED_BG} ${DEFAULT_BG}`,
      value: 'semi',
      short: 'semi',
    },
  ]);
});

test('stats formatter :: One Error', function (t) {
  process.env.FORCE_COLOR = 1;
  t.plan(2);
  const result = stats(oneFileOneError.results);
  t.ok(result, 'returns result');
  t.deepEqual(result, [
    {
      name: `no-unused-vars: ${MAGENTA_FG}1${DEFAULT_FG}|${RED_BG} ${DEFAULT_BG}`,
      value: 'no-unused-vars',
      short: 'no-unused-vars',
    },
  ]);
});

test('stats formatter :: One Fatal Error', function (t) {
  process.env.FORCE_COLOR = 1;
  t.plan(2);
  const result = stats(oneFileOneFatalError.results);
  t.ok(result, 'returns result');
  t.deepEqual(result, [
    { name: `undefined: ${MAGENTA_FG}1${DEFAULT_FG}|${RED_BG} ${DEFAULT_BG}`, value: 'undefined', short: 'undefined' },
  ]);
});

test('stats formatter :: One Warning', function (t) {
  process.env.FORCE_COLOR = 1;
  t.plan(2);
  const result = stats(oneFileOneWarning.results);
  t.ok(result, 'returns result');
  t.deepEqual(result, [
    {
      name: `no-unused-vars: ${MAGENTA_FG}1${DEFAULT_FG}|\x1B[43m ${DEFAULT_BG}`,
      value: 'no-unused-vars',
      short: 'no-unused-vars',
    },
  ]);
});

test('stats formatter :: One File, Two Errors, One Rule', function (t) {
  process.env.FORCE_COLOR = 1;
  t.plan(2);
  const result = stats(oneFileTwoErrorsNoWarningsOneRule.results);
  t.ok(result, 'returns result');
  t.deepEqual(result, [
    {
      name: `no-unused-vars: ${MAGENTA_FG}2${DEFAULT_FG}|${RED_BG}  ${DEFAULT_BG}`,
      value: 'no-unused-vars',
      short: 'no-unused-vars',
    },
  ]);
});

test('stats formatter :: One File, Two Errors, Two Rules', function (t) {
  process.env.FORCE_COLOR = 1;
  t.plan(2);
  const result = stats(oneFileTwoErrorsNoWarningsTwoRules.results);
  t.ok(result, 'returns result');
  t.deepEqual(result, [
    { name: `eqeqeq:         ${MAGENTA_FG}1${DEFAULT_FG}|${RED_BG} ${DEFAULT_BG}`, value: 'eqeqeq', short: 'eqeqeq' },
    {
      name: `no-unused-vars: ${MAGENTA_FG}1${DEFAULT_FG}|${RED_BG} ${DEFAULT_BG}`,
      value: 'no-unused-vars',
      short: 'no-unused-vars',
    },
  ]);
});

test('stats formatter :: One File, Two Errors, One Fixable Error', function (t) {
  process.env.FORCE_COLOR = 1;
  t.plan(2);
  const result = stats(oneFileTwoErrorsNoWarningsOneFixableError.results);
  t.ok(result, 'returns result');
  t.deepEqual(result, [
    {
      name: `func-name-matching: ${MAGENTA_FG}1${DEFAULT_FG}|${RED_BG} ${DEFAULT_BG}`,
      value: 'func-name-matching',
      short: 'func-name-matching',
    },
    { name: `semi:               ${MAGENTA_FG}1${DEFAULT_FG}|${RED_BG} ${DEFAULT_BG}`, value: 'semi', short: 'semi' },
  ]);
});

test('stats formatter :: Two Files, Two Errors, One Rule', function (t) {
  process.env.FORCE_COLOR = 1;
  t.plan(2);
  const result = stats(twoFilesTwoErrorsNoWarningsOneRule.results);
  t.ok(result, 'returns result');
  t.deepEqual(result, [
    {
      name: `no-unused-vars: ${MAGENTA_FG}2${DEFAULT_FG}|${RED_BG}  ${DEFAULT_BG}`,
      value: 'no-unused-vars',
      short: 'no-unused-vars',
    },
  ]);
});

test('stats formatter :: Two Files, Two Errors, Two Rules', function (t) {
  process.env.FORCE_COLOR = 1;
  t.plan(2);
  const result = stats(twoFilesTwoErrorsNoWarningsTwoRules.results);
  t.ok(result, 'returns result');
  t.deepEqual(result, [
    { name: `eqeqeq:         ${MAGENTA_FG}1${DEFAULT_FG}|${RED_BG} ${DEFAULT_BG}`, value: 'eqeqeq', short: 'eqeqeq' },
    {
      name: `no-unused-vars: ${MAGENTA_FG}1${DEFAULT_FG}|${RED_BG} ${DEFAULT_BG}`,
      value: 'no-unused-vars',
      short: 'no-unused-vars',
    },
  ]);
});
