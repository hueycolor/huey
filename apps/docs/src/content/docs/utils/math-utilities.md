---
title: Math Utilities
description: Mathematical utility functions for color calculations
---

## Math Utilities

Helper functions for mathematical operations used in color calculations.

### clamp

Clamp a value between minimum and maximum bounds.

```ts
clamp(value: number, min: number, max: number): number
```

### getChannelBounds

Get the minimum and maximum values for a specific color channel.

```ts
type Channel = 'r' | 'g' | 'b' | 'h' | 's' | 'l' | 'a'
getChannelBounds(channel: Channel): { min: number, max: number }
```

Returns the valid range for each color channel:
- RGB: 0-255
- Hue: 0-360
- Saturation/Lightness: 0-100
- Alpha: 0-1

### truncColorValue

Parse and truncate color value strings to their valid range.

```ts
truncColorValue(value: string, channel: Channel): number
```

### normalize

Normalize a value from one scale to another.

```ts
normalize(
  value: number,
  fromMin: number,
  fromMax: number,
  toMin: number,
  toMax: number
): number
```

### roundToStep

Round a value to the nearest step increment.

```ts
roundToStep(value: number, step: number): number
```

### Examples

```ts
import { clamp, normalize, roundToStep } from 'huey/utils'

// Clamp a value
const clamped = clamp(300, 0, 255) // 255

// Normalize from one range to another
const normalized = normalize(50, 0, 100, 0, 1) // 0.5

// Round to nearest step
const rounded = roundToStep(23, 5) // 25
```
