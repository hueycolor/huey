import type { Snippet } from 'svelte'
import type { HTMLInputAttributes } from 'svelte/elements'
import type { ColorFormat, HueyColor } from '@hueycolor/core'

export interface SliderProps {
  min?: number
  max?: number
  step?: number
  orientation?: 'horizontal' | 'vertical'
  style?: string | null
  class?: string | null
  'aria-label'?: string | null
}

export interface AlphaInputProps extends HTMLInputAttributes {}
export interface AlphaSliderProps extends SliderProps {}
export interface BlueInputProps extends HTMLInputAttributes {}
export interface ColorDropperProps {
  'aria-label'?: string
  class?: string
  onerror?: (error: Error) => void
  children?: Snippet
}
export interface ColorPreviewProps {
  class?: string
  splitPreview?: boolean
}
export interface ColorSwatchProps {
  swatch: Array<string>
  'aria-label'?: string
}
export interface GreenInputProps extends HTMLInputAttributes {}
export interface HexInputProps extends HTMLInputAttributes {
  alpha?: boolean
}
export interface HueInputProps extends HTMLInputAttributes {}
export interface HueSliderProps extends SliderProps {}
export interface HueyRootProps {
  color: HueyColor
  children?: Snippet
}
export interface LightnessInputProps extends HTMLInputAttributes {}
export interface LightnessSliderProps extends SliderProps {}
export interface RedInputProps extends HTMLInputAttributes {}
export interface SaturationAreaProps {
  colorFormat?: Exclude<ColorFormat, 'oklch'>
  class?: string
  'aria-label'?: string
}
export interface SaturationInputProps extends HTMLInputAttributes {}
export interface SaturationSliderProps extends SliderProps {}
