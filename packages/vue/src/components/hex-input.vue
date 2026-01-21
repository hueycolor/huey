<script setup lang="ts">
import type { ArrowDirection } from '@huey/core'
import type { InputHTMLAttributes } from 'vue'
import { useHueyContext } from '@composables/use-huey-context'
import { hueyColor, isHex } from '@huey/core'
import { ref, watch } from 'vue'

defineProps<ChannelInputProps>()

const { hue, saturation, lightness, colorValue, alpha } = useHueyContext()

const hexRef = ref(colorValue.value.toHex())

watch(colorValue, (newColor) => {
  hexRef.value = newColor.toHex()
})

function handleEnter(e: KeyboardEvent | FocusEvent) {
  const input = e.target as HTMLInputElement
  const value = input.value

  if (!isHex(`#${value}`)) {
    input.value = hexRef.value

    return
  }

  updateValue(input, value)
}

function bumpValue(e: KeyboardEvent, direction: Exclude<ArrowDirection, 'left' | 'right'>) {
  const input = e.target as HTMLInputElement
  const current = Number(input.value)

  let step = e.shiftKey ? 10 : 1
  step *= direction === 'down' ? -1 : 1

  // const base = Number.isNaN(current) ? Number(redRef.value) : current
  // const value = Math.min(max, Math.max(min, base + step))

  // updateValue(input, value)
}

function updateValue(input: HTMLInputElement, value: string) {
  input.value = String(value)
  hexRef.value = input.value

  const newColor = hueyColor(hexRef.value)
  const { h, s, l } = newColor.toHsl()
  hue.value = h
  saturation.value = s
  lightness.value = l
  alpha.value = newColor.getAlpha()
}
</script>

<script lang="ts">
export interface ChannelInputProps extends /* @vue-ignore */ InputHTMLAttributes {}
</script>

<template>
  <input
    :value="hexRef"
    huey-input
    type="text"
    autocomplete="off"
    spellcheck="false"
    @keydown.prevent.enter="handleEnter"
    @keydown.prevent.up="bumpValue($event, 'up')"
    @keydown.prevent.down="bumpValue($event, 'down')"
    @blur="handleEnter"
  >
</template>
