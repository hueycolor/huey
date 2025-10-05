export const HUEY_COLOR = Symbol('huey-color')

export type ColorFormat = 'hex' | 'rgb' | 'lch' | 'hsl' | 'oklch'

export interface HSLA {
  h: number
  s: number
  l: number
  a: number
}

export interface RGBA {
  r: number
  g: number
  b: number
  a: number
}

export interface LCH {
  l: number
  c: number
  h: number
  a: number
}

export interface OKLCH extends LCH {}

export interface HueyColor {
  getFormat: () => ColorFormat
  getOriginalInput: () => string
  isValid: () => boolean
  getAlpha: () => number
  getLuminance: () => number
  getBrightness: () => number
  isLight: () => boolean
  isDark: () => boolean
  setAlpha: (alpha: number) => HueyColor
  toHSL: () => HSLA
  toHSLString: () => string
  toHex: () => string
  toHexString: () => string
  toHex8: () => string
  toHex8String: () => string
  toRgb: () => RGBA
  toRgbString: () => string
  toString: () => string
  lighten: (amount: number) => HueyColor
  brighten: (amount: number) => HueyColor
  darken: (amount: number) => HueyColor
  saturate: (amount: number) => HueyColor
  desaturate: (amount: number) => HueyColor
  contrastRatio: (color: HueyColor) => number
  randomize: () => HueyColor
  clone: () => HueyColor
}

export interface HueyColorSymbol extends HueyColor {
  [HUEY_COLOR]: true
}

export interface HueyOptions {
  fallback?: string
  onError?: (error: HueyError) => void
}

export interface HueyError {
  type: 'invalid-format' | 'parse-error' | 'unsupported-format'
  input: string
  format: string
  message: string
}
