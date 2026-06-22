import { defineConfig } from 'eslint/config'
import vue from 'eslint-plugin-vue'
import tseslint from 'typescript-eslint'
import vueParser from 'vue-eslint-parser'
import globals from 'globals'

export default defineConfig([
  // 1. 全局忽略配置
  {
    ignores: ['dist', 'node_modules', '*.d.ts'],
  },

  // 2. 通用 TypeScript/JavaScript 配置
  {
    files: ['**/*.{js,ts,mjs,cjs,mts,cts}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      // --- ESLint 原生规则 ---
      'no-var': 'error',
      'no-multiple-empty-lines': ['warn', { max: 1 }],
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-unexpected-multiline': 'error',
      'no-useless-escape': 'off',

      // --- TypeScript 规则 ---
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/prefer-ts-expect-error': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/semi': 'off',
    },
  },

  // 3. Vue 单文件组件专用配置 (关键修复部分)
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      vue,
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      // --- Vue 专属规则 (之前放错位置了) ---
      'vue/multi-word-component-names': 'off',
      'vue/no-mutating-props': 'off',
      'vue/attribute-hyphenation': 'off',

      // --- 复用 TS 规则 ---
      '@typescript-eslint/no-unused-vars': 'error',
    },
  },
])
