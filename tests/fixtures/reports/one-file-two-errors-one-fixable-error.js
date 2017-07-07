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
          },
          { ruleId  : 'func-name-matching',
            severity: 2,
            message : 'Function name `bar` should match variable name `foo`',
            line    : 3,
            column  : 5,
            nodeType: 'VariableDeclarator',
            source  : 'var foo = function bar() {};'
          } ],
      errorCount         : 2,
      warningCount       : 0,
      fixableErrorCount  : 1,
      fixableWarningCount: 0
    } ],
  errorCount         : 2,
  warningCount       : 0,
  fixableErrorCount  : 1,
  fixableWarningCount: 0 };
