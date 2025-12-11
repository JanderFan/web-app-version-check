import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import path from 'node:path';
import { defineConfig } from 'vite';
import { VitePluginPkgVersion } from 'vite-plugin-pkg-version';

// https://vite.dev/config/
export default defineConfig({
  base: '/vue-vite-play/',
  plugins: [vue(), tailwindcss(), VitePluginPkgVersion()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src')
    }
  }
});
