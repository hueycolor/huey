export interface ComponentCodeExample {
  vue: string
  svelte: string
}

export const componentCodeExamples: Record<string, ComponentCodeExample> = {
  'saturation-area': {
    vue: `<script setup>
import { ref } from 'vue'
import { HueyRoot, SaturationArea, hueyColor } from '@hueycolor/vue'

const color = ref(hueyColor('#1A3263'))
</script>

<template>
  <HueyRoot v-model="color">
    <SaturationArea />
  </HueyRoot>
</template>`,
    svelte: `<script>
import { HueyRoot, SaturationArea, hueyColor } from '@hueycolor/svelte'

let color = $state(hueyColor('#1A3263'))
</script>

<HueyRoot bind:color>
  <SaturationArea />
</HueyRoot>`,
  },
  'color-preview': {
    vue: `<script setup>
import { ref } from 'vue'
import { HueyRoot, ColorPreview, hueyColor } from '@hueycolor/vue'

const color = ref(hueyColor('#1A326380'))
</script>

<template>
  <HueyRoot v-model="color">
    <ColorPreview />
  </HueyRoot>
</template>`,
    svelte: `<script>
import { HueyRoot, ColorPreview, hueyColor } from '@hueycolor/svelte'

let color = $state(hueyColor('#1A326380'))
</script>

<HueyRoot bind:color>
  <ColorPreview />
</HueyRoot>`,
  },
  'color-swatch': {
    vue: `<script setup>
import { ref } from 'vue'
import { HueyRoot, ColorSwatch, hueyColor } from '@hueycolor/vue'

const color = ref(hueyColor('#1A3263'))
const swatch = ['#007680', '#24B2FF', '#FFBA51', '#FFD013', '#F65600']
</script>

<template>
  <HueyRoot v-model="color">
    <ColorSwatch :swatch="swatch" />
  </HueyRoot>
</template>`,
    svelte: `<script>
import { HueyRoot, ColorSwatch, hueyColor } from '@hueycolor/svelte'

let color = $state(hueyColor('#1A3263'))
const swatch = ['#007680', '#24B2FF', '#FFBA51', '#FFD013', '#F65600']
</script>

<HueyRoot bind:color>
  <ColorSwatch {swatch} />
</HueyRoot>`,
  },
  'color-dropper': {
    vue: `<script setup>
import { ref } from 'vue'
import { HueyRoot, ColorDropper, hueyColor } from '@hueycolor/vue'

const color = ref(hueyColor('#1A3263'))
</script>

<template>
  <HueyRoot v-model="color">
    <ColorDropper>
      Pick a color
    </ColorDropper>
  </HueyRoot>
</template>`,
    svelte: `<script>
import { HueyRoot, ColorDropper, hueyColor } from '@hueycolor/svelte'

let color = $state(hueyColor('#1A3263'))
</script>

<HueyRoot bind:color>
  <ColorDropper>
    Pick a color
  </ColorDropper>
</HueyRoot>`,
  },
  'hex-input': {
    vue: `<script setup>
import { ref } from 'vue'
import { HueyRoot, HexInput, hueyColor } from '@hueycolor/vue'

const color = ref(hueyColor('#1A3263'))
</script>

<template>
  <HueyRoot v-model="color">
    <HexInput />
  </HueyRoot>
</template>`,
    svelte: `<script>
import { HueyRoot, HexInput, hueyColor } from '@hueycolor/svelte'

let color = $state(hueyColor('#1A3263'))
</script>

<HueyRoot bind:color>
  <HexInput />
</HueyRoot>`,
  },
  'alpha-input': {
    vue: `<script setup>
import { ref } from 'vue'
import { HueyRoot, AlphaInput, hueyColor } from '@hueycolor/vue'

const color = ref(hueyColor('#1A3263'))
</script>

<template>
  <HueyRoot v-model="color">
    <AlphaInput />
  </HueyRoot>
</template>`,
    svelte: `<script>
import { HueyRoot, AlphaInput, hueyColor } from '@hueycolor/svelte'

let color = $state(hueyColor('#1A3263'))
</script>

<HueyRoot bind:color>
  <AlphaInput />
</HueyRoot>`,
  },
  'alpha-slider': {
    vue: `<script setup>
import { ref } from 'vue'
import { HueyRoot, AlphaSlider, hueyColor } from '@hueycolor/vue'

const color = ref(hueyColor('#1A3263'))
</script>

<template>
  <HueyRoot v-model="color">
    <AlphaSlider />
  </HueyRoot>
</template>`,
    svelte: `<script>
import { HueyRoot, AlphaSlider, hueyColor } from '@hueycolor/svelte'

let color = $state(hueyColor('#1A3263'))
</script>

<HueyRoot bind:color>
  <AlphaSlider />
</HueyRoot>`,
  },
  'rgb-inputs': {
    vue: `<script setup>
import { ref } from 'vue'
import { HueyRoot, RedInput, GreenInput, BlueInput, hueyColor } from '@hueycolor/vue'

const color = ref(hueyColor('#1A3263'))
</script>

<template>
  <HueyRoot v-model="color">
    <RedInput />
    <GreenInput />
    <BlueInput />
  </HueyRoot>
</template>`,
    svelte: `<script>
import { HueyRoot, RedInput, GreenInput, BlueInput, hueyColor } from '@hueycolor/svelte'

let color = $state(hueyColor('#1A3263'))
</script>

<HueyRoot bind:color>
  <RedInput />
  <GreenInput />
  <BlueInput />
</HueyRoot>`,
  },
  'hsl-inputs': {
    vue: `<script setup>
import { ref } from 'vue'
import { HueyRoot, HueInput, SaturationInput, LightnessInput, hueyColor } from '@hueycolor/vue'

const color = ref(hueyColor('#1A3263'))
</script>

<template>
  <HueyRoot v-model="color">
    <HueInput />
    <SaturationInput />
    <LightnessInput />
  </HueyRoot>
</template>`,
    svelte: `<script>
import { HueyRoot, HueInput, SaturationInput, LightnessInput, hueyColor } from '@hueycolor/svelte'

let color = $state(hueyColor('#1A3263'))
</script>

<HueyRoot bind:color>
  <HueInput />
  <SaturationInput />
  <LightnessInput />
</HueyRoot>`,
  },
  'hsl-sliders': {
    vue: `<script setup>
import { ref } from 'vue'
import { HueyRoot, HueSlider, SaturationSlider, LightnessSlider, hueyColor } from '@hueycolor/vue'

const color = ref(hueyColor('#1A3263'))
</script>

<template>
  <HueyRoot v-model="color">
    <HueSlider />
    <SaturationSlider />
    <LightnessSlider />
  </HueyRoot>
</template>`,
    svelte: `<script>
import { HueyRoot, HueSlider, SaturationSlider, LightnessSlider, hueyColor } from '@hueycolor/svelte'

let color = $state(hueyColor('#1A3263'))
</script>

<HueyRoot bind:color>
  <HueSlider />
  <SaturationSlider />
  <LightnessSlider />
</HueyRoot>`,
  },
}
