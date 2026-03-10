<script setup lang="ts">
import { hueyColor } from '@hueycolor/core'
import { BlueInput, GreenInput, HueyRoot, RedInput } from '@hueycolor/vue'
import { ref } from 'vue'

const color = ref(hueyColor('#ff0000'))
</script>

<template>
  <div class="hex-input">
    <HueyRoot v-model="color">
      <RedInput />
      <GreenInput />
      <BlueInput />
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
