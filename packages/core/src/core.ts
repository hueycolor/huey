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

  const hC: HueyColorSymbol = {
    [HUEY_COLOR]: true,
    _l: Number(_l.toFixed(2)),
    _c: Number(_c.toFixed(2)),
    _h: Number(_h.toFixed(2)),
    _a,
    getFormat: () => _format,
    getOriginalInput: () => {
      return colorInput
    },
    getAlpha: () => hC._a,
    setAlpha: (v) => {
      hC._a = v

      return hC
    },
    desaturate: (v) => {
      hC._c = Math.max(0, hC._c - v)

      return hC
    },
    saturate: (v) => {
      hC._c = Math.max(0, hC._c + v)

      return hC
    },
    brighten: (v) => {
      hC._l = Math.min(1, hC._l + v)

      return hC
    },
    lighten: (v) => {
      hC._l = Math.min(1, hC._l + v)

      return hC
    },
    darken: (v) => {
      hC._l = Math.max(0, hC._l - v)

      return hC
    },
    contrastRatio: (c) => {
      const l1 = hC.getLuminance()
      const l2 = c.getLuminance()
      const lighter = Math.max(l1, l2)
      const darker = Math.min(l1, l2)

      return (lighter + 0.05) / (darker + 0.05)
    },
    getLuminance: () => {
      const [r, g, b] = convert([hC._l, hC._c, hC._h], OKLCH, sRGB)

      // https://www.w3.org/WAI/GL/wiki/Relative_luminance
      const linearize = (val: number) => {
        return val <= 0.03928 ? val / 12.92 : ((val + 0.055) / 1.055) ** 2.4
      }

      return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b)
    },
    getBrightness: () => {
      return hC._l
    },
    isLight: () => {
      return hC._l > 0.5
    },
    isDark: () => {
      return hC._l <= 0.5
    },
    toHsl: () => {
      const [r, g, b] = convert([hC._l, hC._c, hC._h], OKLCH, sRGB)
      const { h, s, l } = rgbToHsl(r, g, b)

      return { h: Number(h), s: Number(s.toFixed(2)), l: Number(l.toFixed(2)), a: hC._a }
    },
    toHslString: () => {
      const { h, s, l } = hC.toHsl()
      const a = hC._a

      if (a < 1) {
        return `hsla(${h.toFixed(0)}, ${s.toFixed(0)}%, ${l.toFixed(0)}%, ${a})`
      }

      return `hsl(${h.toFixed(0)}, ${s.toFixed(0)}%, ${l.toFixed(0)}%)`
    },
    toHex: () => {
      return hC.toHexString().replace('#', '')
    },
    toHexString: () => {
      const rgb = convert([hC._l, hC._c, hC._h], OKLCH, sRGB)

      return RGBToHex([...rgb, hC._a])
    },
    toRgb: () => {
      const [r, g, b] = convert([hC._l, hC._c, hC._h], OKLCH, sRGB)

      return {
        r: floatToByte(r),
        g: floatToByte(g),
        b: floatToByte(b),
        a: hC._a,
      }
    },
    toRgbString: () => {
      const rgb = convert([hC._l, hC._c, hC._h], OKLCH, sRGB)

      return serialize([...rgb, hC._a], sRGB) // returns 'rgb' if a = 1, 'rgba' if a < 1
    },
    toString: () => {
      if (_format === 'hex')
        return hC.toHexString()
      if (_format === 'hsl')
        return hC.toHslString()
      if (_format === 'oklch')
        return hC.toOklchString()
      if (_format === 'rgb')
        return hC.toRgbString()

      return ''
    },
    toOklchString: () => {
      const l = (hC._l * 100).toFixed(2)
      const c = hC._c.toFixed(2)
      const h = hC._h.toFixed(2)
      const a = hC._a

      if (a < 1) {
        return `oklch(${l}% ${c} ${h} / ${a})`
      }
      return `oklch(${l}% ${c} ${h})`
    },
    toDisplayP3: () => {
      const [_r, _g, _b] = convert([hC._l, hC._c, hC._h], OKLCH, DisplayP3)
      const r = _r.toFixed(2)
      const g = _g.toFixed(2)
      const b = _b.toFixed(2)
      const a = hC._a

      if (a < 1) {
        return `color(display-p3 ${r} ${g} ${b} / ${a})`
      }
      return `color(display-p3 ${r} ${g} ${b})`
    },
    toRec2020: () => {
      const [_r, _g, _b] = convert([hC._l, hC._c, hC._h], OKLCH, Rec2020)
      const r = _r.toFixed(2)
      const g = _g.toFixed(2)
      const b = _b.toFixed(2)
      const a = hC._a

      if (a < 1) {
        return `color(rec2020 ${r} ${g} ${b} / ${a})`
      }
      return `color(rec2020 ${r} ${g} ${b})`
    },
    randomize: () => {
      hC._l = Math.random()
      hC._c = Math.random() * 0.4
      hC._h = Math.random() * 360

      return hC
    },
    clone: () => {
      return hueyColor(hC.toOklchString())
    },
  }

  return hC as HueyColor
}
