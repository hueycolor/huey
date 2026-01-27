<script setup lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import { useHueyContext } from '@composables/use-huey-context'
import { clamp, hueyColor } from '@huey/core'
import { ref } from 'vue'

const props = defineProps<ColorDropperProps>()
const emit = defineEmits<ColorDropperEmits>()

const { hue, saturation, lightness } = useHueyContext()

const dropper = ref()

// @ts-expect-error TS unaware of EyeDropper: https://developer.mozilla.org/en-US/docs/Web/API/EyeDropper#browser_compatibility
if (window.EyeDropper) {
  // @ts-expect-error EyeDropper is guaranteed
  dropper.value = new EyeDropper()
}

function sip() {
  if (!dropper.value) {
    return
  }

  dropper.value.open().then((result: any) => {
    const newColor = hueyColor(result.sRGBHex)
    const { h, s, l } = newColor.toHsl()

    hue.value = clamp(h, 0, 360)
    saturation.value = clamp(s, 0, 100)
    lightness.value = clamp(l, 0, 100)
  }).catch((e: Error) => { emit('error', e) })
}
</script>

<script lang="ts">
interface ColorDropperProps extends /* @vue-ignore */ ButtonHTMLAttributes {}

interface ColorDropperEmits {
  error: [error: Error]
}
</script>

<template>
  <button v-if="dropper" v-bind="{ ...props }" :aria-label="$props['aria-label'] ?? 'Eye dropper button'" @click="sip">
    <slot />
  </button>
</template>
