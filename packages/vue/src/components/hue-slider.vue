<script setup lang="ts">
import { computed } from 'vue'
import ChannelSlider from './internal/channel-slider.vue'

const colorValue = defineModel<number>({ default: 0 })

const thumbBg = computed(() => {
  return `hsl(${colorValue.value}, 100%, 50%)`
})
</script>

<script lang="ts">
</script>

<template>
  <ChannelSlider
    v-model="colorValue"
    huey-slider
    :max="359"
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
