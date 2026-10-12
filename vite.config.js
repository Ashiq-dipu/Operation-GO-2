import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { defineConfig } from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  server: {
    port: 3000,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        programs: resolve(__dirname, 'programs.html'),
        careers: resolve(__dirname, 'careers.html'),
        getInvolved: resolve(__dirname, 'get-involved.html'),
        impact: resolve(__dirname, 'impact.html'),
        supportUs: resolve(__dirname, 'support-us.html'),
        contact: resolve(__dirname, 'contact.html'),
      },
    },
  },
});
