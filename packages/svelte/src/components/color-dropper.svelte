<script lang="ts" module>
  /* eslint-disable @typescript-eslint/no-explicit-any */
  
  import type { Snippet } from 'svelte'

  export interface ColorDropperProps {
    'aria-label'?: string
    class?: string
    onerror?: (error: Error) => void
    children?: Snippet
  }
</script>

<script lang="ts">
  import { clamp, hueyColor } from '@hueycolor/core'
  import { useHueyContext } from '../context/huey-context.svelte'

  let { 'aria-label': ariaLabel, class: className, onerror, children }: ColorDropperProps = $props()

  const ctx = useHueyContext()

  const dropper = typeof window !== 'undefined' && (window as any).EyeDropper
    ? new (window as any).EyeDropper()
    : undefined

  function sip() {
    if (!dropper)
      return

    dropper.open().then((result: { sRGBHex: string }) => {
      const newColor = hueyColor(result.sRGBHex)
      const { h, s, l } = newColor.toHsl()

      ctx.hue = clamp(h, 0, 360)
      ctx.saturation = clamp(s, 0, 100)
      ctx.lightness = clamp(l, 0, 100)
    }).catch((e: Error) => {
      onerror?.(e)
    })
  }

  const dropperMarker: Record<string, string> = { 'huey-color-dropper': '' }
</script>

{#if dropper}
  <button
    {...dropperMarker}
    class={className}
    aria-label={ariaLabel ?? 'Eye dropper button'}
    onclick={sip}
  >
    {@render children?.()}
  </button>
{/if}

<style>
  :global {
    [huey-color-dropper] {
      cursor: pointer;
      width: fit-content;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>
