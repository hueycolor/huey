<script setup lang="ts">
import { hueyColor } from '@hueycolor/core'
import { AlphaSlider, HueyRoot } from '@hueycolor/vue'
import { ref } from 'vue'

const color = ref(hueyColor('#ff0000'))
</script>

<template>
  <div class="hsl-sliders">
    <HueyRoot v-model="color">
      <AlphaSlider />
    </HueyRoot>
  </div>
</template>

<style scoped>
:deep([huey-slider-track]) {
  --huey-slider-track-width: 100%;
}

.hsl-sliders {
  width: 200px;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-16);
}
</style>
