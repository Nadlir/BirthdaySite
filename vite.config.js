// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // *** וודא שהשורה הזו קיימת ונכונה ***
  base: '/', 
})