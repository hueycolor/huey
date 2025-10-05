export const HUEY_COLOR = Symbol('huey-color')

export interface HueyColor {
  [HUEY_COLOR]: true
  oklch: { l: number, c: number, h: number }
  lastKnownHue: number
  meta: { originalFormat: string }
}

export interface HueyOptions {}
