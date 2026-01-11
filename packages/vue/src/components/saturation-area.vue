<script setup lang="ts">
import type { ColorFormat } from '@huey/core'
import { clamp, getAbsolutePosition, getPageXYFromEvent, resolveArrowDirection } from '@huey/core'
import { computed, onUnmounted, useTemplateRef } from 'vue'
import { ColorThumb } from '.'
import { useHueyContext } from '../composables/use-huey-context'
import { allowUserSelect, preventUserSelect } from '../utils'

const props = withDefaults(defineProps<SaturationAreaProps>(), {
  colorFormat: 'rgb',
})

const { hue, saturation, lightness } = useHueyContext()

const areaRef = useTemplateRef('area')

const areaBg = computed(() => {
  const hslString = `hsl(${hue.value}, 100%, 50%)`

  if (props.colorFormat === 'hsl') {
    return `linear-gradient(to top, black, transparent, white), linear-gradient(to right, hsl(0, 0%, 50%), transparent), ${hslString}`
  }

  return `linear-gradient(to top, black, transparent), linear-gradient(to right, white, transparent),
    ${hslString}`
})

const thumbBg = computed(() => `hsl(${hue.value}, ${saturation.value}%, ${lightness.value}%)`)

function handleChange(e: MouseEvent | TouchEvent) {
  e.preventDefault()

  const area = areaRef.value

  if (!area)
    return

  const areaWidth = area.clientWidth
  const areaHeight = area.clientHeight

  const { x: xOffset, y: yOffset } = getAbsolutePosition(area)
  const { x: pageX, y: pageY } = getPageXYFromEvent(e)

  const left = clamp(pageX - xOffset, 0, areaWidth)
  const top = clamp(pageY - yOffset, 0, areaHeight)

  const s = (left / areaWidth) * 100
  const l = clamp(1 - (top / areaHeight), 0, 1) * 100

  saturation.value = s
  lightness.value = l
}

const offsetLeft = computed(() => `${saturation.value}%`)

const offsetTop = computed(() => {
  return `${100 - lightness.value}%`
})

function handleMouseDown() {
  preventUserSelect()

  window.addEventListener('mousemove', handleChange)
  window.addEventListener('mouseup', handleChange)
  window.addEventListener('mouseup', handleMouseUp)
}

function handleKeyDown(e: KeyboardEvent) {
  const direction = resolveArrowDirection(e)

  const step = e.shiftKey ? 10 : 1

  if (!direction)
    return

  switch (direction) {
    case 'left':
      saturation.value = clamp(saturation.value - step, 0, 100)
      break
    case 'down':
      lightness.value = clamp(lightness.value - step, 0, 100)
      break
    case 'right':
      saturation.value = clamp(saturation.value + step, 0, 100)
      break
    case 'up':
      lightness.value = clamp(lightness.value + step, 0, 100)
      break
  }
}

function unbindEventListeners() {
  window.removeEventListener('mousemove', handleChange)
  window.removeEventListener('mouseup', handleChange)
  window.removeEventListener('mouseup', handleMouseUp)
}

function handleMouseUp() {
  allowUserSelect()
  unbindEventListeners()
}

onUnmounted(() => {
  unbindEventListeners()
})
</script>

<script lang="ts">
export interface SaturationAreaProps {
  colorFormat?: Exclude<ColorFormat, 'oklch'>
}
</script>

<template>
  <div
    ref="area"
    role="application"
    huey-area
    :style="{
      'background': areaBg,
      '--huey-thumb-color': thumbBg,
    }"
    @mousedown="handleMouseDown"
    @touchmove.passive="handleChange"
    @touchstart.passive="handleChange"
  >
    <ColorThumb
      :style="{
        top: offsetTop,
        left: offsetLeft,
      }"
      tabindex="0"
      aria-valuemin="0"
      aria-valuemax="1"
      aria-valuenow="?"
      @keydown="handleKeyDown"
    />
  </div>
</template>

<style>
[huey-area] {
  position: relative;
  width: 240px;
  height: 230px;
  border-radius: 12px;
}
</style>
