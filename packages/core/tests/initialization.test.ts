import { hueyColor } from '@core/core.ts'
import { isHuey } from '@core/utils'
import { describe, expect, it } from 'vitest'

const TEST_COLORS = {
  rgb: {
    spaced: 'rgb(210 120 120)',
    comma: 'rgb(210, 120, 120)',
    withAlphaSpaced: 'rgb(210 120 120 / 0.4)',
    withAlphaComma: 'rgb(210, 120, 120, 0.4)',
  },
}

describe('color init', () => {
  it('should be a huey color', () => {
    const color = hueyColor(TEST_COLORS.rgb.spaced)
    expect(isHuey(color)).toBe(true)
  })
  describe('rgb', () => {
    it('should init from space separated', () => {
      const color = hueyColor(TEST_COLORS.rgb.spaced)
      expect(color._l).toBeTypeOf('number')
      expect(color._c).toBeTypeOf('number')
      expect(color._h).toBeTypeOf('number')
      expect(color._a).toBe(1)
      expect(color.getOriginalInput()).toBe(TEST_COLORS.rgb.spaced)
    })
    it('should init from comma separated', () => {
      const color = hueyColor(TEST_COLORS.rgb.comma)
      expect(color._l).toBeTypeOf('number')
      expect(color._c).toBeTypeOf('number')
      expect(color._h).toBeTypeOf('number')
      expect(color._a).toBe(1)
      expect(color.getOriginalInput()).toBe(TEST_COLORS.rgb.comma)
    })
    it('should init from space separated with alpha', () => {
      const color = hueyColor(TEST_COLORS.rgb.withAlphaSpaced)
      expect(color._a).toBeLessThan(1)
      expect(color._l).toBeTypeOf('number')
      expect(color._c).toBeTypeOf('number')
      expect(color._h).toBeTypeOf('number')
      expect(color.getOriginalInput()).toBe(TEST_COLORS.rgb.withAlphaSpaced)
    })
  })
})
