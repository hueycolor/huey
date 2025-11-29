<script setup lang="ts">
import type { HueyColor } from '@huey/core'
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'

const { color } = defineProps<ColorSwatchProps>()

const bg = computed(() => {
  const { r, g, b, a } = color.toRgb()

  return `
    linear-gradient(rgba(${r}, ${g}, ${b}, ${a}), rgba(${r}, ${g}, ${b}, ${a})),
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
    class="huey-color-preview"
    :class="$props.class"
    :style="{ background: bg }"
    :aria-label="color.toOklchString()"
    role="presentation"
    aria-live="polite"
  />
</template>

<style>
.huey-color-preview {
  --preview-tile-size: 20px;
  --transparency-tile-size: calc(var(--preview-tile-size) - 50%);

  display: inline-block;
  width: var(--preview-tile-size);
  height: var(--preview-tile-size);
  border-radius: calc(var(--preview-tile-size) - 80%);
}
</style>
