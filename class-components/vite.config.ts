import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { configDefaults } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: { exportType: 'default', ref: true, svgo: false, titleProp: true },
      include: '**/*.svg',
    }),
    tsconfigPaths(),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    coverage: {
      include: ['src/**/*'],
      reporter: ['text', 'json', 'html'],
      exclude: ['**/index.ts', '**/main.tsx', '**/SearchBar.tsx', '**/ErrorBoundary.tsx'],
    },
    exclude: [...configDefaults.exclude, 'packages/template/*', 'e2e/*'],
  },
});
