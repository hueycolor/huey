<script setup lang="ts">
import ChannelSlider from '@components/internal/channel-slider.vue'
import { useHueyContext } from '@composables/use-huey-context'
import { computed } from 'vue'

defineProps<AlphaSliderProps>()

const { hue, saturation, lightness, alpha } = useHueyContext()

const alphaSliderBg = computed(() => {
  return `
    linear-gradient(to right, hsla(${hue.value}, ${saturation.value}%, ${lightness.value}%, 0), hsla(${hue.value}, ${saturation.value}%, ${lightness.value}%, 1)),
      repeating-conic-gradient(
        #ffffff 0deg,
        #ffffff 90deg,
        rgba(0, 0, 0, 0.3) 90deg,
        rgba(0, 0, 0, 0.3) 180deg
      ) 0% -25% / 6px 6px
  `
})

const thumbBg = computed(() => {
  return `hsl(${hue.value}, ${saturation.value}%, ${lightness.value}%)`
})
</script>

<script lang="ts">
export interface AlphaSliderProps {}
</script>

<template>
  <ChannelSlider
    v-model="alpha"
    huey-slider
    :max="1"
    :min="0"
    :step="0.01"
    :style="{
      'background': alphaSliderBg,
      '--huey-thumb-color': thumbBg,
    }"
  />
</template>
