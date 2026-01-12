<script setup lang="ts">
import { hueyColor } from '@huey/core'
import { ref, watch } from 'vue'
import { AlphaSlider, ChannelInput, ColorDropper, ColorPreview, SaturationArea } from './components'
import HueSlider from './components/hue-slider.vue'
import HueyRoot from './components/huey-root.vue'

// Test huey core
const color = ref(hueyColor('#00ff00'))

watch(color, (newColor) => {
  console.log(newColor.toHexString())
})
</script>

<template>
  <div>
    <HueyRoot v-model="color">
      <SaturationArea color-format="hex" />
      <HueSlider />
      <AlphaSlider />
      <ColorDropper>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pipette-icon lucide-pipette"><path d="m12 9-8.414 8.414A2 2 0 0 0 3 18.828v1.344a2 2 0 0 1-.586 1.414A2 2 0 0 1 3.828 21h1.344a2 2 0 0 0 1.414-.586L15 12" /><path d="m18 9 .4.4a1 1 0 1 1-3 3l-3.8-3.8a1 1 0 1 1 3-3l.4.4 3.4-3.4a1 1 0 1 1 3 3z" /><path d="m2 22 .414-.414" /></svg>
      </ColorDropper>
      <ColorPreview />
      <!-- <ChannelInput channel="h" /> -->
    </HueyRoot>
  </div>
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
