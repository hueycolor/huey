// Components
export {
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

// Component prop types
export type { AlphaInputProps } from './components/alpha-input.vue'
export type { AlphaSliderProps } from './components/alpha-slider.vue'
export type { BlueInputProps } from './components/blue-input.vue'
export type { ColorDropperEmits, ColorDropperProps } from './components/color-dropper.vue'
export type { ColorPreviewProps } from './components/color-preview.vue'
export type { ColorSwatchProps } from './components/color-swatch.vue'
export type { GreenInputProps } from './components/green-input.vue'
export type { HexInputProps } from './components/hex-input.vue'
export type { HueInputProps } from './components/hue-input.vue'
export type { HueSliderProps } from './components/hue-slider.vue'
export type { LightnessInputProps } from './components/lightness-input.vue'
export type { LightnessSliderProps } from './components/lightness-slider.vue'
export type { RedInputProps } from './components/red-input.vue'
export type { SaturationAreaProps } from './components/saturation-area.vue'
export type { SaturationInputProps } from './components/saturation-input.vue'
export type { SaturationSliderProps } from './components/saturation-slider.vue'

// Composables
export { HUEY_CONTEXT, useHueyContext } from './composables/use-huey-context'
export type { HueyContext } from './composables/use-huey-context'

// Core
export { hueyColor } from '@hueycolor/core'
export type { HueyColor } from '@hueycolor/core'
