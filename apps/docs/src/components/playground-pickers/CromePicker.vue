<script setup lang="ts">
import { AlphaInput, AlphaSlider, BlueInput, ColorDropper, ColorPreview, ColorSwatch, GreenInput, HexInput, HueInput, HueSlider, hueyColor, HueyRoot, LightnessInput, RedInput, SaturationArea, SaturationInput } from '@hueycolor/vue'
import { ref } from 'vue'
import AppIcon from '@/components/AppIcon.vue'

const color = ref(hueyColor('#acff00'))
const colorFormat = ref<'hex' | 'hsl' | 'rgb'>('hex')
</script>

<template>
  <div data-picker="crome">
    <HueyRoot v-model="color">
      <SaturationArea color-format="hex" />
      <div class="color-controls">
        <ColorDropper>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pipette-icon lucide-pipette"><path d="m12 9-8.414 8.414A2 2 0 0 0 3 18.828v1.344a2 2 0 0 1-.586 1.414A2 2 0 0 1 3.828 21h1.344a2 2 0 0 0 1.414-.586L15 12" /><path d="m18 9 .4.4a1 1 0 1 1-3 3l-3.8-3.8a1 1 0 1 1 3-3l.4.4 3.4-3.4a1 1 0 1 1 3 3z" /><path d="m2 22 .414-.414" /></svg>
        </ColorDropper>
        <ColorPreview />
        <div class="sliders">
          <HueSlider />
          <AlphaSlider />
        </div>
      </div>
      <div class="inputs-wrapper">
        <div class="inputs">
          <label v-if="colorFormat === 'hex'" for="hex">
            <HexInput id="hex" />
            <span>HEX</span>
          </label>
          <template v-if="colorFormat === 'hsl'">
            <label for="hue">
              <HueInput id="hue" />
              <span>H</span>
            </label>
            <label for="saturation">
              <SaturationInput id="saturation" />
              <span>S</span>
            </label>
            <label for="lightness">
              <LightnessInput id="lightness" />
              <span>L</span>
            </label>
            <label for="lightness">
              <AlphaInput id="alpha" />
              <span>A</span>
            </label>
          </template>
          <template v-if="colorFormat === 'rgb'">
            <label for="red">
              <RedInput id="red" />
              <span>R</span>
            </label>
            <label for="green">
              <GreenInput id="green" />
              <span>G</span>
            </label>
            <label for="blue">
              <BlueInput id="blue" />
              <span>B</span>
            </label>
            <label for="blue">
              <AlphaInput id="alpha" />
              <span>A</span>
            </label>
          </template>
        </div>
        <div class="format-selector">
          <AppIcon icon="majesticons:selector" style="font-size: 20px;" />
          <select id="color-format" v-model="colorFormat" name="color-format" data-color-format>
            <option value="hex">
              {{ color.toHexString() }}
            </option>
            <option value="rgb">
              {{ color.toRgbString() }}
            </option>
            <option value="hsl">
              {{ color.toHslString() }}
            </option>
          </select>
        </div>
      </div>
      <div class="swatches">
        <ColorSwatch :swatch="['#FF3B30', '#FF6B2D', '#FF9500', '#FFC42D', '#FFEA00', '#A8E62E', '#34C759', '#2DD4A8', '#00C7E6', '#0A84FF', '#3634DB', '#5E5CE6', '#AF52DE', '#E040A0', '#FF2D55', '#FF6482', '#FF8FAB', '#FFB3C6']" />
      </div>
    </HueyRoot>
  </div>
</template>

<style>
[data-picker="crome"] {
  display: flex;
  flex-direction: column;
  width: 240px;
  background-color: white;
  border-radius: var(--radius-4);
  box-shadow: -2px 4px 8px 2px #efe0ca;

  [huey-preview] {
    --huey-preview-tile-size: 30px;

    border-radius: 999px;
  }

  .inputs-wrapper {
    display: flex;
    gap: var(--spacing-8);
    padding: var(--spacing-16);
    padding-block-start: 0;

    .format-selector {
      position: relative;
      display: flex;
      align-items: center;
    }

    [data-color-format] {
      position: absolute;
      inset: 0;
      opacity: 0;
      cursor: pointer;
    }

    label {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--spacing-8);

      span {
        font: var(--label-xs);
        text-align: center;
        color: var(--color-neutral-400);
      }
    }

    [huey-input] {
      text-align: center;
      border: 1px solid #DADADA;
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
      gap: var(--spacing-6);
    }
  }

  .swatches {
    border-block-start: 1px solid #DADADA;
    padding: var(--spacing-16);
  }

  [huey-area] {
    border-radius: unset;
    border-start-start-radius: var(--radius-4);
    border-start-end-radius: var(--radius-4);
    width: 100%;
    height: 132px;
  }

  .color-controls {
    padding: var(--spacing-16);
    display: flex;
    align-items: center;
    gap: var(--spacing-8);

    [huey-color-dropper] {
      color: rgb(55, 55, 55);
    }

    .sliders {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-8);
      padding-inline-start: var(--spacing-8);
      flex: 1;

      [huey-slider-track] {
        --huey-slider-track-width: 100%;
        --huey-slider-track-height: 11px;

        border-radius: unset;
      }
    }
  }
}
</style>
