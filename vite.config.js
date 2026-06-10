import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import remarkGfm from 'remark-gfm'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [mdx({ remarkPlugins: [remarkGfm] }), react()],
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@pages': '/src/pages',
      '@utils': '/src/utils',
      '@styles': '/src/styles',
      '@assets': '/src/assets',
      '@contexts': '/src/contexts',
    },
  },
})
