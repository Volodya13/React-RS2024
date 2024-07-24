import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { configDefaults } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: { exportType: 'default', ref: true, svgo: false, titleProp: true },
      include: '**/*.svg',
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './jest.setup.ts',
    coverage: {
      include: ['src/**/*'],
      reporter: ['text', 'json', 'html'],
      exclude: ['**/index.ts', '**/main.tsx', '**/App.tsx', '**/ErrorBoundary.tsx'],
    },
    exclude: [...configDefaults.exclude, 'packages/template/*'],
  },
});
