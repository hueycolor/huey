<script lang="ts">
  import { hueyColor } from '@hueycolor/core'
  import {
    AlphaInput,
    AlphaSlider,
    BlueInput,
    ColorDropper,
    ColorPreview,
    ColorSwatch,
    GreenInput,
    HexInput,
    HueInput,
    HueSlider,
    HueyRoot,
    LightnessInput,
    LightnessSlider,
    RedInput,
    SaturationArea,
    SaturationInput,
    SaturationSlider,
  } from './components'

  let color = $state(hueyColor('#acff00'))
</script>

<main>
  <HueyRoot bind:color>
    <SaturationArea />
    <HueSlider />
    <SaturationSlider />
    <LightnessSlider />
    <AlphaSlider />
    <ColorDropper>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pipette-icon lucide-pipette">
        <path d="m12 9-8.414 8.414A2 2 0 0 0 3 18.828v1.344a2 2 0 0 1-.586 1.414A2 2 0 0 1 3.828 21h1.344a2 2 0 0 0 1.414-.586L15 12" />
        <path d="m18 9 .4.4a1 1 0 1 1-3 3l-3.8-3.8a1 1 0 1 1 3-3l.4.4 3.4-3.4a1 1 0 1 1 3 3z" />
        <path d="m2 22 .414-.414" />
      </svg>
    </ColorDropper>
    <ColorPreview />
    <ColorSwatch swatch={['hsl(200, 10%, 50%)', '#00ff00', '#0000ff']} />
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
    <div>
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
</main>

<style>
  main :global(input) {
    font-size: 16px;
  }
</style>
