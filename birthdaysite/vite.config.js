// C:\Code\BirthdaySite\birthdaysite\vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// הסיבה: כשאנחנו משתמשים בדומיין מותאם אישית (gabiandnadav.com), 
// האתר נטען מנתיב השורש, לא מנתיב משני כמו /BirthdaySite/

export default defineConfig({
  plugins: [react()],
  // ⚠️ התיקון העיקרי: משנים את הנתיב ל- '/'
  base: '/', 
})