<script setup lang="ts">
import { AlphaInput, AlphaSlider, BlueInput, ColorDropper, ColorSwatch, GreenInput, HexInput, HueInput, HueSlider, hueyColor, HueyRoot, LightnessInput, RedInput, SaturationArea, SaturationInput } from '@hueycolor/vue'
import { ref } from 'vue'

const color = ref(hueyColor('#acff00'))
const colorFormat = ref<'hex' | 'hsl' | 'rgb'>('hex')
</script>

<template>
  <div data-picker="ligma">
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
      <div class="inputs-wrapper">
        <label for="color-format">
          <span class="sr-only">Color Format</span>
          <select id="color-format" v-model="colorFormat" name="color-format" data-color-format>
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
        </label>
        <div class="inputs">
          <label v-if="colorFormat === 'hex'" for="hex">
            <span class="sr-only">Hex</span>
            <HexInput id="hex-input" :alpha="false" />
          </label>
          <template v-if="colorFormat === 'hsl'">
            <label for="hue">
              <span class="sr-only">Hue</span>
              <HueInput id="hue" />
            </label>
            <label for="saturation">
              <span class="sr-only">Saturation</span>
              <SaturationInput id="saturation" />
            </label>
            <label for="lightness">
              <span class="sr-only">Lightness</span>
              <LightnessInput id="lightness" />
            </label>
          </template>
          <template v-if="colorFormat === 'rgb'">
            <label for="red">
              <span class="sr-only">Red</span>
              <RedInput id="red" />
            </label>
            <label for="green">
              <span class="sr-only">Green</span>
              <GreenInput id="green" />
            </label>
            <label for="blue">
              <span class="sr-only">Blue</span>
              <BlueInput id="blue" />
            </label>
          </template>
          <label for="alpha">
            <span class="sr-only">Alpha</span>
            <AlphaInput id="alpha" data-alpha-input />
          </label>
        </div>
      </div>
      <div class="swatches">
        <ColorSwatch :swatch="['#FF3B30', '#FF6B2D', '#FF9500', '#FFC42D', '#FFEA00', '#A8E62E', '#34C759', '#2DD4A8', '#00C7E6', '#0A84FF', '#3634DB', '#5E5CE6', '#AF52DE', '#E040A0', '#FF2D55', '#FF6482', '#FF8FAB', '#FFB3C6']" />
      </div>
    </HueyRoot>
  </div>
</template>

<style>
[data-picker="ligma"] {
  display: flex;
  flex-direction: column;
  width: 240px;
  background-color: #2C2C2C;
  border-radius: var(--radius-16);

  .inputs-wrapper {
    display: flex;
    gap: var(--spacing-8);
    padding: var(--spacing-16);

    label {
      display: flex;
    }

    [data-color-format] {
      background-color: transparent;
      border: 1px solid #383838;
      border-radius: var(--radius-4);
      color: white;
      font-size: 12px;
      height: 24px;
      padding-inline-start: var(--spacing-4);
    }

    [huey-input] {
      color: white;
      background-color: #383838;
      border: none;
      height: 24px;
      font-size: 12px;
      padding-inline: var(--spacing-4);
      width: fit-content;
      min-width: 0;
      width: 100%;
      border-radius: 0;
    }

    .inputs {
      flex: 1;
      display: flex;

      :first-child input {
        border-start-start-radius: var(--radius-4);
        border-end-start-radius: var(--radius-4);
      }

      :last-child input {
        border-start-end-radius: var(--radius-4);
        border-end-end-radius: var(--radius-4);
      }

      :not(:first-child) input {
        border-inline-start: 2px solid #2C2C2C;
      }

      [data-alpha-input] {
        width: 48px;
        flex-shrink: 0;
      }
    }
  }

  .swatches {
    border-block-start: 1px solid #383838;
    padding: var(--spacing-16);
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
