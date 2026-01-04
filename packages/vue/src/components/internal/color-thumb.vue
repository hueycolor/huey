<script setup lang="ts">
import type { HueyColor } from '@huey/core'
import type { HTMLAttributes } from 'vue'

defineProps<ColorThumbProps>()
</script>

<script lang="ts">
export interface ColorThumbProps {
  class?: HTMLAttributes['class']
  color?: HueyColor // TODO: Make color required
}
</script>

<template>
  <div huey-thumb :class="$props.class" />
</template>

<style>
  [huey-thumb] {
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    height: var(--huey-slider-track-height);
    aspect-ratio: 1 / 1;
    background-color: wheat;
    border-radius: calc(infinity * 1px);
  }
</style>
