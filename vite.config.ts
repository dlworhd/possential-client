import { fileURLToPath, URL } from 'node:url'; // 모듈 경로는 이렇게 수정해야 합니다.
import { defineConfig } from 'vite';



export default defineConfig({
  plugins: [
  ],
  resolve: {
    alias: {
      // '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    // proxy: {
    //   '/api': {
    //     target: `http://localhost:8080`,
    //     changeOrigin: true,
    //   },
    // },
  },
});
