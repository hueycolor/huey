import type { HueyColor } from '@hueycolor/core'
import { getContext, setContext } from 'svelte'

export class HueyState {
  hue = $state(0)
  saturation = $state(0)
  lightness = $state(0)
  alpha = $state(1)
  colorValue = $state<HueyColor>(null as unknown as HueyColor)
  setColor: (color: string | HueyColor) => void = () => {}
}

export const HUEY_CONTEXT = Symbol('huey')

export function setHueyContext(state: HueyState): HueyState {
  setContext(HUEY_CONTEXT, state)
  return state
}

export function useHueyContext(): HueyState {
  const ctx = getContext<HueyState>(HUEY_CONTEXT)
  if (!ctx) {
    throw new Error('Huey components must be used within <HueyRoot>')
  }
  return ctx
}
