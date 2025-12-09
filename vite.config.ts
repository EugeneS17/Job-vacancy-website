import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_PAGES === 'true' ? '/Job-vacancy-website/' : '/',
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-redux'],
          'mantine-vendor': ['@mantine/core', '@mantine/hooks'],
          'redux-vendor': ['@reduxjs/toolkit'],
        },
      },
    },
  },
})
