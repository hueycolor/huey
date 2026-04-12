<script lang="ts" module>
  export interface ColorPreviewProps {
    class?: string
    splitPreview?: boolean
  }
</script>

<script lang="ts">
  import { useHueyContext } from '../context/huey-context.svelte'

  let { class: className, splitPreview = true }: ColorPreviewProps = $props()

  const ctx = useHueyContext()

  const tilesOpacity = $derived(`${Math.abs((ctx.alpha * 100) - 100) / 100}`)
  const bg = $derived(`hsl(${ctx.hue}, ${ctx.saturation}%, ${ctx.lightness}%)`)

  const previewMarker: Record<string, string | boolean> = { 'huey-preview': '' }
</script>

<div
  {...previewMarker}
  data-split-view={splitPreview}
  class={className}
  style={`background: ${bg}; --huey-preview-tiles-opacity: ${tilesOpacity};`}
  aria-label={`hsl(${ctx.hue}, ${ctx.saturation}%, ${ctx.lightness}%, ${ctx.alpha})`}
  role="img"
  aria-live="polite"
></div>

<style>
  :global {
    [huey-preview] {
      --huey-preview-tile-size: 20px;

      overflow: hidden;
      position: relative;
      display: inline-block;
      width: var(--huey-preview-tile-size);
      height: var(--huey-preview-tile-size);
      border-radius: calc(var(--huey-preview-tile-size) - 80%);
    }

    [huey-preview]::before {
      content: '';
      display: block;
      margin-left: auto;
      width: 50%;
      height: 100%;
      opacity: var(--huey-preview-tiles-opacity);
      background: url("data:image/svg+xml,<svg width='6' height='6' viewBox='0 0 6 6' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M0 0H3V3H0V0Z' fill='%23E1E1E1'/><path d='M3 0H6V3H3V0Z' fill='white'/><path d='M3 3H6V6H3V3Z' fill='%23E1E1E1'/><path d='M0 3H3V6H0V3Z' fill='white'/></svg>");
    }

    [huey-preview][data-split-view='false']::before {
      width: 100%;
    }
  }
</style>
