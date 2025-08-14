import js from '@eslint/js';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';
import prettierConfig from 'eslint-config-prettier';
import react from 'eslint-plugin-react';
import reactCompiler from 'eslint-plugin-react-compiler';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config({
  ignores: ['dist', 'coverage/**/*'],
  extends: [
    js.configs.recommended,
    ...tseslint.configs.strict,
    prettierConfig,
    eslintPluginPrettier,
  ],
  files: ['src/**/*.{ts,tsx}', '__tests__/**/*.{test.ts,test.tsx}'],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
    parserOptions: {
      project: './tsconfig.eslint.json',
      tsconfigRootDir: import.meta.dirname,
    },
  },
  plugins: {
    react,
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
    'react-compiler': reactCompiler,
    import: eslintPluginImport,
    plugins: ['prettier'],
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'react-compiler/react-compiler': 'error',
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
    'import/no-unresolved': 'error',
    'import/named': 'error',
    'import/default': 'error',
    'import/namespace': 'error',
    'import/no-absolute-path': 'error',
    'import/no-dynamic-require': 'error',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'index', ['parent', 'sibling'], 'type'],
        pathGroups: [
          {
            pattern: '{react,react-router-dom,react-dom/client,react-redux}',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '{@testing-library/react,@testing-library/user-event}',
            group: 'external',
            position: 'after',
          },
          {
            pattern: '@/**',
            group: 'internal',
          },
          {
            pattern: '**/*.css',
            group: 'index',
            position: 'after',
          },
          {
            pattern: './**/*.css',
            group: 'index',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        warnOnUnassignedImports: true,
      },
    ],
    'prettier/prettier': 'error',
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {
        project: './tsconfig.eslint.json',
        alwaysTryTypes: true,
      },
      node: true,
    },
  },
});
