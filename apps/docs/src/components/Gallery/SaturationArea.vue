<script setup lang="ts">
import { hueyColor } from '@hueycolor/core'
import { HueyRoot, SaturationArea } from '@hueycolor/vue'
import { ref } from 'vue'

const color = ref(hueyColor('#ff0000'))
</script>

<template>
  <div class="saturation-area">
    <HueyRoot v-model="color">
      <SaturationArea />
    </HueyRoot>
  </div>
</template>

<style scoped>
:deep([huey-area]) {
  height: 200px;
  width: 200px;
}
</style>
