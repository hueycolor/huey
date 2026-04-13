# @hueycolor/svelte

Composable, customizable color picker components for Svelte 5.

## Installation

```bash
npm install @hueycolor/svelte
```

## Usage

Wrap your components in `HueyRoot` with `bind:color` bound to a `HueyColor` value. All child components automatically share the color state.

```svelte
<script lang="ts">
  import {
    HueyRoot,
    HueSlider,
    AlphaSlider,
    HexInput,
    SaturationArea,
    ColorPreview,
    hueyColor,
  } from '@hueycolor/svelte'

  let color = $state(hueyColor('#3b82f6'))
</script>

<HueyRoot bind:color>
  <SaturationArea />
  <HueSlider />
  <AlphaSlider />
  <HexInput />
  <ColorPreview />
</HueyRoot>
```

## Components

### Root

| Component | Description |
|---|---|
| `HueyRoot` | Required wrapper. Accepts `bind:color` of type `HueyColor`. |

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

```svelte
<script lang="ts">
  import { useHueyContext } from '@hueycolor/svelte'

  const state = useHueyContext()
</script>
```

| Property | Type | Description |
|---|---|---|
| `state.hue` | `number` | Current hue (0–360) |
| `state.saturation` | `number` | Current saturation (0–100) |
| `state.lightness` | `number` | Current lightness (0–100) |
| `state.alpha` | `number` | Current alpha (0–1) |
| `state.colorValue` | `HueyColor` | Current color object |
| `state.setColor` | `(color: string \| HueyColor) => void` | Set the color from any supported format |

## License

MIT
