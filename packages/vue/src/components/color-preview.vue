<script setup lang="ts">
import type { HueyColor } from '@huey/core'
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'

const { color } = defineProps<ColorSwatchProps>()

const bg = computed(() => {
  const rgba = color.toRgbString()

  return `
    linear-gradient(${rgba}, ${rgba}),
    repeating-conic-gradient(
      #ffffff 0deg,
      #ffffff 90deg,
      rgba(0, 0, 0, 0.3) 90deg,
      rgba(0, 0, 0, 0.3) 180deg
    ) 25% 25% / var(--transparency-tile-size) var(--transparency-tile-size)
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
    data-huey-preview
    :class="$props.class"
    :style="{ background: bg }"
    :aria-label="color.toRgbString()"
    role="presentation"
    aria-live="polite"
  />
</template>

<style>
[data-huey-preview] {
  --preview-tile-size: 20px;
  --transparency-tile-size: calc(var(--preview-tile-size) - 50%);

  display: inline-block;
  width: var(--preview-tile-size);
  height: var(--preview-tile-size);
  border-radius: calc(var(--preview-tile-size) - 80%);
}
</style>
