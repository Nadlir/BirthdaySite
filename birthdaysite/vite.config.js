// C:\Code\BirthdaySite\birthdaysite\vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// חוזרים לנתיב השורש הטהור
export default defineConfig({
  plugins: [react()],
  base: './', 
})