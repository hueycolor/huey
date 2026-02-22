---
title: Regex Patterns
description: Regular expressions for color format validation
---

## Regex Patterns

Pre-defined regular expression patterns for validating and parsing color strings.

### Available Patterns

- `HEX_REGEX` - Matches hexadecimal color values (#RGB or #RRGGBB)
- `HSL_REGEX` - Matches HSL/HSLA color strings
- `OKLCH_REGEX` - Matches OKLCH color strings
- `RGB_REGEX` - Matches RGB/RGBA color strings

### Examples

```ts
import { HEX_REGEX, RGB_REGEX } from 'huey/utils'

const isHex = HEX_REGEX.test('#ff0000') // true
const isRgb = RGB_REGEX.test('rgb(255, 0, 0)') // true
```

### Pattern Details

Each regex pattern is designed to:
- Validate proper color format syntax
- Extract color channel values
- Handle both with and without alpha channels (where applicable)
