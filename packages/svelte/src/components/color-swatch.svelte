<script lang="ts" module>
  export interface ColorSwatchProps {
    swatch: Array<string>
    'aria-label'?: string
  }
</script>

<script lang="ts">
  import { hueyColor } from '@hueycolor/core'
  import { useHueyContext } from '../context/huey-context.svelte'

  let { swatch, 'aria-label': ariaLabel }: ColorSwatchProps = $props()

  const ctx = useHueyContext()

  function chooseColor(e: Event, color: string) {
    e.preventDefault()
    ctx.setColor(color)
  }

  const selectedColor = $derived(ctx.colorValue.toHexString())

  function isSelected(color: string) {
    const compareToColor = hueyColor(color).toHexString()
    return selectedColor === compareToColor
  }

  function onKeydown(e: KeyboardEvent, color: string) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      chooseColor(e, color)
    }
  }

  const swatchMarker: Record<string, string> = { 'huey-swatch': '' }
  const swatchColorMarker: Record<string, string> = { 'huey-swatch-color': '' }
</script>

{#if swatch}
  <div {...swatchMarker} role="listbox" aria-label={ariaLabel ?? 'Color swatch'}>
    {#each swatch as color (color)}
      <div
        {...swatchColorMarker}
        tabindex="0"
        role="option"
        aria-label={color}
        aria-selected={isSelected(color)}
        style={`--swatch-color: ${color};`}
        onclick={e => chooseColor(e, color)}
        onkeydown={e => onKeydown(e, color)}
      ></div>
    {/each}
  </div>
{/if}

<style>
  :global {
    [huey-swatch] {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      flex-wrap: wrap;
    }

    [huey-swatch-color] {
      --huey-swatch-color-size: 16px;
      --huey-swatch-color-radius: 4px;

      cursor: pointer;
      width: var(--huey-swatch-color-size);
      height: var(--huey-swatch-color-size);
      background-color: var(--swatch-color);
      border-radius: var(--huey-swatch-color-radius);
    }
  }
</style>
