<script setup lang="ts">
import type { HueyColor } from '@huey/core'
import { computed } from 'vue'
import ChannelSlider from './internal/channel-slider.vue'

const props = defineProps<AlphaSliderProps>()

const colorValue = defineModel<number>()

const alphaSliderBg = computed(() => {
  const { r, g, b } = props.color.toRgb()

  return `
    linear-gradient(to right, rgba(${r}, ${g}, ${b}, 0), rgba(${r}, ${g}, ${b}, 1)),
      repeating-conic-gradient(
        #ffffff 0deg,
        #ffffff 90deg,
        rgba(0, 0, 0, 0.3) 90deg,
        rgba(0, 0, 0, 0.3) 180deg
      ) 0% -25% / 6px 6px
  `
})

const thumbBg = computed(() => {
  const { r, g, b } = props.color.toRgb()

  return `rgb(${r}, ${g}, ${b})`
})
</script>

<script lang="ts">
export interface AlphaSliderProps {
  color: HueyColor
}
</script>

<template>
  <ChannelSlider
    v-model="colorValue"
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
