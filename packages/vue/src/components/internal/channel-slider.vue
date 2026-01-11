<script setup lang="ts">
import { clamp, getAbsolutePosition, getPageXYFromEvent, normalize, resolveArrowDirection, roundToStep } from '@huey/core'
import { computed, onUnmounted, useTemplateRef } from 'vue'
import { ColorThumb } from '..'

const props = withDefaults(defineProps<ColorSliderProps>(), {
  max: 100,
  min: 0,
  step: 1,
})

const value = defineModel({ default: 0 })
const trackRef = useTemplateRef('slider-track')

const thumbInsetPercent = computed(() => {
  const { min, max } = props

  return `${normalize(value.value, min, max, 0, 100)}%`
})

onUnmounted(() => {
  unbindEventListeners()
})

function handleChange(e: MouseEvent | TouchEvent) {
  const slider = trackRef.value

  if (!slider)
    return

  const { x: xOffset } = getAbsolutePosition(slider)
  const { x: pageX } = getPageXYFromEvent(e)
  const left = pageX - xOffset

  const width = slider.clientWidth

  const { max, min, step } = props

  const raw = normalize(left / width, 0, 1, min, max)
  const stepped = Math.round(raw / step) * step

  value.value = clamp(roundToStep(stepped, step), min, max)
}

function preventUserSelect() {
  document.body.style.userSelect = 'none'
}

function allowUserSelect() {
  document.body.style.userSelect = 'unset'
}

function handleMouseDown(e: MouseEvent) {
  handleChange(e)
  preventUserSelect()

  window.addEventListener('mousemove', handleChange)
  window.addEventListener('mouseup', handleMouseUp)
}

function handleKeyDown(e: KeyboardEvent) {
  e.preventDefault()

  const direction = resolveArrowDirection(e)

  if (!direction)
    return

  const oldVal = value.value
  const { min, max, step } = props
  const largeStep = e.shiftKey ? step * 10 : step

  switch (e.key) {
    case 'ArrowLeft':
    case 'ArrowDown':
      value.value = clamp(roundToStep(oldVal - largeStep, largeStep), min, max)
      break
    case 'ArrowRight':
    case 'ArrowUp':
      value.value = clamp(roundToStep(oldVal + largeStep, largeStep), min, max)
      break
  }
}

function unbindEventListeners() {
  window.removeEventListener('mousemove', handleChange)
  window.removeEventListener('mouseup', handleMouseUp)
}

function handleMouseUp() {
  allowUserSelect()
  unbindEventListeners()
}
</script>

<script lang="ts">
export interface ColorSliderProps {
  min?: number
  max?: number
  step?: number
}
</script>

<template>
  <div
    ref="slider-track"
    v-bind="{ ...props }"
    huey-slider-track
    role="slider"
    :aria-valuemin="$props.min"
    :aria-valuemax="$props.max"
    tabindex="0"
    :aria-valuenow="modelValue"
    @mousedown="handleMouseDown"
    @touchmove.passive="handleChange"
    @touchstart.passive="handleChange"
    @keydown="handleKeyDown"
  >
    <ColorThumb :style="{ left: thumbInsetPercent }" />
  </div>
</template>

<style>
[huey-slider-track] {
  --huey-slider-track-height: 16px;
  --huey-slider-track-width: 129px;

  position: relative;
  width: var(--huey-slider-track-width);
  height: var(--huey-slider-track-height);
  border-radius: calc(1px * infinity);
}

[huey-slider-track] [huey-slider-thumb] {
  height: var(--huey-slider-track-height);
}
</style>
