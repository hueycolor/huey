<script setup lang="ts">
import type { InputHTMLAttributes } from 'vue'

defineProps<ChannelInputProps>()
</script>

<script lang="ts">
export interface ChannelInputProps extends /* @vue-ignore */ InputHTMLAttributes {}
</script>

<template>
  <input huey-input v-bind="$props">
</template>

<style>
  [huey-input] {
    -moz-appearance: textfield;
  }

  [huey-input]::-webkit-outer-spin-button,
  [huey-input]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
</style>
