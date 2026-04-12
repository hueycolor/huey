import type { Component } from 'svelte'
import type {
  AlphaInputProps,
  AlphaSliderProps,
  BlueInputProps,
  ColorDropperProps,
  ColorPreviewProps,
  ColorSwatchProps,
  GreenInputProps,
  HexInputProps,
  HueInputProps,
  HueSliderProps,
  HueyRootProps,
  LightnessInputProps,
  LightnessSliderProps,
  RedInputProps,
  SaturationAreaProps,
  SaturationInputProps,
  SaturationSliderProps,
} from './types'

// --------------- Component props (re-exported for consumers) ---------------

export type {
  AlphaInputProps,
  AlphaSliderProps,
  BlueInputProps,
  ColorDropperProps,
  ColorPreviewProps,
  ColorSwatchProps,
  GreenInputProps,
  HexInputProps,
  HueInputProps,
  HueSliderProps,
  HueyRootProps,
  LightnessInputProps,
  LightnessSliderProps,
  RedInputProps,
  SaturationAreaProps,
  SaturationInputProps,
  SaturationSliderProps,
} from './types'

// --------------- Components ---------------

export declare const AlphaInput: Component<AlphaInputProps>
export declare const AlphaSlider: Component<AlphaSliderProps>
export declare const BlueInput: Component<BlueInputProps>
export declare const ColorDropper: Component<ColorDropperProps>
export declare const ColorPreview: Component<ColorPreviewProps>
export declare const ColorSwatch: Component<ColorSwatchProps>
export declare const GreenInput: Component<GreenInputProps>
export declare const HexInput: Component<HexInputProps>
export declare const HueInput: Component<HueInputProps>
export declare const HueSlider: Component<HueSliderProps>
export declare const HueyRoot: Component<HueyRootProps>
export declare const LightnessInput: Component<LightnessInputProps>
export declare const LightnessSlider: Component<LightnessSliderProps>
export declare const RedInput: Component<RedInputProps>
export declare const SaturationArea: Component<SaturationAreaProps>
export declare const SaturationInput: Component<SaturationInputProps>
export declare const SaturationSlider: Component<SaturationSliderProps>

// --------------- Context ---------------

export declare class HueyState {
  hue: number
  saturation: number
  lightness: number
  alpha: number
  colorValue: HueyColor
  setColor: (color: string | HueyColor) => void
}

export declare const HUEY_CONTEXT: symbol

export declare function setHueyContext(state: HueyState): HueyState
export declare function useHueyContext(): HueyState

// --------------- Core ---------------

export { hueyColor } from '@hueycolor/core'
export type { HueyColor } from '@hueycolor/core'
