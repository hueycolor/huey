<script setup lang="ts">
import { clamp, getAbsolutePosition, getPageXYFromEvent, normalize, resolveArrowDirection } from '@huey/core'
import { computed, onUnmounted, useTemplateRef } from 'vue'
import { ColorThumb } from '..'

const props = withDefaults(defineProps<ColorSliderProps>(), {
  max: 100,
  min: 0,
  step: 1,
})

const value = defineModel({ default: 0 })
const sliderTrackRef = useTemplateRef('slider-track')

const thumbInsetPercent = computed(() => {
  const { min, max } = props
  const percent = normalize(value.value, min, max, 0, 100)

  return `${percent}%`
})

onUnmounted(() => {
  unbindEventListeners()
})

function handleChange(e: MouseEvent | TouchEvent) {
  const slider = sliderTrackRef.value

  if (!slider)
    return

  const { x: xOffset } = getAbsolutePosition(slider)
  const { x: pageX } = getPageXYFromEvent(e)
  const left = pageX - xOffset

  const width = slider.clientWidth

  const { max, min, step } = props

  const raw = normalize(left / width, 0, 1, min, max)
  const stepped = Math.round(raw / step) * step
  const decimals = step < 1 ? Math.ceil(-Math.log10(step)) : 0
  const fixed = Math.round(stepped * 10 ** decimals) / 10 ** decimals

  value.value = clamp(fixed, min, max)
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
  const direction = resolveArrowDirection(e)

  if (!direction) {
    return
  }

  e.preventDefault()

  const oldVal = value.value
  const { min, max, step } = props

  switch (direction) {
    case 'left':
    case 'down': {
      value.value = clamp(oldVal - step, min, max)
      break
    }

    case 'right':
    case 'up': {
      value.value = clamp(oldVal + step, min, max)
      break
    }
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
</style>
