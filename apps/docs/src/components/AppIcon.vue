<script setup lang="ts">
import { Icon } from '@iconify/vue'
import '@/icons'

defineProps<{
  icon: string
}>()
</script>

<template>
  <Icon :icon="icon" :ssr="true" v-bind="$attrs" />
</template>
