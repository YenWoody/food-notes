// eslint.config.js
import vue from 'eslint-plugin-vue'
import nuxt from 'eslint-plugin-nuxt'
import ts from '@typescript-eslint/eslint-plugin'
import parserTs from '@typescript-eslint/parser'
import unusedImports from 'eslint-plugin-unused-imports'
import prettier from 'eslint-plugin-prettier'
import vueParser from 'vue-eslint-parser'

export default [
  {
    files: ['**/*.ts', '**/*.js', '**/*.vue', '*/*.ts'],
    ignores: ['node_modules', '.output', '.nuxt', 'dist', '**/generated/**'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: parserTs,
        ecmaVersion: 2022,
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
        project: './tsconfig.json'
      }
    },
    plugins: {
      vue,
      nuxt,
      '@typescript-eslint': ts,
      'unused-imports': unusedImports,
      prettier
    },
    rules: {
      // Prettier: dùng như rule format chính
      'prettier/prettier': 'warn',

      // JS
      'no-console': 'warn',
      'no-debugger': 'warn',

      // TS
      '@typescript-eslint/no-unused-vars': 'off', // tắt rule gốc, dùng rule bên dưới

      // Unused imports
      'unused-imports/no-unused-imports': 'warn',
      'unused-imports/no-unused-vars': [
        'warn',
        { vars: 'all', varsIgnorePattern: '^_', argsIgnorePattern: '^_' }
      ],

      // Vue
      'vue/multi-word-component-names': 'off'
    }
  }
]
