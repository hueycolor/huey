# @hueycolor/core

Core color utilities powering `@hueycolor/vue` and `@hueycolor/svelte`. Can also be used standalone.

## Installation

```bash
npm install @hueycolor/core
```

## Usage

```ts
import { hueyColor } from '@hueycolor/core'

const color = hueyColor('#3b82f6')

color.toHslString()   // 'hsl(217, 91%, 60%)'
color.toRgbString()   // 'rgb(59, 130, 246)'
color.toHexString()   // '#3b82f6'
color.toOklchString() // 'oklch(62.80% 0.18 259.81)'
```

Accepts hex, rgb, hsl, and oklch strings.

## API

### `hueyColor(input)`

Creates a `HueyColor` instance from a color string or an existing `HueyColor`.

```ts
hueyColor('#ff0000')
hueyColor('rgb(255, 0, 0)')
hueyColor('hsl(0, 100%, 50%)')
hueyColor('oklch(62% 0.25 29)')
```

### Conversion

| Method | Returns |
|---|---|
| `toHex()` | Hex string without `#` |
| `toHexString()` | Hex string with `#` |
| `toRgb()` | `{ r, g, b, a }` |
| `toRgbString()` | `'rgb(...)'` / `'rgba(...)'` |
| `toHsl()` | `{ h, s, l, a }` |
| `toHslString()` | `'hsl(...)'` / `'hsla(...)'` |
| `toOklchString()` | `'oklch(...)'` |
| `toDisplayP3()` | `'color(display-p3 ...)'` |
| `toRec2020()` | `'color(rec2020 ...)'` |
| `toString()` | String in the original input format |

### Manipulation

All manipulation methods return a new `HueyColor`. The original is never mutated.

| Method | Description |
|---|---|
| `setHue(h)` | Set hue (0–360) |
| `setSaturation(s)` | Set saturation (0–100) |
| `setLightness(l)` | Set lightness (0–100) |
| `setAlpha(a)` | Set alpha (0–1) |
| `lighten(amount)` | Increase lightness |
| `darken(amount)` | Decrease lightness |
| `brighten(amount)` | Increase brightness |
| `saturate(amount)` | Increase saturation |
| `desaturate(amount)` | Decrease saturation |
| `randomize()` | Return a random color |
| `clone()` | Return an identical copy |

### Inspection

| Method | Returns |
|---|---|
| `getAlpha()` | Alpha value (0–1) |
| `getLuminance()` | Relative luminance (0–1) |
| `getBrightness()` | OKLCH lightness (0–1) |
| `isLight()` | `true` if lightness > 0.5 |
| `isDark()` | `true` if lightness ≤ 0.5 |
| `contrastRatio(other)` | WCAG contrast ratio |
| `getFormat()` | Original input format: `'hex' \| 'rgb' \| 'hsl' \| 'oklch'` |

## License

MIT
