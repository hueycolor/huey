/// <reference types="svelte" />
/// <reference types="vite/client" />

declare module '*.svelte' {
  import type { Component } from 'svelte'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const component: Component<Record<string, any>>
  export default component
}
