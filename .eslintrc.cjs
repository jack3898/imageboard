// eslint-disable-next-line no-undef
module.exports = {
  env: { node: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        printWidth: 100,
        tabWidth: 2,
      },
    ],
    "no-duplicate-imports": "error",
    "no-constant-condition": "off",
    "@typescript-eslint/consistent-type-imports": ["error", { fixStyle: "inline-type-imports" }],
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/explicit-function-return-type": "error",
    "@typescript-eslint/consistent-type-assertions": "error",
    "react/react-in-jsx-scope": "off",
    "react/no-unescaped-entities": "off",
  },
  ignorePatterns: ["dist"],
};
