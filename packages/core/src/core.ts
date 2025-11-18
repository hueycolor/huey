import type { HueyColor, HueyColorSymbol } from './types'
import { convert, deserialize, OKLCH, RGBToHex, serialize, sRGB } from '@texel/color'
import { HUEY_COLOR } from './types'
import { getFormat, isHuey, parseHSL, parseOKLCH, rgbToHsl } from './utils'

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
    desaturate: (v) => {
      hueyColor._c = Math.max(0, hueyColor._c - v)

      return hueyColor
    },
    saturate: (v) => {
      hueyColor._c = Math.max(0, hueyColor._c + v)

      return hueyColor
    },
    brighten: (_) => { // TODO:
      return hueyColor
    },
    contrastRatio: (_) => { // TODO:
      return 0
    },
    isValid: () => { // TODO:
      return true
    },
    getLuminance: () => { // TODO:
      return 0
    },
    getBrightness: () => { // TODO:
      return 0
    },
    isLight: () => { // TODO:
      return false
    },
    isDark: () => { // TODO:
      return false
    },
    toHsl: () => {
      const [r, g, b] = convert([hueyColor._l, hueyColor._c, hueyColor._h], OKLCH, sRGB)
      const hsl = rgbToHsl(r, g, b)

      return { ...hsl, a: hueyColor._a }
    },
    toHslString: () => {
      const { h, s, l } = hueyColor.toHsl()
      const a = hueyColor._a

      if (a < 1) {
        return `hsla(${h.toFixed(0)}, ${s.toFixed(0)}%, ${l.toFixed(0)}%, ${a})`
      }

      return `hsl(${h.toFixed(0)}, ${s.toFixed(0)}%, ${l.toFixed(0)}%)`
    },
    toHex: () => {
      return hueyColor.toHexString().replace('#', '')
    },
    toHexString: () => {
      const rgb = convert([hueyColor._l, hueyColor._c, hueyColor._h], OKLCH, sRGB)

      return RGBToHex([...rgb, hueyColor._a])
    },
    toRgb: () => {
      const [r, g, b] = convert([hueyColor._l, hueyColor._c, hueyColor._h], OKLCH, sRGB)

      return { r, g, b, a: hueyColor._a }
    },
    toRgbString: () => {
      const rgb = convert([hueyColor._l, hueyColor._c, hueyColor._h], OKLCH, sRGB)

      return serialize([...rgb, hueyColor._a], sRGB) // returns 'rgb' if a = 1, 'rgba' if a < 1
    },
    lighten: (_) => { // TODO:
      return hueyColor
    },
    darken: (_) => { // TODO:
      return hueyColor
    },
    randomize: () => { // TODO:
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
