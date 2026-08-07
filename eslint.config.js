const tseslint = require('typescript-eslint');
const jsxA11y = require('eslint-plugin-jsx-a11y');

// Config mínima para la Actividad 3: solo nos interesa correr
// eslint-plugin-jsx-a11y sobre los componentes de UI (src/components).
// No se configuran reglas de estilo/formato — eso no es el objetivo aquí.
module.exports = tseslint.config(
  {
    ignores: ['node_modules/**', 'coverage/**', '.expo/**', 'android/**', 'ios/**'],
  },
  {
    files: ['src/components/**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      'jsx-a11y': jsxA11y,
    },
    rules: {
      ...jsxA11y.flatConfigs.recommended.rules,
    },
  }
);
