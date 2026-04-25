<script setup lang="ts">
import type { ColorFormat, HueyColor } from '@hueycolor/core'
import { HUEY_CONTEXT } from '@composables/use-huey-context'
import { clamp, hueyColor } from '@hueycolor/core'
import { provide, ref, watch } from 'vue'

const externalColor = defineModel<string | HueyColor>({ required: true })

if (!externalColor.value) {
  throw new Error('<HueyRoot> is missing required v-model of type string or HueyColor')
}

function safeHueyColor(input: string | HueyColor): HueyColor {
  try {
    return hueyColor(input)
  }
  catch {
    return hueyColor('#000000')
  }
}

const colorValue = ref<HueyColor>(safeHueyColor(externalColor.value))
const hue = ref(0)
const saturation = ref(0)
const lightness = ref(0)
const alpha = ref(1)

let isInternalUpdate = false
let stringFormat: ColorFormat | null = null

watch(
  () => externalColor,
  (newColor) => {
    if (isInternalUpdate) {
      isInternalUpdate = false
      return
    }

    const parsed = safeHueyColor(newColor.value)
    stringFormat = typeof newColor.value === 'string' ? parsed.getFormat() : null
    colorValue.value = parsed

    const hsl = parsed.toHsl()

    hue.value = hsl.h
    saturation.value = hsl.s
    lightness.value = hsl.l
    alpha.value = hsl.a
  },
  { immediate: true },
)

watch([hue, saturation, lightness, alpha], ([h, s, l, a]) => {
  isInternalUpdate = true

  const color = hueyColor(`hsla(${clamp(h, 0, 360)}, ${clamp(s, 0, 100)}%, ${clamp(l, 0, 100)}%, ${clamp(a, 0, 1)})`)
  colorValue.value = color

  if (stringFormat === null) {
    externalColor.value = color
  }
  else if (stringFormat === 'hex') {
    externalColor.value = color.toHexString()
  }
  else if (stringFormat === 'rgb') {
    externalColor.value = color.toRgbString()
  }
  else if (stringFormat === 'oklch') {
    externalColor.value = color.toOklchString()
  }
  else {
    externalColor.value = color.toHslString()
  }
})

function setColor(color: string | HueyColor) {
  const parsed = safeHueyColor(color)
  const hsl = parsed.toHsl()

  hue.value = clamp(hsl.h, 0, 360)
  saturation.value = clamp(hsl.s, 0, 100)
  lightness.value = clamp(hsl.l, 0, 100)
  alpha.value = clamp(hsl.a, 0, 1)
}

provide(HUEY_CONTEXT, { hue, saturation, lightness, alpha, colorValue, setColor })
</script>

<script lang="ts"></script>

<template>
  <slot />
</template>
