---
title: Color Conversion
description: Functions for converting between color spaces
---

## Color Conversion

Utilities for converting colors between different color spaces and parsing color strings.

### Color Space Conversions

Convert between RGB, HSL, and HSV color spaces:

- `hslToHsv(h, s, l)` - Convert HSL to HSV
- `hsvToHsl(h, s, v)` - Convert HSV to HSL
- `hslToRgb(h, s, l)` - Convert HSL to RGB
- `rgbToHsl(r, g, b)` - Convert RGB to HSL

### Color Parsers

Parse color strings into structured objects:

- `parseHSL(color)` - Parse HSL/HSLA color strings
- `parseOKLCH(color)` - Parse OKLCH color strings

### Examples

```ts
import { hslToRgb, parseHSL } from 'huey/utils'

// Convert HSL to RGB
const rgb = hslToRgb(180, 50, 50)
// { r: 64, g: 191, b: 191 }

// Parse HSL string
const parsed = parseHSL('hsl(180, 50%, 50%)')
// { h: 180, s: 50, l: 50, a: 1 }
```
