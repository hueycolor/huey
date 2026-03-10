<script setup lang="ts">
import { hueyColor } from '@hueycolor/core'
import { ColorPreview, HueyRoot } from '@hueycolor/vue'
import { ref } from 'vue'

const color = ref(hueyColor('#1A326380'))
</script>

<template>
  <div class="hex-input">
    <HueyRoot v-model="color">
      <ColorPreview />
    </HueyRoot>
  </div>
</template>

<style scoped>
:deep([huey-preview]) {
  --preview-tile: 64px
}

.hex-input {
  width: fit-content;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-16);
}
</style>
