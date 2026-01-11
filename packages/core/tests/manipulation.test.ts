import { hueyColor } from '@core/core'
import { describe, expect, it } from 'vitest'

const BASE_COLOR = 'rgb(128, 128, 128)' // Mid-gray

describe('color manipulation - setAlpha', () => {
  it('should set alpha value', () => {
    const color = hueyColor(BASE_COLOR)
    const result = color.setAlpha(0.5)

    expect(result.getAlpha()).toBe(0.5)
  })

  it('should return a new color instance', () => {
    const color = hueyColor(BASE_COLOR)
    const result = color.setAlpha(0.3)

    expect(result).not.toBe(color)
    expect(result.getAlpha()).toBe(0.3)
  })

  it('should allow setting alpha to 0', () => {
    const color = hueyColor(BASE_COLOR)
    const result = color.setAlpha(0)

    expect(result.getAlpha()).toBe(0)
  })

  it('should allow setting alpha to 1', () => {
    const color = hueyColor(BASE_COLOR)
    const result = color.setAlpha(1)

    expect(result.getAlpha()).toBe(1)
  })
})

describe('color manipulation - getAlpha', () => {
  it('should return default alpha of 1', () => {
    const color = hueyColor(BASE_COLOR)

    expect(color.getAlpha()).toBe(1)
  })

  it('should return set alpha value', () => {
    const color = hueyColor('rgba(128, 128, 128, 0.7)')

    expect(color.getAlpha()).toBe(0.7)
  })
})

describe('color manipulation - saturate', () => {
  it('should increase saturation', () => {
    const color = hueyColor('hsl(180, 50%, 50%)')
    const initialC = color._c

    const result = color.saturate(0.1)

    expect(result._c).toBeGreaterThan(initialC)
  })

  it('should return a new color instance', () => {
    const color = hueyColor('hsl(180, 50%, 50%)')
    const result = color.saturate(0.1)

    expect(result).not.toBe(color)
  })

  it('should not go below 0', () => {
    const color = hueyColor('hsl(180, 0%, 50%)')
    const result = color.saturate(-0.5)

    expect(result._c).toBe(0)
  })

  it('should allow very large saturation increases', () => {
    const color = hueyColor('hsl(180, 50%, 50%)')
    const initialC = color._c

    const result = color.saturate(10)

    expect(result._c).toBeGreaterThan(initialC)
    expect(result._c).toBeGreaterThanOrEqual(0)
  })
})

describe('color manipulation - desaturate', () => {
  it('should decrease saturation', () => {
    const color = hueyColor('hsl(180, 50%, 50%)')
    const initialC = color._c

    const result = color.desaturate(0.05)

    expect(result._c).toBeLessThan(initialC)
  })

  it('should return a new color instance', () => {
    const color = hueyColor('hsl(180, 50%, 50%)')
    const result = color.desaturate(0.05)

    expect(result).not.toBe(color)
  })

  it('should not go below 0', () => {
    const color = hueyColor('hsl(180, 50%, 50%)')
    const result = color.desaturate(1)

    expect(result._c).toBe(0)
  })

  it('should create grayscale when fully desaturated', () => {
    const color = hueyColor('hsl(180, 50%, 50%)')
    const result = color.desaturate(1)

    expect(result._c).toBe(0)
  })
})

describe('color manipulation - lighten', () => {
  it('should increase lightness', () => {
    const color = hueyColor('hsl(180, 50%, 50%)')
    const initialL = color._l

    const result = color.lighten(0.1)

    expect(result._l).toBeGreaterThan(initialL)
  })

  it('should return a new color instance', () => {
    const color = hueyColor('hsl(180, 50%, 50%)')
    const result = color.lighten(0.1)

    expect(result).not.toBe(color)
  })

  it('should not go above 1', () => {
    const color = hueyColor('hsl(180, 50%, 90%)')
    const result = color.lighten(0.5)

    expect(result._l).toBe(1)
  })

  it('should cap at exactly 1.0 when at boundary', () => {
    const color = hueyColor('oklch(1.0 0.15 180)')
    const result = color.lighten(0.1)

    expect(result._l).toBe(1)
  })
})

