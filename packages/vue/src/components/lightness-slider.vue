<script setup lang="ts">
import type { ColorSliderProps } from '@components/internal/channel-slider.vue'
import ChannelSlider from '@components/internal/channel-slider.vue'
import { useHueyContext } from '@composables/use-huey-context'
import { computed } from 'vue'

defineProps<LightnessSliderProps>()

const { hue, saturation, lightness } = useHueyContext()

const thumbBg = computed(() => {
  return `hsl(${hue.value}, ${saturation.value}%, ${lightness.value}%)`
})

const trackBg = computed(() => {
  return `linear-gradient(to right, #000, hsl(${hue.value}, ${saturation.value}%, 50%), #fff)`
})
</script>

<script lang="ts">
export interface LightnessSliderProps extends /* @vue-ignore */ ColorSliderProps {}
</script>

<template>
  <ChannelSlider
    v-bind="{ ...$props }"
    v-model="lightness"
    :aria-label="$props['aria-label'] ?? 'Lightness slider'"
    huey-slider
    :max="100"
    :min="0"
    :step="1"
    :style="{
      'background': trackBg,
      '--huey-thumb-color': thumbBg,
    }"
  />
</template>

<style>

</style>
