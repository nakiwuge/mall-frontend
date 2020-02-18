module.exports = {
    env: {
      browser: true,
      es6: true,
      jest: true,
      node:true
    },
    extends: [
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:import/recommended"
    ],

    parserOptions: {
      ecmaFeatures: {
        jsx: true

      },
      ecmaVersion: 2018,
      sourceType: "module"
    },
    "parser": "babel-eslint",
    plugins: ["react", "import"],
    rules: {
      "indent": ["error", 2],
      "linebreak-style": ["error", "unix"],
      quotes: ["error", "single"],
      semi: ["error", "always"],
      "eol-last": 1,
      "eol-last": ["error", "always"],
      "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 1}],
      "react/prop-types": 0
    },
    settings: {
      react: {
        version: "latest"
      }
    }
  };