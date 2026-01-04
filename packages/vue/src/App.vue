<script setup lang="ts">
import { hueyColor } from '@huey/core'
import { ref } from 'vue'
import { AlphaSlider, ChannelInput, ColorDropper, ColorPreview } from './components'
import HelloWorld from './components/HelloWorld.vue'

// Test huey core
const color = ref(hueyColor('#ff3e00c0'))
console.log('Testing @huey/core:', color)

function handleChange(v?: number) {
  console.log(v)
}
</script>

<template>
  <div>
    <AlphaSlider />
    <ColorDropper v-model="color">
      Eye drop
    </ColorDropper>
  </div>
  <ColorPreview :color="color" />
  <ChannelInput channel="h" @update:model-value="handleChange" />
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
