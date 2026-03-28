<script setup lang="ts">
import { ref } from 'vue'
import AbodePicker from '@/components/playground-pickers/AbodePicker.vue'
import CromelPicker from '@/components/playground-pickers/CromelPicker.vue'
import LigmaPicker from './playground-pickers/LigmaPicker.vue'

const index = ref(0)

function changePickers() {
  if (index.value === 2) {
    index.value = 0

    return
  }

  index.value += 1
}
</script>

<template>
  <div class="sandbox" @click="changePickers">
    <div class="">
      Tabs
    </div>
    <div class="pickers">
      <LigmaPicker v-if="index === 0" />
      <AbodePicker v-if="index === 1" />
      <CromelPicker v-if="index === 2" />
    </div>
    <span class="hint">Wave your wand to change the color picker style</span>
  </div>
</template>

<style scoped>
.sandbox {
  width: 100%;
  height: 676px;
  max-width: 664px;
  background-color: var(--color-linen-100);
  padding: var(--spacing-24);
  border-radius: var(--radius-32);
  display: flex;
  flex-direction: column;
  align-items: center;

  .pickers {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
  }

  .hint {
    color: var(--color-beige-950);
    font: var(--paragraph-sm)
  }
}
</style>
