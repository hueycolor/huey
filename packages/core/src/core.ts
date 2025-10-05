/* eslint-disable regexp/no-misleading-capturing-group, regexp/no-super-linear-backtracking, regexp/no-unused-capturing-group */
import type { HueyColor } from './types'
import { deserialize } from '@texel/color'
import { HUEY_COLOR } from './types'

const HEX_REGEX = /^#?(?:[A-F0-9]{8}|[A-F0-9]{6}|[A-F0-9]{3})$/i
const RGB_REGEX = /^rgba?\(\s*(\d+)\s*,?\s*(\d+)\s*,?\s*(\d+)\s*(?:,?\s*([\d.]+)\s*)?\)$/
const HSL_REGEX = /^hsla?\(\s*([\d.]+)(?:deg|rad|grad|turn)?\s*,?\s*([\d.]+)%?\s*,?\s*([\d.]+)%?\s*(?:[,/]\s*)?([\d.]+)?\s*\)$/
const LCH_REGEX = /^(?:lch|oklch)\(\s*([\d.]+%?)\s+([\d.]+)\s+([\d.]+)(deg|rad|grad|turn)?\s*(?:[,/]\s*([\d.]+)\s*)?\)$/

export function isColor(value: unknown): value is HueyColor {
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

  if (a !== undefined) {
    return isAlpha(a)
  }

  return true
}

export function isHsl(str: string): boolean {
  const match = HSL_REGEX.exec(str)

  if (!match)
    return false

  const [, h, s, l, a] = match

  if (!isHue(h) || !isPercentage(s) || !isPercentage(l))
    return false

  if (a !== undefined) {
    return isAlpha(a)
  }

  return true
}

export function isLch(str: string): boolean {
  const match = LCH_REGEX.exec(str)

  if (!match)
    return false

  const [, l, c, h, a] = match

  if (!isPercentage(l) || !isPercentage(c) || !isHue(h))
    return false

  if (a !== undefined) {
    return isAlpha(a)
  }

  return true
}

export function isOklch(str: string): boolean {
  if (!str.startsWith('ok'))
    return false

  return isLch(str)
}

export function isPercentage(v: number | string) {
  const _v = typeof v === 'string' ? Number.parseFloat(v) : v

  return (_v >= 0 && _v <= 1) || (_v >= 0 && _v <= 100)
}

export function isHue(h: number | string) {
  const _h = typeof h === 'string' ? Number.parseFloat(h) : h

  return !(_h < 0 || _h > 360)
}

export function isAlpha(a: string | number) {
  const _a = typeof a === 'string' ? Number.parseFloat(a) : a

  if (_a >= 0 && _a <= 1)
    return true

  return false
}

export function getFormat(input: string): 'hex' | 'rgb' | 'lch' | 'hsl' | 'oklch' | 'unknown' {
  const trim = input.trim()

  if (isHex(trim))
    return 'hex'
  if (isRgb(trim))
    return 'rgb'
  if (isHsl(trim))
    return 'hsl'
  if (isLch(trim))
    return 'lch'
  if (isOklch(trim))
    return 'oklch'

  return 'unknown'
}

export function hueyColor(color: string | HueyColor): HueyColor {
  if (isColor(color)) {
    return color
  }

  // Parse the color, determine if its a hex, rgb, hsl, oklch

  const format = getFormat(color)

  if (format === 'unknown') {
    throw new Error(`invalid color provided: ${color}`)
  }
  // Determing if its a valid color (valid hex, rgb, hsl, oklch)

  // If valid use color, otherwise initialize a white color with a fixed hue (blue maybe)

  // return a hueyColor instance

  const parsed = deserialize(color)

  return {
    [HUEY_COLOR]: true,
    oklch: { l: 1, c: 3, h: 3 },
    lastKnownHue: 3,
    meta: { originalFormat: parsed.id },
  }
}
