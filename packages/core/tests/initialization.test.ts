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
      hex3: '#FF5',
      hex6: '#FF5500',
      hex8: '#FF5500A1',
    },
    invalid: {
      hexChars: '#GG5500',
      hex4: '#FF00',
      hex5: '#FF00F',
      hex7: '#FF00FF0',
      withoutHash: 'FFF',
      hashOnly: '#',
    },
  },
}

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

describe('color init - hex', () => {
  it.each([
    ['hex3', TEST_COLORS.hex.valid.hex3],
    ['hex6', TEST_COLORS.hex.valid.hex6],
    ['hex8', TEST_COLORS.hex.valid.hex8],
  ])('should init from %s', (_, testColor) => {
    const color = hueyColor(testColor)
    expect(isHuey(color)).toBe(true)
  })

  it.each([
    ['hex chars', TEST_COLORS.hex.invalid.hexChars],
    ['hex4', TEST_COLORS.hex.invalid.hex4],
    ['hex5', TEST_COLORS.hex.invalid.hex5],
    ['hex7', TEST_COLORS.hex.invalid.hex7],
    ['without hash', TEST_COLORS.hex.invalid.withoutHash],
    ['hash only', TEST_COLORS.hex.invalid.hashOnly],
  ])('should fail when %s', (_, testColor) => {
    expect(() => hueyColor(testColor)).toThrowError(`invalid color provided: ${testColor}`)
  })
})
