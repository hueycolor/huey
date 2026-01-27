<script setup lang="ts">
import type { AriaAttributes } from 'vue'
import { ColorThumb } from '@components'
import { clamp, getAbsolutePosition, getPageXYFromEvent, normalize, resolveArrowDirection, roundToStep } from '@huey/core'
import { allowUserSelect, preventUserSelect } from '@utils'
import { computed, onUnmounted, useTemplateRef } from 'vue'

const props = withDefaults(defineProps<ColorSliderProps>(), {
  max: 100,
  min: 0,
  step: 1,
})

const offset = defineModel({ default: 0 })
const trackRef = useTemplateRef('slider-track')

const thumbInsetPercent = computed(() => {
  const { min, max } = props

  return `${normalize(offset.value, min, max, 0, 100)}%`
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

  offset.value = clamp(roundToStep(stepped, step), min, max)
}

function handleMouseDown(e: MouseEvent) {
  handleChange(e)
  preventUserSelect()

  window.addEventListener('mousemove', handleChange)
  window.addEventListener('mouseup', handleMouseUp)
}

function handleKeyDown(e: KeyboardEvent) {
  const direction = resolveArrowDirection(e)

  if (!direction)
    return

  const oldVal = offset.value
  const { min, max, step } = props
  const largeStep = e.shiftKey ? step * 10 : step

  switch (direction) {
    case 'left':
    case 'down':
      offset.value = clamp(roundToStep(oldVal - largeStep, largeStep), min, max)
      break
    case 'right':
    case 'up':
      offset.value = clamp(roundToStep(oldVal + largeStep, largeStep), min, max)
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
export interface ColorSliderProps extends /* @vue-ignore */ AriaAttributes {
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
    :aria-valuenow="modelValue"
    @mousedown="handleMouseDown"
    @touchmove.passive="handleChange"
    @touchstart.passive="handleChange"
  >
    <ColorThumb tabindex="0" :style="{ left: thumbInsetPercent }" @keydown="handleKeyDown" />
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
