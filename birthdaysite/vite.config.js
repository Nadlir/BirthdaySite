// C:\Code\BirthdaySite\birthdaysite\vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ודא ששם הריפוזיטורי הוא הנכון
const repoName = 'BirthdaySite'; // השתמש בשם הריפו שאתה דוחף אליו!

export default defineConfig({
  plugins: [react()],
  // הנתיב חייב להיות מוגדר כך: /שם-הריפוזיטורי/
  base: `/${repoName}/`, 
})