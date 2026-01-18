<script setup lang="ts">
import type { ArrowDirection } from '@huey/core'
import type { InputHTMLAttributes } from 'vue'
import ChannelInput from '@components/internal/channel-input.vue'
import { useHueyContext } from '@composables/use-huey-context'
import { getChannelBounds, hslToRgb, rgbToHsl } from '@huey/core'
import { ref, watch } from 'vue'

defineProps<RedInputProps>()

const { min, max } = getChannelBounds('g')

const { hue, saturation, lightness, colorValue } = useHueyContext()

const { b } = colorValue.value.toRgb()
const blueRef = ref(b.toFixed(0))

watch([hue, saturation, lightness], ([newHue, newSaturation, newLightness]) => {
  const { b } = hslToRgb(newHue, newSaturation, newLightness)
  const rounded = b.toFixed(0)

  if (blueRef.value !== rounded) {
    blueRef.value = rounded
  }
})

function updateValue(input: HTMLInputElement, value: number) {
  input.value = String(value)
  blueRef.value = input.value

  const { r, g } = colorValue.value.toRgb()
  const { h } = rgbToHsl(r, g, value)
  hue.value = h
}

function handleEnter(e: KeyboardEvent) {
  const input = e.target as HTMLInputElement
  const value = Number(input.value)

  if (Number.isNaN(value) || value < min || value > max) {
    input.value = blueRef.value

    return
  }

  updateValue(input, value)
}

function bumpValue(e: KeyboardEvent, direction: Exclude<ArrowDirection, 'left' | 'right'>) {
  const input = e.target as HTMLInputElement
  const current = Number(input.value)

  let step = e.shiftKey ? 10 : 1
  step *= direction === 'down' ? -1 : 1

  const base = Number.isNaN(current) ? Number(blueRef.value) : current
  const value = Math.min(max, Math.max(min, base + step))

  updateValue(input, value)
}
</script>

<script lang="ts">
export interface RedInputProps extends /* @vue-ignore */ InputHTMLAttributes {}
</script>

<template>
  <ChannelInput
    :value="blueRef"
    :aria-valuemax="max"
    :aria-valuemin="min"
    :aria-valuenow="blueRef"
    @keydown.prevent.enter="handleEnter"
    @keydown.prevent.up="bumpValue($event, 'up')"
    @keydown.prevent.down="bumpValue($event, 'down')"
  />
</template>
