import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // for github pages
  base: '/portfolio/',
  plugins: [react()],
})
