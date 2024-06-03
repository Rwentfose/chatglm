import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy:{
      '/api':{
        target:'http://211.69.16.48:8000/',
        changeOrigin:true,
        rewrite: (path) => path.replace(/^\/api/,'')
      }
    }
  }
})
