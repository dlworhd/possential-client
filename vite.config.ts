import { fileURLToPath, URL } from 'node:url'; // 모듈 경로는 이렇게 수정해야 합니다.
import { defineConfig } from 'vite';

const HOST = process.env.VUE_APP_API_SERVER_HOST
const PORT = process.env.VUE_APP_API_SERVER_PORT

export default defineConfig({
  plugins: [
  ],
  resolve: {
    alias: {
      // '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: `http://${HOST}:${PORT}`,
        changeOrigin: true,
      },
    },
  },
});
