import { hueyColor } from '@core/core.ts'
import { describe, expect, it } from 'vitest'

const BASE_COLOR = '#d27878' // rgb(210, 120, 120)

describe('color conversion - toRgb', () => {
  it('should convert to rgb object', () => {
    const color = hueyColor(BASE_COLOR)
    const rgb = color.toRgb()

    expect(rgb).toHaveProperty('r')
    expect(rgb).toHaveProperty('g')
    expect(rgb).toHaveProperty('b')
    expect(rgb).toHaveProperty('a')
    expect(rgb.r).toBeGreaterThanOrEqual(0)
    expect(rgb.r).toBeLessThanOrEqual(255)
    expect(rgb.a).toBe(1)
  })

  it('should preserve alpha in rgb object', () => {
    const color = hueyColor('rgba(210, 120, 120, 0.5)')
    const rgb = color.toRgb()

    expect(rgb.a).toBe(0.5)
  })
})

describe('color conversion - toRgbString', () => {
  it('should convert to rgb string without alpha', () => {
    const color = hueyColor(BASE_COLOR)
    const rgbString = color.toRgbString()

    expect(rgbString).toMatch(/^rgb\(\d+,\s*\d+,\s*\d+\)$/)
  })

  it('should convert to rgba string with alpha', () => {
    const color = hueyColor('rgba(210, 120, 120, 0.5)')
    const rgbString = color.toRgbString()

    expect(rgbString).toMatch(/^rgba\(\d+,\s*\d+,\s*\d+,\s*[\d.]+\)$/)
    expect(rgbString).toContain('0.5')
  })
})

describe('color conversion - toHex', () => {
  it('should convert to hex without hash', () => {
    const color = hueyColor(BASE_COLOR)
    const hex = color.toHex()

    expect(hex).toMatch(/^[0-9a-f]{8}$/i)
    expect(hex).not.toContain('#')
  })

  it('should convert to hex with alpha', () => {
    const color = hueyColor('rgba(210, 120, 120, 0.5)')
    const hex = color.toHex()

    expect(hex).toMatch(/^[0-9a-f]{8}$/i)
  })
})

