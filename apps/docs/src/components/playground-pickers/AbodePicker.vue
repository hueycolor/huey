<script setup lang="ts">
import { hueyColor } from '@hueycolor/core'
import { AlphaInput, AlphaSlider, BlueInput, ColorDropper, ColorPreview, ColorSwatch, GreenInput, HexInput, HueInput, HueSlider, HueyRoot, LightnessInput, LightnessSlider, RedInput, SaturationArea, SaturationInput, SaturationSlider } from '@hueycolor/vue'
import { ref } from 'vue'

const color = ref(hueyColor('#acff00'))
</script>

<template>
  <div data-picker="abode">
    <HueyRoot v-model="color">
      <div class="area">
        <SaturationArea color-format="hex" />
        <HueSlider />
      </div>
      <div class="controls">
        <div class="color-controls">
          <div class="sliders">
            <AlphaSlider />
          </div>
        </div>
        <div class="inputs-wrapper">
          <select v-model="colorFormat" name="color-format" data-color-format>
            <option value="hex">
              Hex
            </option>
            <option value="rgb">
              RGB
            </option>
            <option value="hsl">
              HSL
            </option>
          </select>
          <div class="inputs">
            <HexInput v-if="colorFormat === 'hex'" id="hex-input" />
            <template v-if="colorFormat === 'hsl'">
              <HueInput id="hue" />
              <SaturationInput id="saturation" />
              <LightnessInput />
            </template>
            <template v-if="colorFormat === 'rgb'">
              <RedInput />
              <GreenInput />
              <BlueInput />
            </template>
            <AlphaInput data-alpha-input />
          </div>
        </div>
        <div class="swatches">
          <ColorSwatch :swatch="['#FF3B30', '#FF6B2D', '#FF9500', '#FFC42D', '#FFEA00', '#A8E62E', '#34C759', '#2DD4A8', '#00C7E6', '#0A84FF', '#3634DB', '#5E5CE6', '#AF52DE', '#E040A0', '#FF2D55', '#FF6482', '#FF8FAB', '#FFB3C6']" />
        </div>
      </div>
    </HueyRoot>
  </div>
</template>

<style scoped>
[data-picker="abode"] {
  display: flex;
  width: 560px;
  background-color: white;
  padding: var(--spacing-8);
  gap: var(--spacing-16);

  .area {
    display: flex;

    [huey-area] {
      border-radius: unset;
    }
  }
}
</style>
