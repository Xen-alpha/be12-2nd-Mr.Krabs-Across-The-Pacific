import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0',
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      }
    }
  },
});

