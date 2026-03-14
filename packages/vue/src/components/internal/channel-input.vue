<script setup lang="ts">
import type { InputHTMLAttributes } from 'vue'

defineProps<ChannelInputProps>()
</script>

<script lang="ts">
export interface ChannelInputProps extends /* @vue-ignore */ InputHTMLAttributes {}
</script>

<template>
  <input huey-input v-bind="$props" autocomplete="off" spellcheck="false" dir="ltr">
</template>
