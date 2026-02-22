---
title: Keyboard Utilities
description: Utility functions for keyboard interactions
---

## Keyboard Utilities

Helper functions for handling keyboard input and navigation.

### resolveArrowDirection

Map arrow key events to directional values.

```ts
type Direction = 'up' | 'down' | 'left' | 'right'
resolveArrowDirection(event: KeyboardEvent): Direction | null
```

Returns the arrow direction or `null` if the key is not an arrow key.

### bumpColorValue

Increment or decrement a color value based on arrow key direction.

```ts
bumpColorValue(
  value: number,
  direction: Direction,
  options?: {
    min?: number
    max?: number
    step?: number
    largeStep?: number
  }
): number
```

Adjusts values with keyboard controls:
- Arrow keys: increment/decrement by `step` (default: 1)
- Shift + Arrow keys: increment/decrement by `largeStep` (default: 10)

### Examples

```ts
import { resolveArrowDirection, bumpColorValue } from 'huey/utils'

input.addEventListener('keydown', (e) => {
  const direction = resolveArrowDirection(e)
  if (direction) {
    const newValue = bumpColorValue(currentValue, direction, {
      min: 0,
      max: 360,
      step: 1,
      largeStep: 10
    })
  }
})
```
