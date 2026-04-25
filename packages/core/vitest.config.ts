import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

const dirname = resolve(fileURLToPath(import.meta.url), '..')

export default defineConfig({
  resolve: {
    alias: {
      '@core': resolve(dirname, './src'),
    },
  },
})
