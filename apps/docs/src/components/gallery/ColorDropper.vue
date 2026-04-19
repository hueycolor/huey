<script setup lang="ts">
import { hueyColor } from '@hueycolor/core'
import { ColorDropper, HueyRoot } from '@hueycolor/vue'
import { ref } from 'vue'

const color = ref(hueyColor('#1A3263'))
// @ts-expect-error TS unaware of EyeDropper
const isSupported = typeof window !== 'undefined' && !!window.EyeDropper
</script>

<template>
  <div class="color-dropper">
    <HueyRoot v-if="isSupported" v-model="color">
      <ColorDropper>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pipette-icon lucide-pipette"><path d="m12 9-8.414 8.414A2 2 0 0 0 3 18.828v1.344a2 2 0 0 1-.586 1.414A2 2 0 0 1 3.828 21h1.344a2 2 0 0 0 1.414-.586L15 12" /><path d="m18 9 .4.4a1 1 0 1 1-3 3l-3.8-3.8a1 1 0 1 1 3-3l.4.4 3.4-3.4a1 1 0 1 1 3 3z" /><path d="m2 22 .414-.414" /></svg>
      </ColorDropper>
    </HueyRoot>
    <div v-else class="fallback">
      <span>(◡︵◡)</span>
      <span>
        EyeDropper API not supported
      </span>
    </div>
  </div>
</template>

<style scoped>
.color-dropper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-16);

  .fallback {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: var(--spacing-8);
    font: var(--docs-sm);
    color: var(--color-neutral-500);
    text-wrap: pretty;
  }
}
</style>
