<script setup lang="ts">
import type { ArrowDirection } from '@hueycolor/core'
import type { InputHTMLAttributes } from 'vue'
import ChannelInput from '@components/internal/channel-input.vue'
import { useHueyContext } from '@composables/use-huey-context'
import { getChannelBounds } from '@hueycolor/core'
import { ref, watch } from 'vue'

defineProps<SaturationInputProps>()

const { min, max } = getChannelBounds('s')

const { saturation } = useHueyContext()

const saturationRef = ref(saturation.value.toFixed(0))

watch(saturation, (newSaturation) => {
  const rounded = newSaturation.toFixed(0)

  if (saturationRef.value !== rounded) {
    saturationRef.value = rounded
  }
})

function updateValue(input: HTMLInputElement, value: number) {
  input.value = String(value)
  saturationRef.value = input.value
  saturation.value = value
}

function handleEnter(e: KeyboardEvent | FocusEvent) {
  const input = e.target as HTMLInputElement
  const value = Number(input.value)

  if (Number.isNaN(value) || value < min || value > max) {
    input.value = saturationRef.value

    return
  }

  updateValue(input, value)
}

function bumpValue(e: KeyboardEvent, direction: Exclude<ArrowDirection, 'left' | 'right'>) {
  const input = e.target as HTMLInputElement
  const current = Number(input.value)

  let step = e.shiftKey ? 10 : 1
  step *= direction === 'down' ? -1 : 1

  const base = Number.isNaN(current) ? Number(saturationRef.value) : current
  const value = Math.min(max, Math.max(min, base + step))

  updateValue(input, value)
}
</script>

<script lang="ts">
export interface SaturationInputProps extends /* @vue-ignore */ InputHTMLAttributes {}
</script>

<template>
  <ChannelInput
    :value="saturationRef"
    huey-input="saturation"
    @keydown.prevent.enter="handleEnter"
    @keydown.prevent.up="bumpValue($event, 'up')"
    @keydown.prevent.down="bumpValue($event, 'down')"
    @blur="handleEnter"
  />
</template>
