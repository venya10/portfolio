import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Served from https://venya10.github.io/portfolio/ on GitHub Pages
export default defineConfig({
  base: '/portfolio/',
  plugins: [react()],
})
