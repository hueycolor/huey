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

const { g } = colorValue.value.toRgb()
const greenRef = ref(g.toFixed(0))

watch([hue, saturation, lightness], ([newHue, newSaturation, newLightness]) => {
  const { g } = hslToRgb(newHue, newSaturation, newLightness)
  const rounded = g.toFixed(0)

  if (greenRef.value !== rounded) {
    greenRef.value = rounded
  }
})

function updateValue(input: HTMLInputElement, value: number) {
  input.value = String(value)
  greenRef.value = input.value

  const { r, b } = colorValue.value.toRgb()
  const { h } = rgbToHsl(r, value, b)
  hue.value = h
}

function handleEnter(e: KeyboardEvent) {
  const input = e.target as HTMLInputElement
  const value = Number(input.value)

  if (Number.isNaN(value) || value < min || value > max) {
    input.value = greenRef.value

    return
  }

  updateValue(input, value)
}

function bumpValue(e: KeyboardEvent, direction: Exclude<ArrowDirection, 'left' | 'right'>) {
  const input = e.target as HTMLInputElement
  const current = Number(input.value)

  let step = e.shiftKey ? 10 : 1
  step *= direction === 'down' ? -1 : 1

  const base = Number.isNaN(current) ? Number(greenRef.value) : current
  const value = Math.min(max, Math.max(min, base + step))

  updateValue(input, value)
}
</script>

<script lang="ts">
export interface RedInputProps extends /* @vue-ignore */ InputHTMLAttributes {}
</script>

<template>
  <ChannelInput
    :value="greenRef"
    :aria-valuemax="max"
    :aria-valuemin="min"
    :aria-valuenow="greenRef"
    @keydown.prevent.enter="handleEnter"
    @keydown.prevent.up="bumpValue($event, 'up')"
    @keydown.prevent.down="bumpValue($event, 'down')"
  />
</template>
