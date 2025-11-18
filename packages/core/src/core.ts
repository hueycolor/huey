import type { HueyColor, HueyColorSymbol } from './types'
import { convert, deserialize, OKLCH, serialize, sRGB } from '@texel/color'
import { HUEY_COLOR } from './types'
import { getFormat, isHuey, parseHSL, parseOKLCH } from './utils'

export function hueyColor(colorInput: string | HueyColor): HueyColor {
  if (isHuey(colorInput)) {
    return colorInput
  }

  const _format = getFormat(colorInput)

  if (_format === 'unknown') {
    throw new Error(`invalid color provided: ${colorInput}`)
  }

  let coords: number[]
  let _a: number

  if (_format === 'hsl') {
    const parsed = parseHSL(colorInput)

    if (!parsed) {
      throw new Error(`invalid color provided: ${colorInput}`)
    }

    coords = parsed.coords
    _a = coords[3] ?? 1
  }
  else if (_format === 'oklch') {
    const parsed = parseOKLCH(colorInput)

    if (!parsed) {
      throw new Error(`invalid color provided: ${colorInput}`)
    }

    coords = parsed.coords
    _a = coords[3] ?? 1
  }
  else {
    const deserialized = deserialize(colorInput)
    coords = deserialized.coords
    _a = coords[3] ?? 1
  }

  const colorValues: number[] = _format === 'oklch' ? coords.slice(0, 3) : convert(coords.slice(0, 3), sRGB, OKLCH)
  const [_l, _c, _h] = colorValues // oklch

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
      const [r, g, b] = convert([hueyColor._l, hueyColor._c, hueyColor._h], OKLCH, sRGB)

      return {
        r,
        g,
        b,
        a: hueyColor._a,
      }
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
