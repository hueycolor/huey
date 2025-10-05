import type { HueyColor } from './types'
import { deserialize } from '@texel/color'
import { HUEY_COLOR } from './types'

const HEX_REGEX = /^#?(?:[A-F0-9]{8}|[A-F0-9]{6}|[A-F0-9]{3})$/i
// eslint-disable-next-line regexp/no-super-linear-backtracking, regexp/no-misleading-capturing-group
const RGB_REGEX = /^rgba?\(\s*(\d+)\s*,?\s*(\d+)\s*,?\s*(\d+)\s*(?:,?\s*([\d.]+)\s*)?\)$/
// // eslint-disable-next-line regexp/no-super-linear-backtracking, regexp/no-misleading-capturing-group
// const HSL_REGEX = /^hsla?\(\s*([\d.]+)(?:deg|rad|grad|turn)?\s*(?:,\s*)?([\d.]+)%\s*(?:,\s*)?([\d.]+)%\s*(?:[,/]\s*([\d.]+)\s*)?\)$/
// const OKLCH_REGEX = /^oklch\(\s*([\d.]+%?)\s+([\d.]+)\s+([\d.]+)(deg|rad|grad|turn)?\s*(?:[,/]\s*([\d.]+)\s*)?\)$/
// const LCH_REGEX = /^lch\(\s*([\d.]+%?)\s+([\d.]+)\s+([\d.]+)(deg|rad|grad|turn)?\s*(?:[,/]\s*([\d.]+)\s*)?\)$/

export function isHueyColor(value: unknown): value is HueyColor {
  return (
    typeof value === 'object'
    && value !== null
    && HUEY_COLOR in value
    && value[HUEY_COLOR] === true
  )
}

export function isHex(str: string): boolean {
  return HEX_REGEX.test(str.trim())
}

export function isRgb(str: string): boolean {
  const match = RGB_REGEX.exec(str)

  if (!match)
    return false

  const [, r, g, b, a] = match
  const values = [Number.parseInt(r), Number.parseInt(g), Number.parseInt(b)]

  if (values.some(v => v < 0 || v > 255))
    return false

  return isAlpha(a)
}

export function isAlpha(a: string | number) {
  let alpha: number

  if (a !== undefined) {
    if (typeof a === 'string') {
      alpha = Number.parseFloat(a)
    }

    alpha = a as number

    if (alpha < 0 || alpha > 1)
      return false
  }

  return true
}

// export function isHsl(str: string): boolean {
//   return false
// }

// export function isLch(str: string): boolean {
//   return false
// }

export function getFormat(input: string): 'hex' | 'rgb' | 'lch' | 'hsl' | 'oklch' | 'unknown' {
  const trimmed = input.trim()

  if (isHex(trimmed))
    return 'hex'
  if (isRgb(trimmed))
    return 'rgb'

  return 'unknown'
}

export function hueyColor(inputColor: string | HueyColor): HueyColor {
  if (isHueyColor(inputColor)) {
    return inputColor
  }

  // Parse the color, determine if its a hex, rgb, hsl, oklch

  const format = getFormat(inputColor)

  if (format === 'unknown') {
    throw new Error(`invalid color provided: ${inputColor}`)
  }
  // Determing if its a valid color (valid hex, rgb, hsl, oklch)

  // If valid use color, otherwise initialize a white color with a fixed hue (blue maybe)

  // return a hueyColor instance

  const parsed = deserialize(inputColor)

  return {
    [HUEY_COLOR]: true,
    oklch: { l: 1, c: 3, h: 3 },
    lastKnownHue: 3,
    meta: { originalFormat: parsed.id },
  }
}
