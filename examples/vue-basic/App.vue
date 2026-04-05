<script setup>
import { ref } from 'vue'
import {
  HueyRoot,
  SaturationArea,
  HueSlider,
  AlphaSlider,
  HexInput,
  ColorPreview,
  ColorSwatch,
  hueyColor,
} from '@hueycolor/vue'

const color = ref(hueyColor('#6366f1'))
const swatch = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#6366f1', '#a855f7']
</script>

<template>
  <div class="picker">
    <SaturationArea class="area" />
    <div class="controls">
      <ColorPreview class="preview" />
      <div class="sliders">
        <HueSlider />
        <AlphaSlider />
      </div>
    </div>
    <HexInput class="hex" placeholder="#000000" />
    <ColorSwatch :swatch="swatch" />
  </div>
</template>

<style scoped>
.picker {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 260px;
  padding: 16px;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
}

.area {
  width: 100%;
  height: 160px;
  border-radius: 12px;
}

.controls {
  display: flex;
  gap: 12px;
  align-items: center;
}

.preview {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  flex-shrink: 0;
}

.sliders {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.hex {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  height: 40px;
  padding-inline: 12px;
  font-family: monospace;
}
</style>
