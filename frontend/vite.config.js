import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
server:{
     port: 5173,
     proxy: {
        '/api':{
          target:'https://socail-media-9yli.onrender.com',
          changeOrigin:true
        }
     }
  },
  plugins: [react()],
})


