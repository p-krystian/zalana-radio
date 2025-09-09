import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  build: {
    target: 'es2022',
    rollupOptions: {
      input: { app: './player.html' },
    },
    assetsDir: 'player-assets'
  },
  plugins: [preact()],
  server: {
    host: '0.0.0.0',
    port: 8080,
    open: 'player.html'
  },
  resolve: {
    alias: {
      '@/': '/src/'
    }
  },
  esbuild: { target: 'es2022' }
})
