<script setup lang="ts">
import type { InputHTMLAttributes } from 'vue'
import ChannelInput from '@components/internal/channel-input.vue'
import { useHueyContext } from '@composables/use-huey-context'
import { getChannelBounds } from '@huey/core'
import { ref, watch } from 'vue'

const { min, max } = getChannelBounds('h')

const { hue } = useHueyContext()

const hueRef = ref(hue.value.toFixed(0))

watch(hue, (newHue) => {
  const rounded = newHue.toFixed(0)

  if (hueRef.value !== rounded) {
    hueRef.value = rounded
  }
})

function updateValue(e: KeyboardEvent) {
  const input = e.target as HTMLInputElement
  const value = Number(input.value)

  if (Number.isNaN(value) || value < min || value > max) {
    input.value = hueRef.value

    return
  }

  input.value = String(value)
  hueRef.value = input.value
  hue.value = value
}

function stepValue(e: KeyboardEvent, direction: number) {
  const input = e.target as HTMLInputElement
  const current = Number(input.value)

  const base = Number.isNaN(current) ? Number(hueRef.value) : current
  const value = Math.min(max, Math.max(min, base + direction))

  input.value = String(value)
  hueRef.value = input.value
  hue.value = value
}
</script>

<script lang="ts">
export interface HueInputProps extends /* @vue-ignore */ InputHTMLAttributes {}
</script>

<template>
  <ChannelInput
    :value="hueRef"
    :aria-valuemax="max"
    :aria-valuemin="min"
    :aria-valuenow="hueRef"
    @keydown.prevent.enter="updateValue"
    @keydown.prevent.up="stepValue($event, $event.shiftKey ? 10 : 1)"
    @keydown.prevent.down="stepValue($event, $event.shiftKey ? -10 : -1)"
  />
</template>
