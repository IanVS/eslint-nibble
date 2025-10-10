module.exports = {
  results:
    [ { filePath: 'tests/fixtures/files/multi-error/two-unused.js',
        messages:
          [ { ruleId: 'no-unused-vars',
              severity: 2,
              message: "'bar' is defined but never used.",
              line: 1,
              column: 5,
              nodeType: 'Identifier',
              endLine: 1,
              endColumn: 8,
              messageId: 'unusedVar',
              source: 'var bar;\nvar foo;' },
            { ruleId: 'no-unused-vars',
              severity: 2,
              message: "'foo' is defined but never used.",
              line: 2,
              column: 5,
              nodeType: 'Identifier',
              messageId: 'unusedVar',
              endLine: 2,
              endColumn: 8,
              source: 'var foo;\nvar bar;' } ],
        errorCount: 2,
        warningCount: 0 } ],
    errorCount: 2,
    warningCount: 0
}


