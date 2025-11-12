// C:\Code\BirthdaySite\birthdaysite\vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// התיקון הקריטי: הגדרת הנתיב היחסי ל- './'
// זה מכריח את הדפדפן לחפש את קבצי ה-assets ביחס לנתיב הנוכחי,
// מה שפותר בעיות טעינה בדומיינים מותאמים אישית.
export default defineConfig({
  plugins: [react()],
  base: './', 
})