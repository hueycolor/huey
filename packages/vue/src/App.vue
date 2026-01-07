<script setup lang="ts">
import { hueyColor } from '@huey/core'
import { ref, watch } from 'vue'
import { AlphaSlider, ChannelInput, ColorDropper, ColorPreview } from './components'
import HueSlider from './components/hue-slider.vue'

// Test huey core
const color = ref(hueyColor('#ff0000'))
const alpha = ref(color.value.getAlpha())
const hue = ref(color.value.toHsl().h)

watch(alpha, (newVal) => {
  color.value = color.value.setAlpha(newVal)
})

watch(hue, (newVal) => {
  color.value = color.value.setHue(newVal)
})
</script>

<template>
  <div>
    <HueSlider v-model="hue" :color="color" />
    <AlphaSlider v-model="alpha" :color="color" />
    <ColorDropper v-model="color">
      Eye drop
    </ColorDropper>
  </div>
  <ColorPreview :color="color" />
  <ChannelInput channel="h" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
