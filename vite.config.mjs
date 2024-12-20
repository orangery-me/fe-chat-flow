// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// export default defineConfig({
//   plugins: [react()],
// });
export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets', // Tạo thư mục assets để chứa các tài nguyên tĩnh
    rollupOptions: {
      input: {
        main: '/src/main.jsx',
        // Thêm các entry file khác nếu cần
      }
    },
  },
  resolve: {
    alias: {
      '@': '../src',
    }
  },
  plugins: [react()],
});
