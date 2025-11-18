import type { HueyColor, HueyColorSymbol } from './types'
import { convert, deserialize, DisplayP3, floatToByte, OKLCH, Rec2020, RGBToHex, serialize, sRGB } from '@texel/color'
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
    brighten: (v) => {
      hueyColor._l = Math.min(1, hueyColor._l + v)

      return hueyColor
    },
    lighten: (v) => {
      hueyColor._l = Math.min(1, hueyColor._l + v)

      return hueyColor
    },
    darken: (v) => {
      hueyColor._l = Math.max(0, hueyColor._l - v)

      return hueyColor
    },
    contrastRatio: (secondColor) => {
      const l1 = hueyColor.getLuminance()
      const l2 = secondColor.getLuminance()
      const lighter = Math.max(l1, l2)
      const darker = Math.min(l1, l2)

      return (lighter + 0.05) / (darker + 0.05)
    },
    getLuminance: () => {
      const [r, g, b] = convert([hueyColor._l, hueyColor._c, hueyColor._h], OKLCH, sRGB)

      // https://www.w3.org/WAI/GL/wiki/Relative_luminance
      const linearize = (val: number) => {
        return val <= 0.03928 ? val / 12.92 : ((val + 0.055) / 1.055) ** 2.4
      }

      return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b)
    },
    getBrightness: () => {
      return hueyColor._l
    },
    isLight: () => {
      return hueyColor._l > 0.5
    },
    isDark: () => {
      return hueyColor._l <= 0.5
    },
    toHsl: () => {
      const [r, g, b] = convert([hueyColor._l, hueyColor._c, hueyColor._h], OKLCH, sRGB)
      const { h, s, l } = rgbToHsl(r, g, b)

      return { h: Number(h), s: Number(s.toFixed(2)), l: Number(l.toFixed(2)), a: hueyColor._a }
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

      return {
        r: floatToByte(r),
        g: floatToByte(g),
        b: floatToByte(b),
        a: hueyColor._a,
      }
    },
    toRgbString: () => {
      const rgb = convert([hueyColor._l, hueyColor._c, hueyColor._h], OKLCH, sRGB)

      return serialize([...rgb, hueyColor._a], sRGB) // returns 'rgb' if a = 1, 'rgba' if a < 1
    },
    toString: () => {
      if (_format === 'hex')
        return hueyColor.toHexString()
      if (_format === 'hsl')
        return hueyColor.toHslString()
      if (_format === 'oklch')
        return hueyColor.toOklchString()
      if (_format === 'rgb')
        return hueyColor.toRgbString()

      return ''
    },
    toOklchString: () => {
      const l = (hueyColor._l * 100).toFixed(2)
      const c = hueyColor._c.toFixed(2)
      const h = hueyColor._h.toFixed(2)
      const a = hueyColor._a

      if (a < 1) {
        return `oklch(${l}% ${c} ${h} / ${a})`
      }
      return `oklch(${l}% ${c} ${h})`
    },
    toDisplayP3: () => {
      const [_r, _g, _b] = convert([hueyColor._l, hueyColor._c, hueyColor._h], OKLCH, DisplayP3)
      const r = _r.toFixed(2)
      const g = _g.toFixed(2)
      const b = _b.toFixed(2)
      const a = hueyColor._a

      if (a < 1) {
        return `color(display-p3 ${r} ${g} ${b} / ${a})`
      }
      return `color(display-p3 ${r} ${g} ${b})`
    },
    toRec2020: () => {
      const [_r, _g, _b] = convert([hueyColor._l, hueyColor._c, hueyColor._h], OKLCH, Rec2020)
      const r = _r.toFixed(2)
      const g = _g.toFixed(2)
      const b = _b.toFixed(2)
      const a = hueyColor._a

      if (a < 1) {
        return `color(rec2020 ${r} ${g} ${b} / ${a})`
      }
      return `color(rec2020 ${r} ${g} ${b})`
    },
    randomize: () => {
      hueyColor._l = Math.random()
      hueyColor._c = Math.random() * 0.4
      hueyColor._h = Math.random() * 360

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
