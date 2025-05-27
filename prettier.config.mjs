export default {
  printWidth: 120,
  singleQuote: true,
  trailingComma: "es5",
  experimentalTernaries: true,
  plugins: ["@ianvs/prettier-plugin-sort-imports"],
  importOrder: [
    "<BUILTIN_MODULES>",
    "<THIRD_PARTY_MODULES>",
    "^(#api|#assets|#components|#global|#dn-types|#hooks|#mock|#schemas|#screens|#test-setup|#util)(.*)$",
    "^(?!.*[.]css$)[./].*$",
    ".css$",
  ],
};
