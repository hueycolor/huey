<script setup lang="ts">
import { hueyColor } from '@hueycolor/core'
import { BlueInput, GreenInput, HueyRoot, RedInput } from '@hueycolor/vue'
import { ref } from 'vue'

const color = ref(hueyColor('#1A3263'))
</script>

<template>
  <div class="hex-input">
    <HueyRoot v-model="color">
      <label for="r">
        <span class="sr-only">Red</span>
        <RedInput id="r" />
      </label>
      <label for="g">
        <span class="sr-only">Green</span>
        <GreenInput id="g" />
      </label>
      <label for="b">
        <span class="sr-only">Blue</span>
        <BlueInput id="b" />
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
