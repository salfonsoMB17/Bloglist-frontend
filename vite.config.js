import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3003',
        changeOrigin: true
      }
    }
  },
  test: {
    include: ['**/*.test.jsx'],
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
  }
})
