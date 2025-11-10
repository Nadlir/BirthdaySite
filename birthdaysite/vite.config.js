// C:\Code\BirthdaySite\birthdaysite\vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ודא שזה שם הריפוזיטורי המדויק שלך ב-GitHub
const repoName = 'gabi-nadav-surprise'; 

export default defineConfig({
  plugins: [react()],
  // הנתיב חייב להיות מוגדר כך, עם שם הריפוזיטורי
  base: `/${repoName}/`, 
})