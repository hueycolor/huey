<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

const props = defineProps<ColorThumbProps>()
</script>

<script lang="ts">
export interface ColorThumbProps extends /* @vue-ignore */ HTMLAttributes {
  class?: HTMLAttributes['class']
}
</script>

<template>
  <div huey-slider-thumb v-bind="{ ...props }" />
</template>

<style>
  [huey-slider-thumb] {
    --huey-thumb-size: var(--huey-slider-track-height, 16px);

    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    height: var(--huey-thumb-size);
    aspect-ratio: 1 / 1;
    background-color: var(--huey-thumb-color, white);
    border-radius: calc(infinity * 1px);
    box-shadow: 0 0 0 2px white
  }
</style>
