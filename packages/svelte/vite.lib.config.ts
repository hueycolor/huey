import { copyFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import type { Plugin } from 'vite'
import { defineConfig } from 'vite'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import dts from 'vite-plugin-dts'

const dirname = path.dirname(fileURLToPath(import.meta.url))

function copyDeclarations(): Plugin {
  return {
    name: 'copy-declarations',
    closeBundle() {
      copyFileSync(
        path.resolve(dirname, 'src/index.d.ts'),
        path.resolve(dirname, 'dist/index.d.ts'),
      )
    },
  }
}

export default defineConfig({
  plugins: [
    svelte(),
    cssInjectedByJsPlugin(),
    dts({
      tsconfigPath: './tsconfig.app.json',
      include: ['src/types.ts'],
      outDir: 'dist',
      entryRoot: 'src',
    }),
    copyDeclarations(),
  ],
  build: {
    copyPublicDir: false,
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      name: 'HueySvelte',
      formats: ['es', 'cjs'],
      fileName: format => `index.${format === 'es' ? 'js' : 'cjs'}`,
    },
    rollupOptions: {
      external: ['svelte', /^svelte\//, '@hueycolor/core'],
      output: {
        globals: {
          svelte: 'Svelte',
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(dirname, './src'),
    },
  },
})
