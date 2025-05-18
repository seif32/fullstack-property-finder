import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,jsx}"] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    plugins: {
      "react-hooks": pluginReactHooks,
    },

    rules: {
      "react/prop-types": "off", // Disable the prop-types rule

      "no-unused-vars": [
        "warn",
        { args: "after-used", ignoreRestSiblings: true },
      ],
      "no-var": "error",
      "prefer-const": "error",
      eqeqeq: "warn",
      semi: ["error", "always"],
      quotes: [
        "off",
        "single",
        { avoidEscape: true, allowTemplateLiterals: true },
      ],
      "object-shorthand": ["warn", "always"],
      "arrow-body-style": ["warn", "as-needed"],
      // "no-console": "warn",
      "no-debugger": "error",
      "react/jsx-filename-extension": ["warn", { extensions: [".jsx", ".js"] }],
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "react/self-closing-comp": "warn",
      "react/no-unescaped-entities": "warn",

      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },
];
