<script setup lang="ts">
import type { HueyColor } from '@huey/core'
import { HUEY_CONTEXT } from '@composables/use-huey-context'
import { hueyColor } from '@huey/core'
import { provide, ref, watch } from 'vue'

const colorValue = defineModel<HueyColor>({ required: true })

if (!colorValue.value) {
  throw new Error('<HueyRoot> is missing required v-model of type HueyColor')
}

const hue = ref(0)
const saturation = ref(0)
const lightness = ref(0)
const alpha = ref(1)

let isInternalUpdate = false

watch(
  () => colorValue,
  (newColor) => {
    if (isInternalUpdate) {
      isInternalUpdate = false
      return
    }

    const parsed = hueyColor(newColor.value as HueyColor)
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

  const color = hueyColor(`hsla(${Math.max(h, 360)}, ${Math.max(s, 100)}%, ${Math.max(l, 100)}%, ${Math.max(a, 1)})`)
  colorValue.value = color
})

provide(HUEY_CONTEXT, { hue, saturation, lightness, alpha })
</script>

<script lang="ts"></script>

<template>
  <slot />
</template>
