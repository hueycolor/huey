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
  hex: {
    withoutHash: 'FFF',
    hex3: '#FF5',
    hex6: '#FF5500',
    hex8: '#FF5500A1',
  },
}

describe('color init', () => {
  describe('rgb', () => {
    it('should init from space separated', () => {
      const color = hueyColor(TEST_COLORS.rgb.spaced)
      expect(isHuey(color)).toBe(true)
      expect(color._l).toBeTypeOf('number')
      expect(color._c).toBeTypeOf('number')
      expect(color._h).toBeTypeOf('number')
      expect(color._a).toBe(1)
    })
    it('should init from comma separated', () => {
      const color = hueyColor(TEST_COLORS.rgb.comma)
      expect(isHuey(color)).toBe(true)
      expect(color._l).toBeTypeOf('number')
      expect(color._c).toBeTypeOf('number')
      expect(color._h).toBeTypeOf('number')
      expect(color._a).toBe(1)
    })
    it('should init from space separated with alpha', () => {
      const color = hueyColor(TEST_COLORS.rgb.withAlphaSpaced)
      expect(isHuey(color)).toBe(true)
      expect(color._a).toBeLessThan(1)
      expect(color._l).toBeTypeOf('number')
      expect(color._c).toBeTypeOf('number')
      expect(color._h).toBeTypeOf('number')
    })
    it('should init from comma separated with alpha', () => {
      const color = hueyColor(TEST_COLORS.rgb.withAlphaSpaced)
      expect(isHuey(color)).toBe(true)
      expect(color._a).toBeLessThan(1)
      expect(color._l).toBeTypeOf('number')
      expect(color._c).toBeTypeOf('number')
      expect(color._h).toBeTypeOf('number')
    })
  })
  describe('hex', () => {
    it('should init from hex3', () => {
      const color = hueyColor(TEST_COLORS.hex.hex3)
      expect(isHuey(color)).toBe(true)
      expect(color._a).toBe(1)
      expect(color._l).toBeTypeOf('number')
      expect(color._c).toBeTypeOf('number')
      expect(color._h).toBeTypeOf('number')
    })
    it('should init from hex6', () => {
      const color = hueyColor(TEST_COLORS.hex.hex6)
      expect(isHuey(color)).toBe(true)
    })
    it('should init from hex8', () => {
      const color = hueyColor(TEST_COLORS.hex.hex8)
      expect(isHuey(color)).toBe(true)
      expect(color._a).toBeLessThan(1)
    })
    it('should not init from hashless', () => {
      expect(() => hueyColor(TEST_COLORS.hex.withoutHash)).toThrowError(`could not parse color string ${TEST_COLORS.hex.withoutHash}`)
    })
  })
})
