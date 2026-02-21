export type Framework = 'vue' | 'svelte'

interface Snippet {
  name: Framework
  icon: string
  package: string
}

export const NpmSnippets: Record<Framework, Snippet> = {
  vue: {
    name: 'vue',
    icon: '',
    package: '@hueyColor/vue',
  },
  svelte: {
    name: 'svelte',
    icon: '',
    package: '@hueyColor/svelte',
  },
}
