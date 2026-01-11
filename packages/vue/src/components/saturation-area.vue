<script setup lang="ts">
import type { ColorFormat, HueyColor } from '@huey/core'
import { clamp, getAbsolutePosition, getPageXYFromEvent } from '@huey/core'
import { computed, onUnmounted, ref, useTemplateRef, watch } from 'vue'
import { ColorThumb } from '.'
import { allowUserSelect, preventUserSelect } from '../utils'

const props = withDefaults(defineProps<SaturationAreaProps>(), {
  colorFormat: 'rgb',
})

const colorValue = defineModel<HueyColor>({ required: true })

const areaRef = useTemplateRef('area')

// Track hue and saturation locally because HSL loses this info at extremes:
// - Hue is undefined when saturation=0 (grayscale) or lightness=0/100 (black/white)
// - Saturation is undefined when lightness=0 or lightness=100
const internalHue = ref(colorValue.value.toHsl().h)
const internalSaturation = ref(colorValue.value.toHsl().s)

watch(colorValue, (newColor) => {
  const { h, s, l } = newColor.toHsl()
  // Only update from color when values are in meaningful range
  // Use epsilon to avoid floating-point instability near boundaries

  // For hue: update if saturation is above our minimum floor (0.1)
  // This ensures hue is reliable (not lost to grayscale conversion)
  if (s >= 0.1 && l > 1 && l < 99) {
    internalHue.value = h
  }

  if (l > 1 && l < 99) {
    internalSaturation.value = s
  }
})

const areaBg = computed(() => {
  const hslString = `hsl(${internalHue.value}, 100%, 50%)`

  if (props.colorFormat === 'hsl') {
    return `linear-gradient(to top, black, transparent, white), linear-gradient(to right, rgb(128, 128, 128), transparent), ${hslString}`
  }

  return `linear-gradient(to top, black, transparent), linear-gradient(to right, white, transparent),
    ${hslString}`
})

const thumbBg = computed(() => colorValue.value.toHslString())

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

  const saturation = (left / areaWidth) * 100
  const lightness = clamp(1 - (top / areaHeight), 0, 1) * 100

  internalSaturation.value = saturation
  // Use tiny offsets from extremes to preserve hue in the color model
  // (at s=0 or l=0/100, hue info is lost during RGB conversion)
  const effectiveSaturation = Math.max(saturation, 0.1)
  const effectiveLightness = Math.max(0.1, Math.min(99.9, lightness))
  colorValue.value = colorValue.value.setHsl(internalHue.value, effectiveSaturation, effectiveLightness)
}

const offsetLeft = computed(() => `${internalSaturation.value}%`)

const offsetTop = computed(() => {
  const { l } = colorValue.value.toHsl()
  return `${100 - l}%`
})

function handleMouseDown() {
  preventUserSelect()

  window.addEventListener('mousemove', handleChange)
  window.addEventListener('mouseup', handleChange)
  window.addEventListener('mouseup', handleMouseUp)
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
