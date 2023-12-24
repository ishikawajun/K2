import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    cors: false,
    proxy: {
      '/api': {
        target: 'https://notify-api.line.me',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, 'api'),
      }
    }
  }
})
