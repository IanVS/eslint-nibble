module.exports = {
  results:
    [ { filePath: 'path/to/file.js',
        messages:
          [ { ruleId: 'eqeqeq',
              severity: 2,
              message: 'Expected \'===\' and instead saw \'==\'.',
              line: 1,
              column: 8,
              nodeType: 'BinaryExpression',
              source: 'if (foo == bar) {' },
            { ruleId: 'no-unused-vars',
              severity: 2,
              message: 'foo is defined but never used',
              line: 1,
              column: 4,
              nodeType: 'Identifier',
              source: 'var foo;' } ],
        errorCount: 2,
        warningCount: 0 } ],
    errorCount: 2,
    warningCount: 0
}


