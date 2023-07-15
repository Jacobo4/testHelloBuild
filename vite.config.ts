import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
// @ts-ignore
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    devSourcemap: true,
  },
  resolve:{
    alias:{
      '@root' : path.resolve(__dirname, './src'),
      '@assets' : path.resolve(__dirname, './src/assets'),
      '@styles' : path.resolve(__dirname, './src/styles'),
      '@config' : path.resolve(__dirname, './src/config'),
      '@pages' : path.resolve(__dirname, './src/pages'),
      '@provider' : path.resolve(__dirname, './src/provider'),
      '@context' : path.resolve(__dirname, './src/context'),
    },
  },
  plugins: [react(),svgr()],
});
