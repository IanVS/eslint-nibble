module.exports = {
  rulesMeta: {
    semi: {
      deprecated: {
        message: 'Formatting rules are being moved out of ESLint core.',
        url: 'https://eslint.org/blog/2023/10/deprecating-formatting-rules/',
        deprecatedSince: '8.53.0',
        availableUntil: '10.0.0',
        replacedBy: []
      },
      type: 'layout',
      docs: {
        description: 'Require or disallow semicolons instead of ASI',
        recommended: false,
        url: 'https://eslint.org/docs/latest/rules/semi'
      },
      fixable: 'code',
      schema: { anyOf: [] },
      messages: { missingSemi: 'Missing semicolon.', extraSemi: 'Extra semicolon.' }
    },
    "no-unused-vars": {
      type: 'problem',
      docs: {
        description: 'Disallow unused variables',
        recommended: true,
        url: 'https://eslint.org/docs/latest/rules/no-unused-vars'
      },
      hasSuggestions: true,
      schema: [ { oneOf: [] } ],
      messages: {
        unusedVar: "'{{varName}}' is {{action}} but never used{{additional}}.",
        usedIgnoredVar: "'{{varName}}' is marked as ignored but is used{{additional}}.",
        removeVar: "Remove unused variable '{{varName}}'."
      }
    }
  }
};
