'use strict';

var test = require('tape-catch');
var nibbler = require('../../lib/nibbler');


test('getRuleResults :: Returns correct messages', function (outer) {
  outer.plan(5);

  outer.test('-- One error', function (t) {
    t.plan(14);
    var report = require('../fixtures/report/one-file-one-error');
    var ruleName = 'no-unused-vars';
    var ruleReport = nibbler.getRuleResults(report, ruleName);
    t.ok(ruleReport, 'returns report');
    t.equal(typeof ruleReport, 'object', 'report is an object');
    t.ok(ruleReport.results, 'report has results');
    t.equal(ruleReport.results.length, 1, 'results have one element');
    t.ok(ruleReport.results[0].messages, 'result has messages');
    t.equal(ruleReport.results[0].messages.length, 1, 'messages has one element');
    t.equal(ruleReport.results[0].messages[0].severity, 2, 'message severity is 2');
    t.equal(ruleReport.results[0].messages[0].message, 'foo is defined but never used', 'message has correct message');
    t.ok(ruleReport.errorCount, 'report has an errorCount');
    t.equal(ruleReport.errorCount, 1, 'report errorCount is 1');
    t.equal(ruleReport.warningCount, 0, 'report warningCount is 0');
    t.ok(ruleReport.results[0].errorCount, 'result has an errorCount');
    t.equal(ruleReport.results[0].errorCount, 1, 'result errorCount is 1');
    t.equal(ruleReport.results[0].warningCount, 0, 'result warningCount is 0');
  });

  outer.test('-- One warning', function (t) {
    t.plan(3);
    var report = require('../fixtures/report/one-file-one-warning');
    var ruleName = 'no-unused-vars';
    var ruleReport = nibbler.getRuleResults(report, ruleName);
    t.ok(ruleReport.warningCount, 'report has a warningCount');
    t.equal(ruleReport.errorCount, 0, 'report errorCount is 0');
    t.equal(ruleReport.warningCount, 1, 'report warningCount is 1');
  });


  outer.test('-- One file, One rule', function (t) {
    t.plan(7);
    var report = require('../fixtures/report/one-file-two-errors-no-warnings-one-rule');
    var ruleName = report.results[0].messages[0].ruleId;
    var ruleReport = nibbler.getRuleResults(report, ruleName);
    t.equal(ruleReport.results[0].messages[0].ruleId, ruleName, 'filtered on correct rule');
    t.equal(ruleReport.results[0].messages[0].severity, 2, 'returned correct severity');
    t.equal(ruleReport.results[0].messages[0].message, 'foo is defined but never used', 'returned correct message');
    t.equal(ruleReport.results[0].messages[0].line, 5, 'returned correct line');
    t.equal(ruleReport.results[0].messages[0].column, 4, 'returned correct column');
    t.equal(ruleReport.results[0].messages[0].nodeType, 'Identifier', 'returned correct nodeType');
    t.equal(ruleReport.results[0].messages[0].source, 'var foo;', 'returned correct source');
  });

  outer.test('-- One file, Two rules', function (t) {
    t.plan(9);
    var report = require('../fixtures/report/one-file-two-errors-no-warnings-two-rules');
    var ruleName = report.results[0].messages[0].ruleId;
    var ruleReport = nibbler.getRuleResults(report, ruleName);
    t.equal(ruleReport.results[0].filePath, 'path/to/file.js', 'returned correct filePath');
    t.equal(ruleReport.results[0].messages[0].ruleId, ruleName, 'filtered on correct rule');
    t.equal(ruleReport.results[0].messages[0].severity, 2, 'returned correct severity');
    t.equal(ruleReport.results[0].messages[0].message, 'Expected \'===\' and instead saw \'==\'.', 'returned correct message');
    t.equal(ruleReport.results[0].messages[0].line, 1, 'returned correct line');
    t.equal(ruleReport.results[0].messages[0].column, 8, 'returned correct column');
    t.equal(ruleReport.results[0].messages[0].nodeType, 'BinaryExpression', 'returned correct nodeType');
    t.equal(ruleReport.results[0].messages[0].source, 'if (foo == bar) {', 'returned correct source');
    t.equal(ruleReport.results.length, 1, 'did not inlude results for other rule');
  });

  outer.test('-- Two files, Two rules', function (t) {
    t.plan(4);
    var report = require('../fixtures/report/two-files-two-errors-no-warnings-two-rules');
    var ruleName = 'no-unused-vars';
    var ruleReport = nibbler.getRuleResults(report, ruleName);
    t.equal(ruleReport.results[1].filePath, 'path/to/another/file.js', 'returned correct filePath');
    t.equal(ruleReport.results[1].messages[0].ruleId, ruleName, 'filtered on correct rule');
    t.equal(ruleReport.results[0].messages.length, 0, 'no messages for other rule');
    t.equal(ruleReport.results.length, 2, 'includes both sets of results (one for each file)');
  });

});

