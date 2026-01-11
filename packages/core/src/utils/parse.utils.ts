import type { HSLA, RGBA } from '@core/types'
import { HSL_REGEX, OKLCH_REGEX } from './pattern.utils'

export interface ParsedColor {
  coords: number[]
  space: 'rgb' | 'oklch'
}

/**
 * Parse HSL string and convert to RGB [0-1 range]
 */
export function parseHSL(str: string): ParsedColor | null {
  const match = HSL_REGEX.exec(str.trim())

  if (!match)
    return null

  const [, _h, _s, _l, _a] = match

  // Check for missing values
  if (!_h || !_s || !_l)
    return null

  // Parse values
  let h = Number.parseFloat(_h)
  let s = Number.parseFloat(_s)
  let l = Number.parseFloat(_l)
  const a = _a ? Number.parseFloat(_a) : 1

  // Validate ranges
  if (Number.isNaN(h) || Number.isNaN(s) || Number.isNaN(l))
    return null
  if (s < 0 || s > 100 || l < 0 || l > 100)
    return null
  if (a < 0 || a > 1)
    return null

  // Normalize values to 0-1 range
  h = h / 360 // hue: 0-360 to 0-1
  s = s / 100 // saturation: 0-100% to 0-1
  l = l / 100 // lightness: 0-100% to 0-1

  // Convert HSL to RGB (0-1 range)
  const { r, g, b } = hslToRgb(h, s, l)

  return {
    coords: [r, g, b, a],
    space: 'rgb',
  }
}

/**
 * Parse OKLCH string
 */
export function parseOKLCH(str: string): ParsedColor | null {
  const match = OKLCH_REGEX.exec(str.trim())

  if (!match)
    return null

  const [, _l, cStr, _h, _a] = match

  // Check for missing values
  if (!_l || !cStr || !_h)
    return null

  // Parse values
  let l = Number.parseFloat(_l.replace('%', ''))
  const c = Number.parseFloat(cStr)
  const h = Number.parseFloat(_h)
  const a = _a ? Number.parseFloat(_a) : 1

  // Validate parsed values
  if (Number.isNaN(l) || Number.isNaN(c) || Number.isNaN(h))
    return null

  // Normalize lightness if it's a percentage
  if (_l.includes('%')) {
    l = l / 100
  }

  // OKLCH ranges: L is 0-1, C is 0-0.4, H is 0-360
  if (l < 0 || l > 1)
    return null
  if (c < 0)
    return null

  if (a < 0 || a > 1)
    return null

  return {
    coords: [l, c, h, a],
    space: 'oklch',
  }
}

/**
 * Convert HSL to RGB
 * Input: h, s, l in 0-1 range
 * Output: [r, g, b] in 0-1 range
 */
export function hslToRgb(h: number, s: number, l: number): Omit<RGBA, 'a'> {
  let r: number, g: number, b: number

  if (s === 0) {
    // Achromatic (grey)
    r = g = b = l
  }
  else {
    const hue2rgb = (p: number, q: number, t: number): number => {
      if (t < 0)
        t += 1
      if (t > 1)
        t -= 1
      if (t < 1 / 6)
        return p + (q - p) * 6 * t
      if (t < 1 / 2)
        return q
      if (t < 2 / 3)
        return p + (q - p) * (2 / 3 - t) * 6
      return p
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q

    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }

  return { r, g, b }
}

/**
 * Convert RGB to HSL
 * Input: r, g, b in 0-1 range
 * Output: { h, s, l } where h is 0-360, s and l are 0-100
 */
export function rgbToHsl(r: number, g: number, b: number): Omit<HSLA, 'a'> {
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const delta = max - min

  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (delta !== 0) {
    // Calculate saturation
    s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min)

    // Calculate hue
    switch (max) {
      case r:
        h = ((g - b) / delta + (g < b ? 6 : 0)) / 6
        break
      case g:
        h = ((b - r) / delta + 2) / 6
        break
      case b:
        h = ((r - g) / delta + 4) / 6
        break
    }
  }

  return {
    h: h * 360, // Convert to degrees
    s: s * 100, // Convert to percentage
    l: l * 100, // Convert to percentage
  }
}

/**
 * Convert HSL to HSV
 * Input: h in 0-360, s and l in 0-100
 * Output: { h, s, v } where h is 0-360, s and v are 0-100
 */
export function hslToHsv(h: number, s: number, l: number): { h: number, s: number, v: number } {
  // Normalize to 0-1 range
  const sNorm = s / 100
  const lNorm = l / 100

  // Calculate value
  const v = lNorm + sNorm * Math.min(lNorm, 1 - lNorm)

  // Calculate saturation
  const sv = v === 0 ? 0 : 2 * (1 - lNorm / v)

  return {
    h, // Hue stays the same
    s: sv * 100, // Convert to percentage
    v: v * 100, // Convert to percentage
  }
}

/**
 * Convert HSV to HSL
 * Input: h in 0-360, s and v in 0-100
 * Output: { h, s, l } where h is 0-360, s and l are 0-100
 */
export function hsvToHsl(h: number, s: number, v: number): { h: number, s: number, l: number } {
  const sNorm = s / 100
  const vNorm = v / 100

  const l = vNorm * (1 - sNorm / 2)
  const sl = l === 0 || l === 1 ? 0 : (vNorm - l) / Math.min(l, 1 - l)

  return {
    h,
    s: sl * 100,
    l: l * 100,
  }
}
