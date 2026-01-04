import type { ArrowDirection } from '@core/types'

export function resolveArrowDirection(e: KeyboardEvent): ArrowDirection {
  const arrowMap: Record<string, ArrowDirection> = {
    ArrowUp: 'up',
    ArrowDown: 'down',
    ArrowLeft: 'left',
    ArrowRight: 'right',
  }

  return arrowMap[e.code]
}

export function bumpColorValue(value: number, direction: Omit<ArrowDirection, 'left' | 'right'> | null): number {
  let multiplier = 0

  switch (direction) {
    case 'down':
      multiplier = -1
      break
    case 'up':
      multiplier = 1
      break
  }

  return value + multiplier
}
