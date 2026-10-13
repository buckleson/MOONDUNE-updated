import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// `--mode pages` builds the GitHub Pages preview under /MOONDUNE-updated/ (see .env.pages).
export default defineConfig(({ mode }) => ({
  base: mode === 'pages' ? '/MOONDUNE-updated/' : '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
}))
