<script setup lang="ts">
import type { ColorChannel } from '@huey/core'
import { getChannelBounds } from '@huey/core'

const { channel } = defineProps<ChannelInputProps>()

const modelValue = defineModel<number>()

const { min, max } = getChannelBounds(channel)
</script>

<script lang="ts">
export interface ChannelInputProps {
  channel: ColorChannel
}
</script>

<template>
  <input
    v-model="modelValue"
    type="number"
    inputmode="numeric"
    :min="min"
    :max="max"
    :aria-label="`color channel (${channel}) input`"
  >
</template>
