<script setup lang="ts">
import type { ColorSliderProps } from '@components/internal/channel-slider.vue'
import ChannelSlider from '@components/internal/channel-slider.vue'
import { useHueyContext } from '@composables/use-huey-context'
import { computed } from 'vue'

defineProps<AlphaSliderProps>()

const { hue, saturation, lightness, alpha } = useHueyContext()

const alphaSliderBg = computed(() => {
  return `
  linear-gradient(90deg, hsla(${hue.value}, ${saturation.value}%, ${lightness.value}%, 0) 0 calc(var(--huey-slider-track-height) / 2), hsla(${hue.value}, ${saturation.value}%, ${lightness.value}%, 1) calc(100% - calc(var(--huey-slider-track-height) / 2)) 100%), url('data:image/svg+xml;utf8,%3Csvg%20width%3D%222%22%20height%3D%222%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M0%200h1v2h1V1H0%22%20fill-rule%3D%22nonzero%22%20fill%3D%22%23e1e1e1%22/%3E%3C/svg%3E') 0 0 / auto 66.67%, #fff
  `
})

const thumbBg = computed(() => {
  return `color-mix(in srgb, white, hsl(${hue.value}, ${saturation.value}%, ${lightness.value}%) ${alpha.value * 100}%)`
})
</script>

<script lang="ts">
export interface AlphaSliderProps extends /* @vue-ignore */ ColorSliderProps {}
</script>

<template>
  <ChannelSlider
    v-bind="{ ...$props }"
    v-model="alpha"
    :aria-label="$props['aria-label'] ?? 'Alpha slider'"
    huey-slider
    :max="1"
    :min="0"
    :step="0.01"
    :style="{
      '--huey-slider-bg': alphaSliderBg,
      '--huey-thumb-color': thumbBg,
    }"
  />
</template>

<style>
  [huey-slider] {
    background: var(--huey-slider-bg)
  }
</style>
