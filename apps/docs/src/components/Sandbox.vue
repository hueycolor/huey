<script setup lang="ts">
import LigmaPicker from './playground-pickers/LigmaPicker.vue'
</script>

<template>
  <div class="sandbox">
    <div class="">
      Tabs
    </div>
    <div class="pickers">
      <LigmaPicker />
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
