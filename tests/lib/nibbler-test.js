'use strict';

var test = require('tape-catch');
var nibbler = require('../../lib/nibbler');


test('getRuleResults :: Returns correct messages', function (outer) {
  outer.plan(3);

  outer.test('-- One file, One rule', function (t) {
    t.plan(7);
    var report = require('../fixtures/report/one-file-two-errors-no-warnings-one-rule');
    var ruleName = report.results[0].messages[0].ruleId;
    var ruleResults = nibbler.getRuleResults(report, ruleName);
    t.equal(ruleResults.results[0].messages[0].ruleId, ruleName, 'filtered on correct rule');
    t.equal(ruleResults.results[0].messages[0].severity, 2, 'returned correct severity');
    t.equal(ruleResults.results[0].messages[0].message, 'foo is defined but never used', 'returned correct message');
    t.equal(ruleResults.results[0].messages[0].line, 5, 'returned correct line');
    t.equal(ruleResults.results[0].messages[0].column, 4, 'returned correct column');
    t.equal(ruleResults.results[0].messages[0].nodeType, 'Identifier', 'returned correct nodeType');
    t.equal(ruleResults.results[0].messages[0].source, 'var foo;', 'returned correct source');
  });

  outer.test('-- One file, Two rules', function (t) {
    t.plan(9);
    var report = require('../fixtures/report/one-file-two-errors-no-warnings-two-rules');
    var ruleName = report.results[0].messages[0].ruleId;
    var ruleResults = nibbler.getRuleResults(report, ruleName);
    t.equal(ruleResults.results[0].filePath, 'path/to/file.js', 'returned correct filePath');
    t.equal(ruleResults.results[0].messages[0].ruleId, ruleName, 'filtered on correct rule');
    t.equal(ruleResults.results[0].messages[0].severity, 2, 'returned correct severity');
    t.equal(ruleResults.results[0].messages[0].message, 'Expected \'===\' and instead saw \'==\'.', 'returned correct message');
    t.equal(ruleResults.results[0].messages[0].line, 1, 'returned correct line');
    t.equal(ruleResults.results[0].messages[0].column, 8, 'returned correct column');
    t.equal(ruleResults.results[0].messages[0].nodeType, 'BinaryExpression', 'returned correct nodeType');
    t.equal(ruleResults.results[0].messages[0].source, 'if (foo == bar) {', 'returned correct source');
    t.equal(ruleResults.results.length, 1, 'did not inlude results for other rule');
  });

  outer.test('-- Two files, Two rules', function (t) {
    t.plan(4);
    var report = require('../fixtures/report/two-files-two-errors-no-warnings-two-rules');
    var ruleName = 'no-unused-vars';
    var ruleResults = nibbler.getRuleResults(report, ruleName);
    t.equal(ruleResults.results[1].filePath, 'path/to/another/file.js', 'returned correct filePath');
    t.equal(ruleResults.results[1].messages[0].ruleId, ruleName, 'filtered on correct rule');
    t.equal(ruleResults.results[0].messages.length, 0, 'no messages for other rule');
    t.equal(ruleResults.results.length, 2, 'includes both sets of results (one for each file)');
  });

});

test('getRuleResults :: Returns correct number of errors and warnings', function (outer) {
  outer.plan(4);

  outer.test('-- One file, One rule', function (t) {
    t.plan(4);
    var report = require('../fixtures/report/one-file-two-errors-no-warnings-one-rule');
    var ruleName = report.results[0].messages[0].ruleId;
    var ruleResults = nibbler.getRuleResults(report, ruleName);
    t.equal(ruleResults.results[0].errorCount, 2, '2 errors in file');
    t.equal(ruleResults.results[0].warningCount, 0, '0 warnings in file');
    t.equal(ruleResults.errorCount, 2, '2 errors total');
    t.equal(ruleResults.warningCount, 0, '0 warnings total');
  });

  outer.test('-- One file, Two rules', function (t) {
    t.plan(4);
    var report = require('../fixtures/report/one-file-two-errors-no-warnings-two-rules');
    var ruleName = report.results[0].messages[0].ruleId;
    var ruleResults = nibbler.getRuleResults(report, ruleName);
    t.equal(ruleResults.results[0].errorCount, 1, '1 error in file');
    t.equal(ruleResults.results[0].warningCount, 0, '0 warnings in file');
    t.equal(ruleResults.errorCount, 1, '1 error total');
    t.equal(ruleResults.warningCount, 0, '0 warnings total');
  });

  outer.test('-- Two files, One rule', function (t) {
    t.plan(6);
    var report = require('../fixtures/report/two-files-two-errors-no-warnings-one-rule');
    var ruleName = report.results[0].messages[0].ruleId;
    var ruleResults = nibbler.getRuleResults(report, ruleName);
    t.equal(ruleResults.results[0].errorCount, 1, '1 error in first file');
    t.equal(ruleResults.results[0].warningCount, 0, '0 warnings first in file');
    t.equal(ruleResults.results[1].errorCount, 1, '1 error in second file');
    t.equal(ruleResults.results[1].warningCount, 0, '0 warnings second in file');
    t.equal(ruleResults.errorCount, 2, '2 errors total');
    t.equal(ruleResults.warningCount, 0, '0 warnings total');
  });

  outer.test('-- Two files, Two rules', function (t) {
    t.plan(6);
    var report = require('../fixtures/report/two-files-two-errors-no-warnings-two-rules');
    // console.log(report);
    var ruleName = report.results[0].messages[0].ruleId;
    var ruleResults = nibbler.getRuleResults(report, ruleName);
    t.equal(ruleResults.results[0].errorCount, 1, '1 error in first file');
    t.equal(ruleResults.results[0].warningCount, 0, '0 warnings first in file');
    t.equal(ruleResults.results[1].errorCount, 0, '0 errors in second file (other rule)');
    t.equal(ruleResults.results[1].warningCount, 0, '0 warnings second in file (other rule)');
    t.equal(ruleResults.errorCount, 1, '1 error total');
    t.equal(ruleResults.warningCount, 0, '0 warnings total');
  });

});
