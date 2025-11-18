import type { ColorFormat, HueyColor } from '../types'
import { HUEY_COLOR } from '../types'
import { HEX_REGEX, HSL_REGEX, OKLCH_REGEX, RGB_REGEX } from '../utils/pattern.utils'

export function isHuey(value: unknown): value is HueyColor {
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

export function isOklch(str: string): boolean {
  const match = OKLCH_REGEX.exec(str)

  if (!match)
    return false

  const [, l, c, h, a] = match

  if (!isPercentage(l) || !isChroma(c) || !isHue(h))
    return false

  if (a !== undefined) {
    return isAlpha(a)
  }

  return true
}

export function isPercentage(v: number | string) {
  const _v = typeof v === 'string' ? Number.parseFloat(v) : v

  return (_v >= 0 && _v <= 1) || (_v >= 0 && _v <= 100)
}

export function isChroma(c: number | string) {
  const _c = typeof c === 'string' ? Number.parseFloat(c) : c

  return _c >= 0
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

export function getFormat(input: string): ColorFormat | 'unknown' {
  const trim = input.trim()

  if (isHex(trim))
    return 'hex'
  if (isRgb(trim))
    return 'rgb'
  if (isHsl(trim))
    return 'hsl'
  if (isOklch(trim))
    return 'oklch'

  return 'unknown'
}
