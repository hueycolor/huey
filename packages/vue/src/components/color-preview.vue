<script setup lang="ts">
import type { HueyColor } from '@huey/core'
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { useHueyContext } from '../composables/use-huey-context'

const { color } = defineProps<ColorSwatchProps>()

const { hue, saturation, lightness, alpha } = useHueyContext()

const bg = computed(() => {
  const hslString = `hsla(${hue.value}, ${saturation.value}%, ${lightness.value}%, ${alpha.value})`

  return `
    linear-gradient(${hslString}, ${hslString}),
    repeating-conic-gradient(
      #ffffff 0deg,
      #ffffff 90deg,
      rgba(0, 0, 0, 0.3) 90deg,
      rgba(0, 0, 0, 0.3) 180deg
    ) 25% 25% / var(--opacity-tile) var(--opacity-tile)
  `
})
</script>

<script lang="ts">
export interface ColorSwatchProps {
  class?: HTMLAttributes['class']
  color: HueyColor
}
</script>

<template>
  <div
    huey-preview
    :class="$props.class"
    :style="{ background: bg }"
    :aria-label="color.toRgbString()"
    role="presentation"
    aria-live="polite"
  />
</template>

<style>
[huey-preview] {
  --preview-tile: 20px;
  --opacity-tile: calc(var(--preview-tile) - 50%);

  display: inline-block;
  width: var(--preview-tile);
  height: var(--preview-tile);
  border-radius: calc(var(--preview-tile) - 80%);
}
</style>
