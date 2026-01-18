<script setup lang="ts">
import type { ArrowDirection } from '@huey/core'
import type { InputHTMLAttributes } from 'vue'
import ChannelInput from '@components/internal/channel-input.vue'
import { useHueyContext } from '@composables/use-huey-context'
import { getChannelBounds, hslToRgb, rgbToHsl } from '@huey/core'
import { ref, watch } from 'vue'

defineProps<RedInputProps>()

const { min, max } = getChannelBounds('r')

const { hue, saturation, lightness, colorValue } = useHueyContext()

const { r } = colorValue.value.toRgb()
const redRef = ref(r.toFixed(0))

watch([hue, saturation, lightness], ([newHue, newSaturation, newLightness]) => {
  const { r } = hslToRgb(newHue, newSaturation, newLightness)
  const rounded = r.toFixed(0)

  if (redRef.value !== rounded) {
    redRef.value = rounded
  }
})

function updateValue(input: HTMLInputElement, value: number) {
  input.value = String(value)
  redRef.value = input.value

  const { g, b } = colorValue.value.toRgb()
  const { h } = rgbToHsl(value, g, b)
  hue.value = h
}

function handleEnter(e: KeyboardEvent) {
  const input = e.target as HTMLInputElement
  const value = Number(input.value)

  if (Number.isNaN(value) || value < min || value > max) {
    input.value = redRef.value

    return
  }

  updateValue(input, value)
}

function bumpValue(e: KeyboardEvent, direction: Exclude<ArrowDirection, 'left' | 'right'>) {
  const input = e.target as HTMLInputElement
  const current = Number(input.value)

  let step = e.shiftKey ? 10 : 1
  step *= direction === 'down' ? -1 : 1

  const base = Number.isNaN(current) ? Number(redRef.value) : current
  const value = Math.min(max, Math.max(min, base + step))

  updateValue(input, value)
}
</script>

<script lang="ts">
export interface RedInputProps extends /* @vue-ignore */ InputHTMLAttributes {}
</script>

<template>
  <ChannelInput
    :value="redRef"
    :aria-valuemax="max"
    :aria-valuemin="min"
    :aria-valuenow="redRef"
    @keydown.prevent.enter="handleEnter"
    @keydown.prevent.up="bumpValue($event, 'up')"
    @keydown.prevent.down="bumpValue($event, 'down')"
  />
</template>
