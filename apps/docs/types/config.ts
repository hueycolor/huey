export type Framework = 'vue' | 'svelte' | 'core'

export interface Snippet {
  name: Framework
  icon: string
  package: string
}
