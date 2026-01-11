<script setup lang="ts">
import type { ColorFormat } from '@huey/core'
import type { HTMLAttributes } from 'vue'
import { ColorThumb } from '@components'
import { useHueyContext } from '@composables/use-huey-context'
import { clamp, getAbsolutePosition, getPageXYFromEvent, hslToHsv, hsvToHsl, resolveArrowDirection } from '@huey/core'
import { allowUserSelect, preventUserSelect } from '@utils'
import { computed, onUnmounted, ref, useTemplateRef, watch } from 'vue'

const props = withDefaults(defineProps<SaturationAreaProps>(), {
  colorFormat: 'hsl',
})

const { hue, saturation, lightness } = useHueyContext()

const areaRef = useTemplateRef('area')

// Track HSV saturation separately for edge cases (black/white where HSL loses saturation info)
const hsvSaturation = ref(hslToHsv(hue.value, saturation.value, lightness.value).s)
const isDragging = ref(false)

// Sync hsvSaturation when color changes externally (e.g., color dropper)
watch([hue, saturation, lightness], () => {
  if (isDragging.value)
    return

  hsvSaturation.value = hslToHsv(hue.value, saturation.value, lightness.value).s
})

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

  if (props.colorFormat === 'hsl') {
    saturation.value = (left / areaWidth) * 100
    lightness.value = clamp(1 - (top / areaHeight), 0, 1) * 100

    return
  }

  const sv = (left / areaWidth) * 100
  const v = clamp(1 - (top / areaHeight), 0, 1) * 100

  hsvSaturation.value = sv

  const hsl = hsvToHsl(hue.value, sv, v)

  saturation.value = hsl.s
  lightness.value = hsl.l
}

const offsetLeft = computed(() => {
  if (props.colorFormat === 'hsl') {
    return `${saturation.value}%`
  }

  return `${hsvSaturation.value}%`
})

const offsetTop = computed(() => {
  if (props.colorFormat === 'hsl') {
    return `${100 - lightness.value}%`
  }
  const hsv = hslToHsv(hue.value, saturation.value, lightness.value)

  return `${100 - hsv.v}%`
})

function handleMouseDown() {
  isDragging.value = true
  preventUserSelect()

  window.addEventListener('mousemove', handleChange)
  window.addEventListener('mouseup', handleChange)
  window.addEventListener('mouseup', handleMouseUp)
}

function handleTouchStart(e: TouchEvent) {
  isDragging.value = true
  handleChange(e)
  window.addEventListener('touchend', handleTouchEnd)
}

function handleTouchEnd() {
  isDragging.value = false
  window.removeEventListener('touchend', handleTouchEnd)
}

function handleKeyDown(e: KeyboardEvent) {
  const direction = resolveArrowDirection(e)
  const step = e.shiftKey ? 10 : 1

  if (!direction)
    return

  isDragging.value = true

  if (props.colorFormat === 'hsl') {
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
    isDragging.value = false
    return
  }

  const hsv = hslToHsv(hue.value, saturation.value, lightness.value)

  hsv.s = hsvSaturation.value

  switch (direction) {
    case 'left':
      hsv.s = clamp(hsv.s - step, 0, 100)
      break
    case 'down':
      hsv.v = clamp(hsv.v - step, 0, 100)
      break
    case 'right':
      hsv.s = clamp(hsv.s + step, 0, 100)
      break
    case 'up':
      hsv.v = clamp(hsv.v + step, 0, 100)
      break
  }

  hsvSaturation.value = hsv.s

  const hsl = hsvToHsl(hue.value, hsv.s, hsv.v)

  saturation.value = hsl.s
  lightness.value = hsl.l
  isDragging.value = false
}

function unbindEventListeners() {
  window.removeEventListener('mousemove', handleChange)
  window.removeEventListener('mouseup', handleChange)
  window.removeEventListener('mouseup', handleMouseUp)
  window.removeEventListener('touchend', handleTouchEnd)
}

function handleMouseUp() {
  isDragging.value = false
  allowUserSelect()
  unbindEventListeners()
}

onUnmounted(() => {
  unbindEventListeners()
})
</script>

<script lang="ts">
export interface SaturationAreaProps extends /* @vue-ignore */ HTMLAttributes {
  colorFormat?: Exclude<ColorFormat, 'oklch'>
}
</script>

<template>
  <div
    ref="area"
    role="group"
    huey-area
    :style="{
      'background': areaBg,
      '--huey-thumb-color': thumbBg,
    }"
    @mousedown="handleMouseDown"
    @touchmove.passive="handleChange"
    @touchstart.passive="handleTouchStart"
  >
    <ColorThumb
      :style="{
        top: offsetTop,
        left: offsetLeft,
      }"
      tabindex="0"
      :aria-valuemin="0"
      :aria-valuemax="100"
      :aria-valuenow="`${saturation}/${lightness}`"
      :aria-valuetext="`Saturation ${Math.round(saturation)}%, Lightness ${Math.round(lightness)}%`"
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
