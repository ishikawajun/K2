import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'https://notify-api.line.me',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, 'api'),
      },
      '/proxy': {
        target: `http://k2-backend:60001`,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/proxy/, ''),
      }
    }
  }
})
