import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
    VitePWA({
      manifest: {
        icons: [
          {
            src: '/dsfr/favicon/favicon.ico',
            sizes: '512*512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
  assetsInclude: ['**/*.md'],
  server: {
    port: 3000,
  },
});
