<script setup lang="ts">
import ChannelInput from '@components/internal/channel-input.vue'
import { useHueyContext } from '@composables/use-huey-context'
import { getChannelBounds } from '@huey/core'
import { ref, watch } from 'vue'

const { min, max } = getChannelBounds('s')

const { lightness } = useHueyContext()

const lightnessRef = ref(lightness.value.toFixed(0))

watch(lightness, (newHue) => {
  const rounded = newHue.toFixed(0)

  if (lightnessRef.value !== rounded) {
    lightnessRef.value = rounded
  }
})

function updateValue(e: KeyboardEvent) {
  const input = e.target as HTMLInputElement
  const value = Number(input.value)

  if (Number.isNaN(value) || value < min || value > max) {
    input.value = lightnessRef.value

    return
  }

  input.value = String(value)
  lightnessRef.value = input.value
  lightness.value = value
}

function stepValue(e: KeyboardEvent, direction: number) {
  const input = e.target as HTMLInputElement
  const current = Number(input.value)

  const base = Number.isNaN(current) ? Number(lightnessRef.value) : current
  const value = Math.min(max, Math.max(min, base + direction))

  input.value = String(value)
  lightnessRef.value = input.value
  lightness.value = value
}
</script>

<template>
  <ChannelInput
    :value="lightnessRef"
    :aria-valuemax="max"
    :aria-valuemin="min"
    :aria-valuenow="lightnessRef"
    @keydown.prevent.enter="updateValue"
    @keydown.prevent.up="stepValue($event, $event.shiftKey ? 10 : 1)"
    @keydown.prevent.down="stepValue($event, $event.shiftKey ? -10 : -1)"
  />
</template>
