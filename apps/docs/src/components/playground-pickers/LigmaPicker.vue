<script setup lang="ts">
import { hueyColor } from '@hueycolor/core'
import { AlphaInput, AlphaSlider, BlueInput, ColorDropper, ColorPreview, GreenInput, HexInput, HueInput, HueSlider, HueyRoot, LightnessInput, LightnessSlider, RedInput, SaturationArea, SaturationInput, SaturationSlider } from '@hueycolor/vue'
import { ref } from 'vue'

const color = ref(hueyColor('#acff00'))
</script>

<template>
  <div class="ligma-picker">
    <HueyRoot v-model="color">
      <div class="area">
        <SaturationArea color-format="hex" />
      </div>
      <div class="color-controls">
        <ColorDropper>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pipette-icon lucide-pipette"><path d="m12 9-8.414 8.414A2 2 0 0 0 3 18.828v1.344a2 2 0 0 1-.586 1.414A2 2 0 0 1 3.828 21h1.344a2 2 0 0 0 1.414-.586L15 12" /><path d="m18 9 .4.4a1 1 0 1 1-3 3l-3.8-3.8a1 1 0 1 1 3-3l.4.4 3.4-3.4a1 1 0 1 1 3 3z" /><path d="m2 22 .414-.414" /></svg>
        </ColorDropper>
        <div class="sliders">
          <HueSlider />
          <AlphaSlider />
        </div>
      </div>
      <ColorSwatch :swatch="['hsl(200, 10%, 50%)', '#00ff00', '#0000ff']" />
      <label for="hue">
        <span>Hue:</span>
        <HueInput id="hue" />
      </label>
      <label for="saturation">
        <span>Saturation:</span>
        <SaturationInput id="saturation" />
      </label>
      <label for="lightness">
        <span>Lightness:</span>
        <LightnessInput />
      </label>
      <label for="alpha">
        <span>Alpha:</span>
        <AlphaInput />
      </label>
      <div class="">
        <label for="red">
          <span>Red:</span>
          <RedInput />
        </label>
        <label for="green">
          <span>Green:</span>
          <GreenInput />
        </label>
        <label for="blue">
          <span>Blue:</span>
          <BlueInput />
        </label>
      </div>
      <label for="hex">
        <span>Hex:</span>
        <HexInput />
      </label>
    </HueyRoot>
  </div>
</template>

<style>
.ligma-picker {
  display: flex;
  flex-direction: column;
  width: 240px;
  background-color: #2C2C2C;
  border-radius: var(--radius-16);

  [huey-input] {
    color: white;
    background-color: #383838;
    border: none;
  }

  .area {
    padding: var(--spacing-16);

    [huey-area] {
      width: 100%;
      height: 208px;
      border-radius: var(--radius-8);
      box-shadow: 0px 0px 1px 1px #323232;
    }
  }

  .color-controls {
    padding-inline: var(--spacing-16);
    display: flex;
    gap: var(--spacing-8);

    [huey-color-dropper] {
      color: rgb(204, 204, 204);
    }

    .sliders {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-8);
      padding-inline: var(--spacing-8);
      flex: 1;

      [huey-slider-track] {
        --huey-slider-track-width: 100%;
      }
    }
  }
}
</style>
