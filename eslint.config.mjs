import preact from 'eslint-config-preact';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      preact,
      tseslint.configs.recommended
    ],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser
    }
  }
]);
