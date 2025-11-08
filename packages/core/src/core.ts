import type { HueyColor, HueyColorSymbol } from './types'
import { convert, deserialize, OKLCH, sRGB } from '@texel/color'
import { HUEY_COLOR } from './types'
import { getFormat, isHuey } from './utils/color.utils'

export function hueyColor(colorInput: string | HueyColor): HueyColor {
  if (isHuey(colorInput)) {
    return colorInput
  }

  const _format = getFormat(colorInput)

  if (_format === 'unknown') {
    throw new Error(`invalid color provided: ${colorInput}`)
  }

  const { coords } = deserialize(colorInput)
  const [, , , a] = coords
  const _a = a ?? 1
  const colorValues: number[] = _format === 'oklch' ? coords : convert(coords, sRGB, OKLCH)
  const [_l, _c, _h] = colorValues

  const hueyColor: HueyColorSymbol = {
    [HUEY_COLOR]: true,
    _l,
    _c,
    _h,
    _a,
    getFormat: () => _format,
    getOriginalInput: () => {
      return colorInput
    },
    getAlpha: () => hueyColor._a,
    setAlpha: (v) => {
      hueyColor._a = v

      return hueyColor
    },
    // TODO: add logic for these
    desaturate: (v) => {
      hueyColor._c -= v

      return hueyColor
    },
    saturate: (v) => {
      hueyColor._c += v

      return hueyColor
    },
    brighten: (_) => {
      return hueyColor
    },
    contrastRatio: (_) => {
      return 0
    },
    isValid: () => {
      return true
    },
    getLuminance: () => {
      return 0
    },
    getBrightness: () => {
      return 0
    },
    isLight: () => {
      return false
    },
    isDark: () => {
      return false
    },
    toHSL: () => {
      return { h: 0, s: 0, l: 0, a: 0 }
    },
    toHSLString: () => {
      return ''
    },
    toHex: () => {
      return ''
    },
    toHexString: () => {
      return ''
    },
    toHex8: () => {
      return ''
    },
    toHex8String: () => {
      return ''
    },
    toRgb: () => {
      return { r: 0, g: 0, b: 0, a: 0 }
    },
    toRgbString: () => {
      return ''
    },
    lighten: (_) => {
      return hueyColor
    },
    darken: (_) => {
      return hueyColor
    },
    randomize: () => {
      return hueyColor
    },
    clone: () => {
      return {
        ...hueyColor,
      }
    },
  }

  return hueyColor as HueyColor
}
