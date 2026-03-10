<script setup lang="ts">
import { hueyColor } from '@hueycolor/core'
import { ColorDropper, HueyRoot } from '@hueycolor/vue'
import { ref } from 'vue'

const color = ref(hueyColor('#1A3263'))
</script>

<template>
  <div class="color-dropper">
    <HueyRoot v-model="color">
      <ColorDropper>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pipette-icon lucide-pipette"><path d="m12 9-8.414 8.414A2 2 0 0 0 3 18.828v1.344a2 2 0 0 1-.586 1.414A2 2 0 0 1 3.828 21h1.344a2 2 0 0 0 1.414-.586L15 12" /><path d="m18 9 .4.4a1 1 0 1 1-3 3l-3.8-3.8a1 1 0 1 1 3-3l.4.4 3.4-3.4a1 1 0 1 1 3 3z" /><path d="m2 22 .414-.414" /></svg>
      </ColorDropper>
    </HueyRoot>
    <div class="fallback">
      <span>(◡︵◡)</span>
      <span>
        EyeDropper API not supported
      </span>
    </div>
  </div>
</template>

<style scoped>
:deep([huey-color-dropper]) {
  background-color: white;
  height: 48px;
  width: 48px;
  border-radius: var(--radius-8);
  border: 1px solid var(--color-neutral-100);
  transition: all 300ms ease-out;
}

.color-dropper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-16);

  .fallback {
    display: none;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: var(--spacing-8);
    font: var(--docs-sm);
    color: var(--color-neutral-500);
    text-wrap: pretty;
  }

  &:not(:has([huey-color-dropper])) {
    .fallback {
      display: flex;
    }
  }
}
</style>
