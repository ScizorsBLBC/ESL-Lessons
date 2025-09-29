import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // FIX: Change base path to relative ('./') for GitHub Pages compatibility.
  base: './',
  build: {
    // Optimize chunk size for better loading performance
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor libraries for better caching
          'react-vendor': ['react', 'react-dom'],
          'mui-vendor': ['@mui/material', '@mui/icons-material', '@emotion/react', '@emotion/styled'],
          'utils': ['axios', 'chart.js', 'react-chartjs-2']
        }
      }
    },
    // Reduce CSS size
    cssCodeSplit: true,
    // Minify for production
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true
      }
    }
  }
})