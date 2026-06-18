import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    fs: {
      strict: true,
      allow: ['.']
    }
  },
  build: {
    target: 'es2015',
    cssTarget: 'chrome61',
    chunkSizeWarningLimit: 1400
  }
});
