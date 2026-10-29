import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuração compatível com Cloudflare Pages:
// - Build command: npm run build
// - Output directory: dist
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    target: 'es2020',
  },
  server: {
    port: 5173,
    open: false,
  },
})
