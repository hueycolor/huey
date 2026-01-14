<script setup lang="ts">
import { useHueyContext } from '@composables/use-huey-context'
import { hueyColor } from '@huey/core'
import { computed } from 'vue'

defineProps<ColorSwatchProps>()

const { setColor, colorValue } = useHueyContext()

function chooseColor(e: Event, color: string) {
  e.preventDefault()

  setColor(color)
}

const selectedColor = computed(() => {
  return colorValue.value.toHexString()
})

function isSelected(color: string) {
  const compareToColor = hueyColor(color).toHexString()

  return selectedColor.value === compareToColor
}
</script>

<script lang="ts">
export interface ColorSwatchProps {
  swatch: Array<string>
}
</script>

<template>
  <div v-if="swatch" role="listbox" huey-swatch>
    <div
      v-for="color in swatch"
      :key="color"
      tabindex="0"
      role="option"
      :aria-label="color"
      huey-swatch-color
      :aria-selected="isSelected(color)"
      :style="{ '--swatch-color': color }"
      @click="chooseColor($event, color)"
      @keydown.enter.space.prevent="chooseColor($event, color)"
    />
  </div>
</template>

<style>
[huey-swatch] {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}
[huey-swatch-color] {
  cursor: pointer;
  width: 16px;
  height: 16px;
  background-color: var(--swatch-color);
  border-radius: 4px;
}
</style>
