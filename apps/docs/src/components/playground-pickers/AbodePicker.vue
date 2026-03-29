<script setup lang="ts">
import { BlueInput, GreenInput, HexInput, HueInput, HueSlider, hueyColor, HueyRoot, LightnessInput, RedInput, SaturationArea, SaturationInput } from '@hueycolor/vue'
import { ref } from 'vue'

const color = ref(hueyColor('#acff00'))
</script>

<template>
  <div data-picker="abode">
    <HueyRoot v-model="color">
      <div class="area">
        <SaturationArea color-format="hex" />
        <HueSlider orientation="vertical" />
      </div>
      <div class="inputs">
        <div data-color-inputs="hsl">
          <label for="hue">
            <span>H:</span>
            <HueInput id="hue" />
          </label>
          <label for="saturation">
            <span>S:</span>
            <SaturationInput id="saturation" />
          </label>
          <label for="lightness">
            <span>L:</span>
            <LightnessInput id="lightness" />
          </label>
        </div>
        <div data-color-inputs="rgb">
          <label for="red">
            <span>R:</span>
            <RedInput />
          </label>
          <label for="green">
            <span>G:</span>
            <GreenInput />
          </label>
          <label for="blue">
            <span>B:</span>
            <BlueInput />
          </label>
        </div>
        <label for="hex">
          <span>#</span>
          <HexInput id="hex" />
        </label>
      </div>
    </HueyRoot>
  </div>
</template>

<style scoped>
[data-picker="abode"] {
  display: flex;
  width: fit-content;
  background-color: #535353;
  padding: var(--spacing-16);
  gap: var(--spacing-16);
  border-radius: var(--radius-4);

  scale: 0.7;

  .area {
    display: flex;
    gap: var(--spacing-16);

    [huey-area] {
      height: 100%;
      border-radius: var(--radius-4);
    }

    [huey-slider="hue"] {
      border-radius: var(--radius-4);
      --huey-slider-track-width: 100%
    }
  }

  .inputs {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-16);
    color: white;

    [data-color-inputs] {
      display: flex;
      flex-direction: column;
    }

    label {
      display: flex;
      align-items: center;
      gap: var(--spacing-8);

      span {
        width: 2ch;
      }

      &:has([huey-input="hex"]) span {
        opacity: 0.5;
      }

      [huey-input] {
        color: white;
        width: 4ch;
        background-color: transparent;
        border: 0;
        border-bottom: 2px solid #7B7B7B;
      }

      [huey-input='hex'] {
        width: 8ch;
      }
    }

  }

  @media (width >= 50rem) {

    scale: 1;
  }
}
</style>
