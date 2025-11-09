import { hueyColor } from '@core/core.ts'
import { isHuey } from '@core/utils'
import { describe, expect, it } from 'vitest'

const TEST_COLORS = {
  rgb: {
    valid: {
      spaced: 'rgb(210 120 120)',
      comma: 'rgb(210, 120, 120)',
      alphaSpaced: 'rgb(210 120 120 / 0.4)',
      alphaComma: 'rgb(210, 120, 120, 0.4)',
      spacedUpperCase: 'RGB(210 120 120)',
      commaUpperCase: 'RGB(210, 120, 120)',
      rgba: 'rgba(210, 120, 120, 0.4)',
      alphaZero: 'rgb(210, 120, 120, 0)',
      alphaOne: 'rgb(210, 120, 120, 1)',
      excessWhitespace: 'rgb(210    120    120  /  1)',
    },
    invalid: {
      outOfRange: 'rgb(256, 120, 120, 1)',
      negative: 'rgb(-210 120 120)',
      missing: 'rgb(210 120)',
      tooMany: 'rgb(210, 120, 120, 1, 120)',
      alphaOutOfRange: 'rgb(210 120 120 / 1.5)',
      nonNumeric: 'rgb(a, b, c)',
      empty: 'rgb()',
    },
  },
  hex: {
    valid: {
      withoutHash: 'FFF',
      hex3: '#FF5',
      hex6: '#FF5500',
      hex8: '#FF5500A1',
    },
    invalid: {

    },
  },
}

/**
 * valid
 * spaced
 * comma
 * alpha spaced
 * alpha comma
 * named
 * spaced uppercased
 * comma uppercased
 * rgba
 * alphazero
 * alphaone
 * excess whitespace
 *
 * --------------------
 *
 * invalid
 * out of range
 * negative
 * missing values
 * too many values (4 args)
 * alpha out of range
 * non numeric
 * empty
 *
 */

describe('color init - rbg', () => {
  it.each([
    ['spaced', TEST_COLORS.rgb.valid.spaced],
    ['comma', TEST_COLORS.rgb.valid.comma],
    ['spaced uppercase', TEST_COLORS.rgb.valid.spacedUpperCase],
    ['comma uppercase', TEST_COLORS.rgb.valid.commaUpperCase],
    ['rgba', TEST_COLORS.rgb.valid.rgba],
    ['excess space', TEST_COLORS.rgb.valid.excessWhitespace],
  ])('should init from %s', (_, testColor) => {
    const color = hueyColor(testColor)
    expect(isHuey(color)).toBe(true)
  })

  it.each([
    ['spaced w/ alpha', TEST_COLORS.rgb.valid.alphaSpaced],
    ['comma w/ alpha', TEST_COLORS.rgb.valid.alphaComma],
  ])('should init from %s', (_, testColor) => {
    const color = hueyColor(testColor)
    expect(isHuey(color)).toBe(true)
    expect(color._a).toBeLessThan(1)
  })

  it('should init with zero alpha', () => {
    const color = hueyColor(TEST_COLORS.rgb.valid.alphaZero)
    expect(isHuey(color)).toBe(true)
    expect(color._a).toBe(0)
  })

  it('should init with full alpha', () => {
    const color = hueyColor(TEST_COLORS.rgb.valid.alphaOne)
    expect(isHuey(color)).toBe(true)
    expect(color._a).toBe(1)
  })
  it.each([
    ['out of range', TEST_COLORS.rgb.invalid.outOfRange],
    ['negative', TEST_COLORS.rgb.invalid.negative],
    ['missing values', TEST_COLORS.rgb.invalid.missing],
    ['non numerics', TEST_COLORS.rgb.invalid.nonNumeric],
    ['empty', TEST_COLORS.rgb.invalid.empty],
  ])('should fail when %s', (_, testColor) => {
    expect(() => hueyColor(testColor)).toThrowError(`invalid color provided: ${testColor}`)
  })
})