describe('color manipulation - brighten', () => {
  it('should increase brightness', () => {
    const color = hueyColor('hsl(180, 50%, 50%)')
    const initialL = color._l

    const result = color.brighten(0.1)

    expect(result._l).toBeGreaterThan(initialL)
  })

  it('should return a new color instance', () => {
    const color = hueyColor('hsl(180, 50%, 50%)')
    const result = color.brighten(0.1)

    expect(result).not.toBe(color)
  })

  it('should not go above 1', () => {
    const color = hueyColor('hsl(180, 50%, 90%)')
    const result = color.brighten(0.5)

    expect(result._l).toBe(1)
  })

  it('should cap at exactly 1.0 when at boundary', () => {
    const color = hueyColor('oklch(1.0 0.15 180)')
    const result = color.brighten(0.1)

    expect(result._l).toBe(1)
  })
})

describe('color manipulation - darken', () => {
  it('should decrease lightness', () => {
    const color = hueyColor('hsl(180, 50%, 50%)')
    const initialL = color._l

    const result = color.darken(0.1)

    expect(result._l).toBeLessThan(initialL)
  })

  it('should return a new color instance', () => {
    const color = hueyColor('hsl(180, 50%, 50%)')
    const result = color.darken(0.1)

    expect(result).not.toBe(color)
  })

  it('should not go below 0', () => {
    const color = hueyColor('hsl(180, 50%, 20%)')
    const result = color.darken(0.5)

    expect(result._l).toBe(0)
  })

  it('should cap at exactly 0.0 when at boundary', () => {
    const color = hueyColor('oklch(0.0 0.15 180)')
    const result = color.darken(0.1)

    expect(result._l).toBe(0)
  })
})

describe('color manipulation - getBrightness', () => {
  it('should return brightness value', () => {
    const color = hueyColor('hsl(180, 50%, 50%)')
    const brightness = color.getBrightness()

    expect(brightness).toBeGreaterThan(0)
    expect(brightness).toBeLessThan(1)
  })

  it('should return high brightness for light colors', () => {
    const color = hueyColor('#FFFFFF')
    const brightness = color.getBrightness()

    expect(brightness).toBeGreaterThan(0.9)
  })

  it('should return low brightness for dark colors', () => {
    const color = hueyColor('#000000')
    const brightness = color.getBrightness()

    expect(brightness).toBeLessThan(0.1)
  })
})

describe('color manipulation - getLuminance', () => {
  it('should return luminance value between 0 and 1', () => {
    const color = hueyColor('hsl(180, 50%, 50%)')
    const luminance = color.getLuminance()

    expect(luminance).toBeGreaterThanOrEqual(0)
    expect(luminance).toBeLessThanOrEqual(1)
  })

  it('should return 1 for white', () => {
    const color = hueyColor('#FFFFFF')
    const luminance = color.getLuminance()

    expect(luminance).toBeCloseTo(1, 1)
  })

  it('should return near 0 for black', () => {
    const color = hueyColor('#000000')
    const luminance = color.getLuminance()

    expect(luminance).toBeCloseTo(0, 1)
  })

  it('should return different luminance for different colors', () => {
    const red = hueyColor('#FF0000')
    const green = hueyColor('#00FF00')
    const blue = hueyColor('#0000FF')

    expect(red.getLuminance()).not.toBe(green.getLuminance())
    expect(green.getLuminance()).not.toBe(blue.getLuminance())
  })
})

describe('color manipulation - isLight', () => {
  it('should return true for light colors', () => {
    const color = hueyColor('#FFFFFF')

    expect(color.isLight()).toBe(true)
  })

  it('should return false for dark colors', () => {
    const color = hueyColor('#000000')

    expect(color.isDark()).toBe(true)
    expect(color.isLight()).toBe(false)
  })

  it('should use 0.5 as threshold', () => {
    const color = hueyColor('oklch(0.51 0 0)')

    expect(color.isLight()).toBe(true)
  })
})

describe('color manipulation - isDark', () => {
  it('should return true for dark colors', () => {
    const color = hueyColor('#000000')

    expect(color.isDark()).toBe(true)
  })

  it('should return false for light colors', () => {
    const color = hueyColor('#FFFFFF')

    expect(color.isDark()).toBe(false)
    expect(color.isLight()).toBe(true)
  })

  it('should use 0.5 as threshold', () => {
    const color = hueyColor('oklch(0.50 0 0)')

    expect(color.isDark()).toBe(true)
  })
})

