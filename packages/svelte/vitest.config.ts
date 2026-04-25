import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { defineConfig } from 'vitest/config'

const dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [svelte({ hot: false })],
  resolve: {
    alias: {
      '@': path.resolve(dirname, './src'),
    },
    conditions: ['browser'],
  },
  test: {
    environment: 'happy-dom',
  },
})
