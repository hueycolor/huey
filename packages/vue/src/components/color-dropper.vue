<script setup lang="ts">
import type { HueyColor } from '@huey/core'
import type { ButtonHTMLAttributes } from 'vue'
import { hueyColor } from '@huey/core'
import { ref } from 'vue'

const props = defineProps<ColorDropperProps>()
const emit = defineEmits<ColorDropperEmits>()

const colorValue = defineModel<HueyColor>()
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
    colorValue.value = newColor
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
  <button v-if="dropper" v-bind="{ ...props }" @click="sip">
    <slot />
  </button>
</template>
