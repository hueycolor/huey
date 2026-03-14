<script setup lang="ts">
import type { ArrowDirection } from '@hueycolor/core'
import type { InputHTMLAttributes } from 'vue'
import { useHueyContext } from '@composables/use-huey-context'
import { hueyColor, isHex } from '@hueycolor/core'
import { ref, watch } from 'vue'

defineProps<ChannelInputProps>()

const { hue, saturation, lightness, colorValue, alpha } = useHueyContext()

const hexRef = ref(colorValue.value.toHex().toUpperCase())

watch(colorValue, (newColor) => {
  hexRef.value = newColor.toHex().toUpperCase()
})

function handleEnter(e: KeyboardEvent | FocusEvent) {
  const input = e.target as HTMLInputElement
  const value = input.value

  if (!isHex(value)) {
    input.value = hexRef.value

    return
  }

  updateValue(input, value)
}

function bumbpHexPair(pair: string, step: number): string {
  const num = Number.parseInt(pair, 16)

  if ((num + step) < 0) {
    return '00'
  }

  if ((num + step) > 255) {
    return 'FF'
  }

  const bumped = (num + step + 256) % 256
  return bumped.toString(16).toUpperCase().padStart(2, '0')
}

function bumpValue(e: KeyboardEvent, direction: Exclude<ArrowDirection, 'left' | 'right'>) {
  const input = e.target as HTMLInputElement
  const rawValue = input.value
  const slicedValue = rawValue.replace(/^#/, '').slice(0, 6)

  // First 6 Digits are valid hex values
  if (!isHex(rawValue) && isHex(slicedValue)) {
    input.value = slicedValue

    return
  }

  if (!isHex(slicedValue)) {
    input.value = hexRef.value

    return
  }

  const hexPairs = slicedValue.match(/.{2}/g)

  let step = e.shiftKey ? 10 : 1
  step *= direction === 'down' ? -1 : 1

  const { selectionEnd, selectionStart } = input
  const start = selectionStart ?? 0
  const end = selectionEnd ?? 0

  const isFullTextSelected = (end - start) === input.value.length

  if (isFullTextSelected) {
    // If all text is selected, bump all pairs
    let newHexVal = ''

    hexPairs?.forEach((pair) => {
      newHexVal = newHexVal.concat(bumbpHexPair(pair, step))
    })

    updateValue(input, newHexVal)
    input.setSelectionRange(0, input.value.length)

    return
  }

  // Determine which pairs are affected by the selection
  let startPairIndex: number
  let endPairIndex: number

  if (start === end) {
    // No selection > bump the pair at cursor position
    startPairIndex = Math.min(Math.floor(start / 2), 2)
    endPairIndex = startPairIndex
  }
  else {
    startPairIndex = Math.floor(start / 2)
    endPairIndex = Math.floor((end - 1) / 2)
  }

  // Build new hex value, bumping only affected pairs
  let newHexVal = ''
  hexPairs?.forEach((pair, index) => {
    if (index >= startPairIndex && index <= endPairIndex) {
      newHexVal = newHexVal.concat(bumbpHexPair(pair, step))
    }
    else {
      newHexVal = newHexVal.concat(pair)
    }
  })

  updateValue(input, newHexVal)

  const newSelectionStart = startPairIndex * 2
  const newSelectionEnd = (endPairIndex + 1) * 2
  input.setSelectionRange(newSelectionStart, newSelectionEnd)
}

function updateValue(input: HTMLInputElement, value: string) {
  input.value = String(value)
  hexRef.value = input.value.toUpperCase()

  const newColor = hueyColor(hexRef.value)
  const { h, s, l } = newColor.toHsl()

  // Preserve hue for achromatic colors (white, black, grays)
  if (s > 0) {
    hue.value = h
  }
  saturation.value = s
  lightness.value = l
  alpha.value = newColor.getAlpha()
}

function handleFocus(e: FocusEvent) {
  const input = e.target as HTMLInputElement
  input.setSelectionRange(0, -1)
}
</script>

<script lang="ts">
export interface ChannelInputProps extends /* @vue-ignore */ InputHTMLAttributes {}
</script>

<template>
  <input
    :id="$props.id"
    :value="hexRef"
    huey-input
    type="text"
    autocomplete="off"
    spellcheck="false"
    dir="ltr"
    @keydown.prevent.enter="handleEnter"
    @keydown.prevent.up="bumpValue($event, 'up')"
    @keydown.prevent.down="bumpValue($event, 'down')"
    @blur="handleEnter"
    @focus="handleFocus"
  >
</template>
