import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Admin Panel Configuration - Runs on Port 5174
export default defineConfig({
  plugins: [react()],
  base: '/',
  
  build: {
    outDir: '../backend/admin-dist',
    emptyOutDir: true,
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: false
  },
  
  server: {
    port: 5174,
    strictPort: true,
    host: true,
    open: true,
  },
  
  preview: {
    port: 5174,
    strictPort: true,
  }
})
