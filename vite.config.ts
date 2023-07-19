import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
    }
  },
  base: 'http://192.168.20.174/',
  build: {
    rollupOptions: {
      onwarn: (warning, rollupWarn) => {
        if (warning.code === 'THIS_IS_A_WARNING_CODE') {
          // 忽略特定类型的警告
          return;
        }
        rollupWarn(warning); // 其他类型的警告继续处理
      }
    }
  }
})
