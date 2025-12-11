import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import path from 'node:path';
import { defineConfig } from 'vite';
import { VitePluginPackageVersionGenerator } from 'vite-plugin-package-version-generator';

// https://vite.dev/config/
export default defineConfig({
  base: '/vue-vite-play/',
  plugins: [vue(), tailwindcss(), VitePluginPackageVersionGenerator()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src')
    }
  }
});
