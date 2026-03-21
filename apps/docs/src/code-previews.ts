export interface CodePreviewTab {
  label: string
  value: string
  code: string
}

export const coreLibCodePreviews: CodePreviewTab[] = [
  {
    label: 'Color Parsing',
    value: 'color-parsing',
    code: `import { hueyColor } from '@hueycolor/core'

const hex = hueyColor('#ff6b35')
const rgb = hueyColor('rgb(255, 107, 53)')
const hsl = hueyColor('hsl(18, 100%, 60%)')
const oklch = hueyColor('oklch(72% 0.19 45)')

hex.toRgbString()
// → 'rgb(255, 107, 53)'`,
  },
  {
    label: 'Wide Gamut Output',
    value: 'wide-gamut',
    code: `import { hueyColor } from '@hueycolor/core'

const color = hueyColor('#ff6b35')

// Standard gamut
color.toHexString()   // → '#ff6b35'
color.toRgbString()   // → 'rgb(255, 107, 53)'
color.toHslString()   // → 'hsl(18, 100%, 60%)'

// Wide gamut
color.toOklchString() // → 'oklch(72% 0.19 45)'
color.toDisplayP3()   // → 'color(display-p3 ...)'
color.toRec2020()     // → 'color(rec2020 ...)'`,
  },
  {
    label: 'OKLCH-based Accuracy',
    value: 'oklch-accuracy',
    code: `import { hueyColor } from '@hueycolor/core'

// All operations use OKLCH internally
// for perceptually uniform results
const color = hueyColor('#ff6b35')

// Lightness adjustments are perceptually even
color.lighten(0.1).toHexString()
color.lighten(0.2).toHexString()
color.lighten(0.3).toHexString()`,
  },
  {
    label: 'Immutable API',
    value: 'immutable-api',
    code: `import { hueyColor } from '@hueycolor/core'

const brand = hueyColor('#ff6b35')

// Every method returns a new color
const lighter = brand.lighten(0.1)
const darker  = brand.darken(0.1)

// Chain operations
const variant = brand
  .setHue(200)
  .saturate(0.1)
  .lighten(0.05)

// Original is unchanged
brand.toHexString()   // → '#ff6b35'
variant.toHexString() // → '#2fa0d4'`,
  },
  {
    label: 'Accessibility Utils',
    value: 'accessibility',
    code: `import { hueyColor } from '@hueycolor/core'

const bg = hueyColor('#1a1a2e')
const text = hueyColor('#e0e0e0')

// WCAG contrast ratio
bg.contrastRatio(text) // → 12.5

// Quick lightness checks
bg.isDark()   // → true
text.isLight() // → true

// Relative luminance (W3C)
bg.getLuminance() // → 0.02`,
  },
  {
    label: 'Color Manipulation',
    value: 'manipulation',
    code: `import { hueyColor } from '@hueycolor/core'

const color = hueyColor('#ff6b35')

color.lighten(0.1).toHexString()
color.darken(0.1).toHexString()
color.saturate(0.2).toHexString()
color.desaturate(0.1).toHexString()
color.setHue(200).toHexString()
color.setLightness(80).toHexString()`,
  },
]