describe('color conversion - toHexString', () => {
  it('should convert to hex string with hash', () => {
    const color = hueyColor(BASE_COLOR)
    const hexString = color.toHexString()

    expect(hexString).toMatch(/^#[0-9a-f]{8}$/i)
    expect(hexString.startsWith('#')).toBe(true)
  })

  it('should convert to hex string with alpha', () => {
    const color = hueyColor('rgba(210, 120, 120, 0.5)')
    const hexString = color.toHexString()

    expect(hexString).toMatch(/^#[0-9a-f]{8}$/i)
  })
})

describe('color conversion - toHsl', () => {
  it('should convert to hsl object', () => {
    const color = hueyColor(BASE_COLOR)
    const hsl = color.toHsl()

    expect(hsl).toHaveProperty('h')
    expect(hsl).toHaveProperty('s')
    expect(hsl).toHaveProperty('l')
    expect(hsl).toHaveProperty('a')
    expect(hsl.h).toBeGreaterThanOrEqual(0)
    expect(hsl.h).toBeLessThanOrEqual(360)
    expect(hsl.s).toBeGreaterThanOrEqual(0)
    expect(hsl.s).toBeLessThanOrEqual(100)
    expect(hsl.l).toBeGreaterThanOrEqual(0)
    expect(hsl.l).toBeLessThanOrEqual(100)
    expect(hsl.a).toBe(1)
  })

  it('should preserve alpha in hsl object', () => {
    const color = hueyColor('rgba(210, 120, 120, 0.7)')
    const hsl = color.toHsl()

    expect(hsl.a).toBe(0.7)
  })
})

describe('color conversion - toHslString', () => {
  it('should convert to hsl string without alpha', () => {
    const color = hueyColor(BASE_COLOR)
    const hslString = color.toHslString()

    expect(hslString).toMatch(/^hsl\(\d+,\s*\d+%,\s*\d+%\)$/)
  })

  it('should convert to hsla string with alpha', () => {
    const color = hueyColor('rgba(210, 120, 120, 0.5)')
    const hslString = color.toHslString()

    expect(hslString).toMatch(/^hsla\(\d+,\s*\d+%,\s*\d+%,\s*[\d.]+\)$/)
    expect(hslString).toContain('0.5')
  })
})

describe('color conversion - toOklchString', () => {
  it('should convert to oklch string without alpha', () => {
    const color = hueyColor(BASE_COLOR)
    const oklchString = color.toOklchString()

    expect(oklchString).toMatch(/^oklch\([\d.]+%\s+[\d.]+\s+[\d.]+\)$/)
  })

  it('should convert to oklch string with alpha', () => {
    const color = hueyColor('rgba(210, 120, 120, 0.5)')
    const oklchString = color.toOklchString()

    expect(oklchString).toMatch(/^oklch\([\d.]+%\s+[\d.]+\s+[\d.]+\s+\/\s+[\d.]+\)$/)
    expect(oklchString).toContain('0.5')
  })
})

describe('color conversion - toDisplayP3', () => {
  it('should convert to display-p3 string without alpha', () => {
    const color = hueyColor(BASE_COLOR)
    const p3String = color.toDisplayP3()

    expect(p3String).toMatch(/^color\(display-p3\s+[\d.]+\s+[\d.]+\s+[\d.]+\)$/)
  })

  it('should convert to display-p3 string with alpha', () => {
    const color = hueyColor('rgba(210, 120, 120, 0.5)')
    const p3String = color.toDisplayP3()

    expect(p3String).toMatch(/^color\(display-p3\s+[\d.]+\s+[\d.]+\s+[\d.]+\s+\/\s+[\d.]+\)$/)
    expect(p3String).toContain('0.5')
  })
})

describe('color conversion - toRec2020', () => {
  it('should convert to rec2020 string without alpha', () => {
    const color = hueyColor(BASE_COLOR)
    const rec2020String = color.toRec2020()

    expect(rec2020String).toMatch(/^color\(rec2020\s+[\d.]+\s+[\d.]+\s+[\d.]+\)$/)
  })

  it('should convert to rec2020 string with alpha', () => {
    const color = hueyColor('rgba(210, 120, 120, 0.5)')
    const rec2020String = color.toRec2020()

    expect(rec2020String).toMatch(/^color\(rec2020\s+[\d.]+\s+[\d.]+\s+[\d.]+\s+\/\s+[\d.]+\)$/)
    expect(rec2020String).toContain('0.5')
  })
})

describe('color conversion - toString', () => {
  it('should convert to original format for hex', () => {
    const color = hueyColor('#FF5500')
    const string = color.toString()

    expect(string).toMatch(/^#[0-9a-f]{8}$/i)
  })

  it('should convert to original format for rgb', () => {
    const color = hueyColor('rgb(210, 120, 120)')
    const string = color.toString()

    expect(string).toMatch(/^rgb\(/)
  })

  it('should convert to original format for hsl', () => {
    const color = hueyColor('hsl(180, 50%, 50%)')
    const string = color.toString()

    expect(string).toMatch(/^hsl\(/)
  })

  it('should convert to original format for oklch', () => {
    const color = hueyColor('oklch(0.5 0.15 180)')
    const string = color.toString()

    expect(string).toMatch(/^oklch\(/)
  })
})

describe('color conversion - round trip conversions', () => {
  it('should maintain color values through rgb round trip', () => {
    const original = hueyColor('rgb(210, 120, 120)')
    const roundTrip = hueyColor(original.toRgbString())

    const originalRgb = original.toRgb()
    const roundTripRgb = roundTrip.toRgb()

    expect(Math.abs(originalRgb.r - roundTripRgb.r)).toBeLessThan(2)
    expect(Math.abs(originalRgb.g - roundTripRgb.g)).toBeLessThan(2)
    expect(Math.abs(originalRgb.b - roundTripRgb.b)).toBeLessThan(2)
  })

  it('should maintain color values through hex round trip', () => {
    const original = hueyColor('#FF5500')
    const roundTrip = hueyColor(original.toHexString())

    const originalRgb = original.toRgb()
    const roundTripRgb = roundTrip.toRgb()

    expect(Math.abs(originalRgb.r - roundTripRgb.r)).toBeLessThan(2)
    expect(Math.abs(originalRgb.g - roundTripRgb.g)).toBeLessThan(2)
    expect(Math.abs(originalRgb.b - roundTripRgb.b)).toBeLessThan(2)
  })

  it('should maintain color values through hsl round trip', () => {
    const original = hueyColor('hsl(180, 50%, 50%)')
    const roundTrip = hueyColor(original.toHslString())

    const originalHsl = original.toHsl()
    const roundTripHsl = roundTrip.toHsl()

    expect(Math.abs(originalHsl.h - roundTripHsl.h)).toBeLessThan(2)
    expect(Math.abs(originalHsl.s - roundTripHsl.s)).toBeLessThan(2)
    expect(Math.abs(originalHsl.l - roundTripHsl.l)).toBeLessThan(2)
  })

  it('should maintain color values through oklch round trip', () => {
    const original = hueyColor('oklch(0.5 0.15 180)')
    const roundTrip = hueyColor(original.toOklchString())

    expect(Math.abs(original._l - roundTrip._l)).toBeLessThan(0.01)
    expect(Math.abs(original._c - roundTrip._c)).toBeLessThan(0.01)
    expect(Math.abs(original._h - roundTrip._h)).toBeLessThan(1)
  })
})
