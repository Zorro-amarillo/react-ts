/// <reference types="vitest" />
import autoprefixer from 'autoprefixer';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setupTests.tsx'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      exclude: [
        './**/*.test.{js,jsx,ts,tsx}',
        './**/*.spec.{js,jsx,ts,tsx}',
        './index.{js,jsx,ts,tsx}',
        './tests/setupTests.{js,ts}',
        './**/*.d.ts',
        'src/main.tsx',
        'src/types/**',
      ],
      thresholds: {
        global: {
          statements: 80,
          branches: 50,
          functions: 50,
          lines: 50,
        },
      },
    },
  },
  css: {
    postcss: {
      plugins: [autoprefixer()],
    },
  },
});
