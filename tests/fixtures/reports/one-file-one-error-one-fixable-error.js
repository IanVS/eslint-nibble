module.exports = {
  results:
    [ { filePath: 'path/to/error.js',
      messages:
          [ { ruleId  : 'semi',
            severity: 2,
            message : 'Missing semicolon.',
            line    : 1,
            column  : 13,
            nodeType: 'VariableDeclaration',
            source  : 'var foo = 42',
            fix     : { range: [12, 12], text: ';' }
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
