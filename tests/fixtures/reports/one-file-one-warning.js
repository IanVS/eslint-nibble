module.exports = {
  results:
    [ { filePath: 'tests/fixtures/files/semi-warn/no-semi.js',
        messages:
          [ {
            ruleId: 'semi',
            severity: 1,
            message: 'Missing semicolon.',
            line: 1,
            column: 12,
            nodeType: 'VariableDeclaration',
            messageId: 'missingSemi',
            endLine: 2,
            endColumn: 1,
            fix: { range: [ 11, 11 ], text: ';' }
          } ],
         errorCount: 0,
         warningCount: 1 } ],
    errorCount: 0,
    warningCount: 1 };
