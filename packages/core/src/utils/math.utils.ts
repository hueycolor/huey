import type { ColorChannel } from '@core/types'

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

export function getColorBounds(key: ColorChannel): { min: number, max: number } {
  const min = 0
  let max = 0

  if (['r', 'g', 'b'].includes(key)) {
    max = 255
  }

  if (key === 'h') {
    max = 359
  }

  if (['s', 'l', 'a'].includes(key)) {
    max = 100
  }

  return {
    min,
    max,
  }
}

export function truncColorValue(value: string): number {
  return Math.trunc(Number(value.replace(/[%°]/g, '').trim()))
}
