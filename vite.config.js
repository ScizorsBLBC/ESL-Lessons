import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  // Use a conditional expression to set the base path
  const base = command === 'serve' ? '/' : '/ESL-Lessons/';

  return {
    plugins: [react()],
    // The base path is now dynamically determined
    base: base,
    // Proxy API requests to the backend server
    server: {
      proxy: {
        '/api': 'http://localhost:3001',
      },
      // This is the key fix for the refresh issue
      historyApiFallback: true,
    },
  };
});