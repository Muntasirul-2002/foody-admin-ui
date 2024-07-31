import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
proxy:{
  "/admin":"https://foody-backend-k0z8.onrender.com"
}
  },
  plugins: [react()],
})
