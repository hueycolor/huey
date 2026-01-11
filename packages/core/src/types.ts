export const HUEY_COLOR = Symbol('huey-color')

export type ColorFormat = 'hex' | 'rgb' | 'hsl' | 'oklch'

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

export interface OKLCH {
  l: number
  c: number
  h: number
  a: number
}

export interface HueyColor {
  _l: OKLCH['l']
  _c: OKLCH['c']
  _h: OKLCH['h']
  _a: OKLCH['a']
  getFormat: () => ColorFormat
  getOriginalInput: () => string
  getAlpha: () => number
  getLuminance: () => number
  getBrightness: () => number
  isLight: () => boolean
  isDark: () => boolean
  setAlpha: (a: number) => HueyColor
  setHue: (h: number) => HueyColor
  setSaturation: (s: number) => HueyColor
  setLightness: (l: number) => HueyColor
  setHsl: (h: number, s: number, l: number) => HueyColor
  toHsl: () => HSLA
  toHslString: () => string
  toHex: () => string
  toHexString: () => string
  toRgb: () => RGBA
  toRgbString: () => string
  toRec2020: () => string
  toOklchString: () => string
  toDisplayP3: () => string
  toString: () => string
  lighten: (v: number) => HueyColor
  brighten: (v: number) => HueyColor
  darken: (v: number) => HueyColor
  saturate: (v: number) => HueyColor
  desaturate: (v: number) => HueyColor
  contrastRatio: (c: HueyColor) => number
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

export interface Coordinates {
  x: number
  y: number
}

export type ArrowDirection = 'up' | 'down' | 'left' | 'right'

export type RgbChannel = 'r' | 'g' | 'b'
export type HslChannel = 'h' | 's' | 'l'
export type LchChannel = 'h' | 's' | 'v'
export type AlphaChannel = 'a'

export type ColorChannel = RgbChannel | HslChannel | LchChannel | AlphaChannel
