<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { useHueyContext } from '@composables/use-huey-context'
import { computed } from 'vue'

withDefaults(defineProps<ColorPreviewProps>(), {
  splitPreview: true,
})

const { hue, saturation, lightness, alpha } = useHueyContext()

const tilesOpacity = computed(() => {
  return `${Math.abs((alpha.value * 100) - 100) / 100}`
})
const bg = computed(() => {
  return `hsl(${hue.value}, ${saturation.value}%, ${lightness.value}%)`
})
</script>

<script lang="ts">
export interface ColorPreviewProps {
  class?: HTMLAttributes['class']
  splitPreview?: boolean
}
</script>

<template>
  <div
    :data-split-view="splitPreview"
    huey-preview
    :class="$props.class"
    :style="{ background: bg }"
    :aria-label="`hsl(${hue}, ${saturation}%, ${lightness}%, ${alpha})`"
    role="img"
    aria-live="polite"
  />
</template>

<style>
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
  content: "";
  display: block;
  margin-left: auto;
  width: 50%;
  height: 100%;
  opacity: v-bind(tilesOpacity);
  background: url("data:image/svg+xml,<svg width='6' height='6' viewBox='0 0 6 6' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M0 0H3V3H0V0Z' fill='%23E1E1E1'/><path d='M3 0H6V3H3V0Z' fill='white'/><path d='M3 3H6V6H3V3Z' fill='%23E1E1E1'/><path d='M0 3H3V6H0V3Z' fill='white'/></svg>")
}

[huey-preview][data-split-view="false"]::before {
  width: 100%;
}
</style>
