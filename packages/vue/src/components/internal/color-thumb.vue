<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

defineProps<ColorThumbProps>()
</script>

<script lang="ts">
export interface ColorThumbProps {
  class?: HTMLAttributes['class']
}
</script>

<template>
  <div huey-slider-thumb :class="$props.class" />
</template>

<style>
  [huey-slider-thumb] {
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    height: var(--huey-slider-track-height);
    aspect-ratio: 1 / 1;
    background-color: var(--huey-thumb-color, white);
    border-radius: calc(infinity * 1px);
    box-shadow: 0 0 0 2px white
  }
</style>
