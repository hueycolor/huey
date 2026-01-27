<script setup lang="ts">
import type { ColorSliderProps } from '@components/internal/channel-slider.vue'
import ChannelSlider from '@components/internal/channel-slider.vue'
import { useHueyContext } from '@composables/use-huey-context'
import { computed } from 'vue'

defineProps<SaturationSliderProps>()

const { hue, saturation } = useHueyContext()

const thumbBg = computed(() => {
  return `hsl(${hue.value}, ${saturation.value}%, 50%)`
})

const trackBg = computed(() => {
  return `linear-gradient(to right, hsl(${hue.value}, 0%, 50%), hsl(${hue.value}, 100%, 50%))`
})
</script>

<script lang="ts">
export interface SaturationSliderProps extends /* @vue-ignore */ ColorSliderProps {}
</script>

<template>
  <ChannelSlider
    v-bind="{ ...$props }"
    v-model="saturation"
    :aria-label="$props['aria-label'] ?? 'Saturation slider'"
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