test('getRuleResults :: Returns correct number of errors and warnings', function (outer) {
  outer.plan(4);

  outer.test('-- One file, One rule', function (t) {
    t.plan(4);
    var report = require('../fixtures/report/one-file-two-errors-no-warnings-one-rule');
    var ruleName = report.results[0].messages[0].ruleId;
    var ruleReport = nibbler.getRuleResults(report, ruleName);
    t.equal(ruleReport.results[0].errorCount, 2, '2 errors in file');
    t.equal(ruleReport.results[0].warningCount, 0, '0 warnings in file');
    t.equal(ruleReport.errorCount, 2, '2 errors total');
    t.equal(ruleReport.warningCount, 0, '0 warnings total');
  });

  outer.test('-- One file, Two rules', function (t) {
    t.plan(4);
    var report = require('../fixtures/report/one-file-two-errors-no-warnings-two-rules');
    var ruleName = report.results[0].messages[0].ruleId;
    var ruleReport = nibbler.getRuleResults(report, ruleName);
    t.equal(ruleReport.results[0].errorCount, 1, '1 error in file');
    t.equal(ruleReport.results[0].warningCount, 0, '0 warnings in file');
    t.equal(ruleReport.errorCount, 1, '1 error total');
    t.equal(ruleReport.warningCount, 0, '0 warnings total');
  });

  outer.test('-- Two files, One rule', function (t) {
    t.plan(6);
    var report = require('../fixtures/report/two-files-two-errors-no-warnings-one-rule');
    var ruleName = report.results[0].messages[0].ruleId;
    var ruleReport = nibbler.getRuleResults(report, ruleName);
    t.equal(ruleReport.results[0].errorCount, 1, '1 error in first file');
    t.equal(ruleReport.results[0].warningCount, 0, '0 warnings first in file');
    t.equal(ruleReport.results[1].errorCount, 1, '1 error in second file');
    t.equal(ruleReport.results[1].warningCount, 0, '0 warnings second in file');
    t.equal(ruleReport.errorCount, 2, '2 errors total');
    t.equal(ruleReport.warningCount, 0, '0 warnings total');
  });

  outer.test('-- Two files, Two rules', function (t) {
    t.plan(6);
    var report = require('../fixtures/report/two-files-two-errors-no-warnings-two-rules');
    var ruleName = report.results[0].messages[0].ruleId;
    var ruleReport = nibbler.getRuleResults(report, ruleName);
    t.equal(ruleReport.results[0].errorCount, 1, '1 error in first file');
    t.equal(ruleReport.results[0].warningCount, 0, '0 warnings first in file');
    t.equal(ruleReport.results[1].errorCount, 0, '0 errors in second file (other rule)');
    t.equal(ruleReport.results[1].warningCount, 0, '0 warnings second in file (other rule)');
    t.equal(ruleReport.errorCount, 1, '1 error total');
    t.equal(ruleReport.warningCount, 0, '0 warnings total');
  });

});

test('getFatalResults :: Returns fatal error report', function (t) {
  t.plan(12);
  var report = require('../fixtures/report/one-file-one-fatal-error');
  var fatalReport = nibbler.getFatalResults(report);
  t.ok(fatalReport, 'returns report');
  t.equal(typeof fatalReport, 'object', 'report is an object');
  t.ok(fatalReport.results, 'report has results');
  t.equal(fatalReport.results.length, 1, 'results have one element');
  t.ok(fatalReport.results[0].messages, 'result has messages');
  t.equal(fatalReport.results[0].messages.length, 1, 'messages has one element');
  t.equal(fatalReport.results[0].messages[0].fatal, true, 'message is fatal');
  t.equal(fatalReport.results[0].messages[0].severity, 2, 'message severity is 2');
  t.equal(fatalReport.results[0].messages[0].message, 'Unexpected token ;', 'message has correct message');
  t.ok(fatalReport.errorCount, 'report has an errorCount');
  t.equal(fatalReport.errorCount, 1, 'report errorCount is 1');
  t.equal(fatalReport.warningCount, 0, 'report warningCount is 0');
});
