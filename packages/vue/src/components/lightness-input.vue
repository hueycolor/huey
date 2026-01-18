<script setup lang="ts">
import type { ArrowDirection } from '@huey/core'
import type { InputHTMLAttributes } from 'vue'
import ChannelInput from '@components/internal/channel-input.vue'
import { useHueyContext } from '@composables/use-huey-context'
import { getChannelBounds } from '@huey/core'
import { ref, watch } from 'vue'

const { min, max } = getChannelBounds('l')

const { lightness } = useHueyContext()

const lightnessRef = ref(lightness.value.toFixed(0))

watch(lightness, (newLightness) => {
  const rounded = newLightness.toFixed(0)

  if (lightnessRef.value !== rounded) {
    lightnessRef.value = rounded
  }
})

function updateValue(input: HTMLInputElement, value: number) {
  input.value = String(value)
  lightnessRef.value = input.value
  lightness.value = value
}

function handleEnter(e: KeyboardEvent) {
  const input = e.target as HTMLInputElement
  const value = Number(input.value)

  if (Number.isNaN(value) || value < min || value > max) {
    input.value = lightnessRef.value

    return
  }

  updateValue(input, value)
}

function bumpValue(e: KeyboardEvent, direction: Exclude<ArrowDirection, 'left' | 'right'>) {
  const input = e.target as HTMLInputElement
  const current = Number(input.value)

  let step = e.shiftKey ? 10 : 1
  step *= direction === 'down' ? -1 : 1

  const base = Number.isNaN(current) ? Number(lightnessRef.value) : current
  const value = Math.min(max, Math.max(min, base + step))

  updateValue(input, value)
}
</script>

<script lang="ts">
export interface LightnessInputProps extends /* @vue-ignore */ InputHTMLAttributes {}
</script>

<template>
  <ChannelInput
    :value="lightnessRef"
    :aria-valuemax="max"
    :aria-valuemin="min"
    :aria-valuenow="lightnessRef"
    @keydown.prevent.enter="handleEnter"
    @keydown.prevent.up="bumpValue($event, 'up')"
    @keydown.prevent.down="bumpValue($event, 'down')"
  />
</template>
