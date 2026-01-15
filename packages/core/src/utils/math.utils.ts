import type { ColorChannel } from '@core/types'

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

export function getChannelBounds(key: ColorChannel): { min: number, max: number } {
  const min = 0
  let max = 0

  if (['r', 'g', 'b'].includes(key)) {
    max = 255
  }

  if (key === 'h') {
    max = 360
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

export function normalize(number: number, currentScaleMin: number, currentScaleMax: number, newScaleMin = 0, newScaleMax = 1) {
  const standardNormalization
    = (number - currentScaleMin) / (currentScaleMax - currentScaleMin)

  return (
    (newScaleMax - newScaleMin) * standardNormalization + newScaleMin
  )
}

export function roundToStep(value: number, step: number) {
  const decimals = step < 1 ? Math.ceil(-Math.log10(step)) : 0

  return Math.round(value * 10 ** decimals) / 10 ** decimals
}
