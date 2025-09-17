module.exports = {
  results:
    [ { filePath: 'tests/fixtures/files/semi-error/no-semi.js',
      messages:
          [ { ruleId  : 'semi',
            severity: 2,
            message : 'Missing semicolon.',
            line    : 1,
            column  : 12,
            nodeType: 'VariableDeclaration',
            source  : 'var foo = 1\nfoo++;',
            messageId: 'missingSemi',
            endLine: 2,
            endColumn: 1,
            fix     : { range: [11, 11], text: ';' }
          } ],
      errorCount         : 1,
      warningCount       : 0,
      fixableErrorCount  : 1,
      fixableWarningCount: 0
    } ],
  errorCount         : 1,
  warningCount       : 0,
  fixableErrorCount  : 1,
  fixableWarningCount: 0 };
