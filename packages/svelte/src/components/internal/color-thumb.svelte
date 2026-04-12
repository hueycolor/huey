<script lang="ts" module>
  import type { HTMLAttributes } from 'svelte/elements'

  export interface ColorThumbProps extends HTMLAttributes<HTMLDivElement> {
    tabindex?: number
  }
</script>

<script lang="ts">
  let { ...rest }: ColorThumbProps = $props()

  const thumbMarker: Record<string, string> = { 'huey-slider-thumb': '' }
</script>

<div {...thumbMarker} {...rest}></div>

<style>
  :global {
    [huey-slider-thumb] {
      position: absolute;
      transform: translate(-50%, -50%);
      top: 50%;
      height: 16px;
      aspect-ratio: 1 / 1;
      background-color: var(--huey-thumb-color, white);
      border-radius: calc(infinity * 1px);
      box-shadow: 0 0 0 2px white;
    }
  }
</style>
