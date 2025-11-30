<script setup lang="ts">
import { computed } from 'vue'

const { channel } = defineProps<ChannelInputProps>()

const modelValue = defineModel<number>()

const max = computed(() => {
  if (['r', 'g', 'b'].includes(channel))
    return 255

  if (channel === 'h')
    return 360

  if (['s', 'l', 'c'].includes(channel))
    return 100

  if (channel === 'a')
    return 100

  return 100
})
</script>

<script lang="ts">
export interface ChannelInputProps {
  channel: 'r' | 'g' | 'b'
    | 'h' | 's' | 'l'
    | 'l' | 'c' | 'h'
    | 'a'
}
</script>

<template>
  <input
    v-model="modelValue"
    type="number"
    inputmode="numeric"
    :min="0"
    :max="max"
    :aria-label="`color channel (${channel}) input`"
  >
</template>

<style>

</style>
