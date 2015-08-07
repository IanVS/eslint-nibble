module.exports = {
  results:
    [ { filePath: 'path/to/warning.js',
        messages:
          [ { ruleId: 'no-unused-vars',
              severity: 1,
              message: 'foo is defined but never used',
              line: 1,
              column: 4,
              nodeType: 'Identifier',
              source: 'var foo;' } ],
         errorCount: 0,
         warningCount: 1 } ],
    errorCount: 0,
    warningCount: 1 }
