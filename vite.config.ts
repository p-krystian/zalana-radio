import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  build: { target: 'es2020' },
  plugins: [preact()],
  server: {
    host: '0.0.0.0',
    port: 8080,
    open: true
  },
  resolve: {
    alias: {
      '@/': '/src/'
    }
  },
  esbuild: { target: 'es2020' }
})
