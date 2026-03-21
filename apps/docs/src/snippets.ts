export type Framework = 'vue' | 'svelte' | 'core'
export type PackageManager = 'npm' | 'pnpm' | 'bun'

export interface Snippet {
  name: Framework | PackageManager
  icon: string
  package: string
}

export const uiLibSnippets: Snippet[] = [
  {
    name: 'vue',
    icon: '',
    package: 'pnpm i @hueycolor/vue',
  },
  {
    name: 'svelte',
    icon: '',
    package: 'pnpm i @hueycolor/svelte',
  },
]

export const coreLibSnippets: Snippet[] = [
  {
    name: 'pnpm',
    icon: '',
    package: 'pnpm i @hueycolor/core',
  },
  {
    name: 'npm',
    icon: '',
    package: 'npm i @hueycolor/core',
  },
  {
    name: 'bun',
    icon: '',
    package: 'bun add @hueycolor/core',
  },
]
