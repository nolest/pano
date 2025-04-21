import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { splitVendorChunkPlugin } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    splitVendorChunkPlugin()
  ],
  resolve: {
    alias: {
      base: '.',
      '@': '/src',
    },
  },
  build: {
    chunkSizeWarningLimit: 1000, // 調整為更大的值，單位為 KB
    rollupOptions: {
      output: {
        manualChunks: {
          // three.js 相關庫單獨打包
          'vendor-three': ['three', 'three/addons/controls/OrbitControls.js'],
          // React 和 Redux 相關庫打包在一起
          'vendor-react': ['react', 'react-dom', 'react-redux', '@reduxjs/toolkit', 'redux'],
          // p5 相關庫
          'vendor-p5': ['p5', '@p5-wrapper/react'],
          // react-three 相關庫
          'vendor-react-three': ['@react-three/drei', '@react-three/fiber']
        }
      }
    }
  },
  // 優化 dev 伺服器的性能
  server: {
    hmr: {
      overlay: false  // 禁用熱更新覆蓋層，可以略微提高性能
    }
  }
})
