export type Framework = 'vue' | 'svelte' | 'core'

export interface Snippet {
  name: Framework
  icon: string
  package: string
}

export const NpmSnippets: Snippet[] = [
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
