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
    role="presentation"
    aria-live="polite"
  />
</template>

<style>
[huey-preview] {
  --preview-tile: 20px;
  --opacity-tile: calc(var(--preview-tile) - 50%);

  overflow: hidden;
  position: relative;
  display: inline-block;
  width: var(--preview-tile);
  height: var(--preview-tile);
  border-radius: calc(var(--preview-tile) - 80%);
}

[huey-preview]::before {
  content: "";
  display: block;
  margin-left: auto;
  width: 50%;
  height: 100%;
  opacity: v-bind(tilesOpacity);
  background: url(data:image/svg+xml;utf8,%3Csvg%20width%3D%226%22%20height%3D%226%22%20viewBox%3D%220%200%206%206%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M0%200H3V3H0V0Z%22%20fill%3D%22%23E1E1E1%22/%3E%3Cpath%20d%3D%22M3%200H6V3H3V0Z%22%20fill%3D%22white%22/%3E%3Cpath%20d%3D%22M3%203H6V6H3V3Z%22%20fill%3D%22%23E1E1E1%22/%3E%3Cpath%20d%3D%22M0%203H3V6H0V3Z%22%20fill%3D%22white%22/%3E%3C/svg%3E%0A)
}

[huey-preview][data-split-view="false"]::before {
  width: 100%;
}
</style>
