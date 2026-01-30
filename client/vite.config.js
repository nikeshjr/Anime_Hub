import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      'jgy6qd2ypvrd.share.zrok.io'
    ],
    proxy: {
      '/api': 'http://localhost:8888',
      '/uploads': 'http://localhost:8888'
    }
  }
})