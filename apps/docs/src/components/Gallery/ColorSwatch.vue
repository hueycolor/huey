<script setup lang="ts">
import { hueyColor } from '@hueycolor/core'
import { ColorSwatch, HueyRoot } from '@hueycolor/vue'
import { ref } from 'vue'

const color = ref(hueyColor('#ff0000'))
</script>

<template>
  <div class="hex-input">
    <HueyRoot v-model="color">
      <ColorSwatch :swatch="['#007680', '#24B2FF', '#FFBA51', '#FFD013', '#F65600']" />
    </HueyRoot>
  </div>
</template>

<style scoped>
:deep([huey-swatch]) {
  background-color: white;
  padding: var(--spacing-8);
  border-radius: var(--radius-8);
}

.hex-input {
  width: fit-content;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-16);
}
</style>
