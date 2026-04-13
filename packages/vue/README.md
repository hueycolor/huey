# @hueycolor/vue

Composable, customizable color picker components for Vue 3.

## Installation

```bash
npm install @hueycolor/vue
```

## Usage

Wrap your components in `HueyRoot` with a `v-model` bound to a `HueyColor` value. All child components automatically share the color state.

```vue
<script setup lang="ts">
import {
  HueyRoot,
  HueSlider,
  AlphaSlider,
  HexInput,
  SaturationArea,
  ColorPreview,
  hueyColor,
} from '@hueycolor/vue'
import { ref } from 'vue'

const color = ref(hueyColor('#3b82f6'))
</script>

<template>
  <HueyRoot v-model="color">
    <SaturationArea />
    <HueSlider />
    <AlphaSlider />
    <HexInput />
    <ColorPreview />
  </HueyRoot>
</template>
```

## Components

### Root

| Component | Description |
|---|---|
| `HueyRoot` | Required wrapper. Accepts `v-model` of type `HueyColor`. |

### Sliders

| Component | Description |
|---|---|
| `SaturationArea` | 2D saturation/lightness picker canvas |
| `HueSlider` | Hue range slider |
| `SaturationSlider` | Saturation range slider |
| `LightnessSlider` | Lightness range slider |
| `AlphaSlider` | Alpha/opacity range slider |

### Inputs

| Component | Description |
|---|---|
| `HexInput` | Hex color text input |
| `HueInput` | Hue number input |
| `SaturationInput` | Saturation number input |
| `LightnessInput` | Lightness number input |
| `AlphaInput` | Alpha number input |
| `RedInput` | Red channel number input |
| `GreenInput` | Green channel number input |
| `BlueInput` | Blue channel number input |

### Display

| Component | Description |
|---|---|
| `ColorPreview` | Swatch showing the current color. Accepts `splitPreview` prop to show old/new side by side. |
| `ColorSwatch` | Renders a list of color swatches. Accepts a `swatch` prop of `string[]`. |
| `ColorDropper` | Eye dropper button using the browser EyeDropper API. |

## Accessing color state

Use `useHueyContext` inside any component rendered within `HueyRoot` to read or set the current color.

```vue
<script setup lang="ts">
import { useHueyContext } from '@hueycolor/vue'

const { hue, saturation, lightness, alpha, colorValue, setColor } = useHueyContext()
</script>
```

| Property | Type | Description |
|---|---|---|
| `hue` | `Ref<number>` | Current hue (0–360) |
| `saturation` | `Ref<number>` | Current saturation (0–100) |
| `lightness` | `Ref<number>` | Current lightness (0–100) |
| `alpha` | `Ref<number>` | Current alpha (0–1) |
| `colorValue` | `Ref<HueyColor>` | Current color object |
| `setColor` | `(color: string \| HueyColor) => void` | Set the color from any supported format |

## License

MIT
