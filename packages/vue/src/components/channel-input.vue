<script setup lang="ts">
import type { ColorChannel, ColorFormat } from '@huey/core'
import { useHueyContext } from '@composables/use-huey-context'
import { clamp, getChannelBounds, hueyColor, rgbToHsl } from '@huey/core'

const { channel, format } = defineProps<ChannelInputProps>()

const modelValue = defineModel<number>()

const { setColor, colorValue } = useHueyContext()

const { min, max } = getChannelBounds(channel)

function handleChange(e: Event) {
  const value = Number((e.target as HTMLInputElement).value)

  if (format === 'hsl' && ['h', 's', 'l', 'a'].includes(channel)) {
    const hsl = colorValue.value.toHsl()
    hsl[channel as keyof typeof hsl] = clamp(value, min, max)

    const h = clamp(hsl.h, 0, 360)
    const s = clamp(hsl.s, 0, 100)
    const l = clamp(hsl.l, 0, 100)
    const a = clamp(hsl.a, 0, 1)

    modelValue.value = hsl[channel as keyof typeof hsl] as number

    setColor(`hsla(${h}, ${s}%, ${l}%, ${a})`)
  }

  // if (format === 'rgb' && ['r', 'g', 'b', 'a'].includes(channel)) {
  //   const rgb = colorValue.value.toRgb()
  //   rgb[channel as keyof typeof rgb] = clamp(value, min, max)

  //   // const r = clamp(Math.round())

  //   // const { r, g, b } = rgb

  //   // const hsl = rgbToHsl(r, g, b)
  // }
}
</script>

<script lang="ts">
export interface ChannelInputProps {
  channel: ColorChannel
  format: Exclude<ColorFormat, 'oklch' | 'hex'>
}
</script>

<template>
  <input
    :value="modelValue"
    type="number"
    inputmode="numeric"
    :min="min"
    :max="max"
    :aria-label="`color channel (${channel}) input`"
    @keydown.prevent.enter="handleChange"
  >
</template>
