<script setup lang="ts">
import { hueyColor } from '@hueycolor/core'
import { HueInput, HueyRoot, LightnessInput, SaturationInput } from '@hueycolor/vue'
import { ref } from 'vue'

const color = ref(hueyColor('#1A3263'))
</script>

<template>
  <div class="hex-input">
    <HueyRoot v-model="color">
      <label for="h">
        <span class="sr-only">Hue</span>
        <HueInput id="h" />
      </label>
      <label for="s">
        <span class="sr-only">Saturation</span>
        <SaturationInput id="s" />
      </label>
      <label for="l">
        <span class="sr-only">Lightness</span>
        <LightnessInput id="l" />
      </label>
    </HueyRoot>
  </div>
</template>

<style scoped>
:deep([huey-input]) {
  border: 1px solid var(--color-neutral-100);
  border-radius: var(--radius-8);
  height: 48px;
  padding-inline: var(--spacing-8);
}

.hex-input {
  width: 200px;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-16);
}
</style>
