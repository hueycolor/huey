---
title: Color Utilities
description: Utility functions for color operations
---

## Color Utilities

Helper functions for working with colors and color formats.

### getFormat

Detects the format of a color string.

```ts
getFormat(color: string): 'hex' | 'rgb' | 'hsl' | 'oklch' | null
```

### Type Guards

Boolean functions to check color types and values:

- `isAlpha(value)` - Check if value is a valid alpha channel
- `isChroma(value)` - Check if value is a valid chroma value
- `isHex(value)` - Check if value is a valid hex color
- `isHsl(value)` - Check if value is a valid HSL color
- `isHue(value)` - Check if value is a valid hue value
- `isHuey(value)` - Check if value is a Huey color object
- `isOklch(value)` - Check if value is a valid OKLCH color
- `isPercentage(value)` - Check if value is a valid percentage
- `isRgb(value)` - Check if value is a valid RGB color

### Examples

```ts
import { getFormat, isHex } from 'huey/utils'

const format = getFormat('#ff0000') // 'hex'
const valid = isHex('#ff0000') // true
```
