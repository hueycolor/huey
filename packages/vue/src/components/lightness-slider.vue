<script setup lang="ts">
import ChannelSlider from '@components/internal/channel-slider.vue'
import { useHueyContext } from '@composables/use-huey-context'
import { computed } from 'vue'

const { hue, saturation, lightness } = useHueyContext()

const thumbBg = computed(() => {
  return `hsl(${hue.value}, ${saturation.value}%, ${lightness.value}%)`
})

const trackBg = computed(() => {
  return `linear-gradient(to right, #000, hsl(${hue.value}, ${saturation.value}%, 50%), #fff)`
})
</script>

<script lang="ts">
</script>

<template>
  <ChannelSlider
    v-model="lightness"
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
