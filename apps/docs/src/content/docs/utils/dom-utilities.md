---
title: DOM Utilities
description: Utility functions for DOM manipulation and measurements
---

## DOM Utilities

Helper functions for working with the DOM, positioning, and events.

### getScrollXY

Get the current scroll position of the page.

```ts
getScrollXY(): { x: number, y: number }
```

Returns an object with `x` and `y` scroll coordinates.

### getAbsolutePosition

Get an element's absolute position relative to the document.

```ts
getAbsolutePosition(element: HTMLElement): { x: number, y: number }
```

Returns the element's coordinates accounting for scroll position.

### getPageXYFromEvent

Extract page coordinates from mouse or touch events.

```ts
getPageXYFromEvent(event: MouseEvent | TouchEvent): { x: number, y: number }
```

Normalizes mouse and touch events to return consistent page coordinates.

### Examples

```ts
import { getAbsolutePosition, getPageXYFromEvent } from 'huey/utils'

const element = document.querySelector('.color-picker')
const position = getAbsolutePosition(element)

element.addEventListener('mousedown', (e) => {
  const { x, y } = getPageXYFromEvent(e)
  // Handle interaction
})
```
