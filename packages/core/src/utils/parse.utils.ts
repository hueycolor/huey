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
  const h = Number.parseFloat(_h)
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
  s = s / 100 // saturation: 0-100% to 0-1
  l = l / 100 // lightness: 0-100% to 0-1

  // Convert HSL to RGB (normalized to 0-1 for color space conversion)
  const { r, g, b } = hslToRgb(h, s, l)

  return {
    coords: [r / 255, g / 255, b / 255, a],
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

export function hslToRgb(h: number, s: number, l: number, a?: number): RGBA {
  h = h / 360
  let r: number, g: number, b: number

  if (s === 0) {
    // Achromatic (grey)
    r = g = b = l
  }
  else {
    const hueToRgb = (p: number, q: number, t: number): number => {
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

    r = hueToRgb(p, q, h + 1 / 3)
    g = hueToRgb(p, q, h)
    b = hueToRgb(p, q, h - 1 / 3)
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
    a: Math.min(1, a ?? 1),
  }
}

export function rgbToHsl(r: number, g: number, b: number, a?: number): HSLA {
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const delta = max - min

  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (delta !== 0) {
    s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min)

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
    h: h * 360,
    s: s * 100,
    l: l * 100,
    a: a ?? 1,
  }
}
