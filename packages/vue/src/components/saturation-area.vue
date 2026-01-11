<script setup lang="ts">
import type { ColorFormat, HueyColor } from '@huey/core'
import { computed } from 'vue'
import { ColorThumb } from '.'

const props = withDefaults(defineProps<SaturationAreaProps>(), {
  colorFormat: 'rgb',
})

const colorValue = defineModel<HueyColor>()

const areaBg = computed(() => {
  const hslString = `hsl(${props.hue}, 100%, 50%)`

  if (props.colorFormat === 'hsl') {
    return `linear-gradient(to top, black, transparent, white), linear-gradient(to right, rgb(128, 128, 128), transparent), ${hslString}`
  }

  return `linear-gradient(to top, black, transparent), linear-gradient(to right, white, transparent),
    ${hslString}`
})

const thumbBg = computed(() => {
  return 'red' // TODO: use the color model
})
</script>

<script lang="ts">
export interface SaturationAreaProps {
  hue: number
  colorFormat?: Exclude<ColorFormat, 'oklch'>
}
</script>

<template>
  <div
    huey-area
    :style="{
      'background': areaBg,
      '--huey-thumb-color': thumbBg,
    }"
  >
    <ColorThumb />
  </div>
</template>

<style>
[huey-area] {
  position: relative;
  width: 240px;
  height: 230px;
  border-radius: 12px;
}
</style>
