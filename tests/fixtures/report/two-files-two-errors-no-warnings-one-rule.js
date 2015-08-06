module.exports = {
  results:
    [ { filePath: 'path/to/file.js',
        messages:
          [ { ruleId: 'no-unused-vars',
              severity: 2,
              message: 'bar is defined but never used',
              line: 5,
              column: 4,
              nodeType: 'Identifier',
              source: 'var bar;' } ],
        errorCount: 1,
        warningCount: 0 },
      { filePath: 'path/to/another/file.js',
        messages:
          [ { ruleId: 'no-unused-vars',
              severity: 2,
              message: 'foo is defined but never used',
              line: 1,
              column: 4,
              nodeType: 'Identifier',
              source: 'var foo;' } ],
        errorCount: 1,
        warningCount: 0 } ],
    errorCount: 2,
    warningCount: 0
}
