<script setup lang="ts">
import type { ColorSliderProps } from '@components/internal/channel-slider.vue'
import ChannelSlider from '@components/internal/channel-slider.vue'
import { useHueyContext } from '@composables/use-huey-context'
import { computed } from 'vue'

defineProps<HueSliderProps>()

const { hue } = useHueyContext()

const thumbBg = computed(() => {
  return `hsl(${hue.value}, 100%, 50%)`
})
</script>

<script lang="ts">
export interface HueSliderProps extends /* @vue-ignore */ ColorSliderProps {}
</script>

<template>
  <ChannelSlider
    v-bind="{ ...$props }"
    v-model="hue"
    :aria-label="$props['aria-label'] ?? 'Hue slider'"
    huey-slider
    :max="360"
    :min="0"
    :step="1"
    :style="{
      'background': 'linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)',
      '--huey-thumb-color': thumbBg,
    }"
  />
</template>

<style>

</style>
