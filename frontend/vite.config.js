import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Production Configuration
export default defineConfig({
  plugins: [react()],
  
  build: {
    // Optimize bundle size
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true
      }
    },
    
    // Code splitting for better performance
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
        }
      }
    },
    
    // Chunk size warnings
    chunkSizeWarningLimit: 1000,
    
    // Source maps for debugging (disable in production)
    sourcemap: false
  },
  
  // Preview server configuration
  preview: {
    port: 4173,
    strictPort: true,
  },
  
  // Dev server configuration
  server: {
    port: 5173,
    strictPort: true,
    host: true, // Allow network access
    open: true, // Auto-open browser
  }
})