describe('color manipulation - contrastRatio', () => {
  it('should calculate contrast ratio between two colors', () => {
    const black = hueyColor('#000000')
    const white = hueyColor('#FFFFFF')
    const ratio = black.contrastRatio(white)

    expect(ratio).toBeGreaterThan(1)
  })

  it('should return 21:1 for black vs white', () => {
    const black = hueyColor('#000000')
    const white = hueyColor('#FFFFFF')
    const ratio = black.contrastRatio(white)

    expect(ratio).toBeCloseTo(21, 0)
  })

  it('should be symmetric', () => {
    const color1 = hueyColor('#FF0000')
    const color2 = hueyColor('#00FF00')

    expect(color1.contrastRatio(color2)).toBeCloseTo(color2.contrastRatio(color1), 5)
  })

  it('should return 1:1 for same color', () => {
    const color = hueyColor('#FF5500')
    const same = hueyColor('#FF5500')
    const ratio = color.contrastRatio(same)

    expect(ratio).toBeCloseTo(1, 1)
  })

  it('should pass WCAG AA for sufficient contrast', () => {
    const background = hueyColor('#FFFFFF')
    const text = hueyColor('#595959')
    const ratio = text.contrastRatio(background)

    expect(ratio).toBeGreaterThanOrEqual(4.5) // WCAG AA standard for normal text
  })
})

describe('color manipulation - randomize', () => {
  it('should randomize color values', () => {
    const color = hueyColor('hsl(180, 50%, 50%)')
    const originalL = color._l
    const originalC = color._c
    const originalH = color._h

    const result = color.randomize()

    const changed = result._l !== originalL || result._c !== originalC || result._h !== originalH
    expect(changed).toBe(true)
  })

  it('should return a new color instance', () => {
    const color = hueyColor('hsl(180, 50%, 50%)')
    const result = color.randomize()

    expect(result).not.toBe(color)
  })

  it('should keep values in valid ranges', () => {
    const color = hueyColor('hsl(180, 50%, 50%)')
    const result = color.randomize()

    expect(result._l).toBeGreaterThanOrEqual(0)
    expect(result._l).toBeLessThanOrEqual(1)
    expect(result._c).toBeGreaterThanOrEqual(0)
    expect(result._h).toBeGreaterThanOrEqual(0)
    expect(result._h).toBeLessThanOrEqual(360)
  })

  it('should preserve alpha value', () => {
    const color = hueyColor('rgba(210, 120, 120, 0.5)')
    const originalAlpha = color._a

    const result = color.randomize()

    expect(result._a).toBe(originalAlpha)
  })

  it('should not modify alpha when randomizing', () => {
    const color = hueyColor('rgba(210, 120, 120, 0.33)')

    const result = color.randomize()

    expect(result._a).toBe(0.33)
  })
})

describe('color manipulation - clone', () => {
  it('should create a copy of the color', () => {
    const original = hueyColor('hsl(180, 50%, 50%)')
    const clone = original.clone()

    expect(clone._l).toBe(original._l)
    expect(clone._c).toBe(original._c)
    expect(clone._h).toBe(original._h)
    expect(clone._a).toBe(original._a)
  })

  it('should not affect original when clone is modified', () => {
    const original = hueyColor('hsl(180, 50%, 50%)')
    const originalL = original._l
    const clone = original.clone()

    const modified = clone.lighten(0.2)

    expect(original._l).toBe(originalL)
    expect(modified._l).not.toBe(original._l)
  })
})

describe('color manipulation - method chaining', () => {
  it('should allow chaining multiple manipulations', () => {
    const color = hueyColor('hsl(180, 50%, 50%)')

    const result = color
      .saturate(0.1)
      .lighten(0.1)
      .setAlpha(0.8)

    expect(result).not.toBe(color)
    expect(result.getAlpha()).toBe(0.8)
  })

  it('should apply chained manipulations in order', () => {
    const color = hueyColor('hsl(180, 50%, 50%)')
    const initialL = color._l

    const result = color
      .lighten(0.2)
      .darken(0.1)

    expect(result._l).toBeCloseTo(initialL + 0.1, 2)
  })
})
