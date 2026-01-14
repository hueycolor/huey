import type { HueyColor } from '@huey/core'
import type { InjectionKey, Ref } from 'vue'
import { inject } from 'vue'

export interface HueyContext {
  hue: Ref<number>
  saturation: Ref<number>
  lightness: Ref<number>
  alpha: Ref<number>
  setColor: (color: string | HueyColor) => void
  colorValue: Ref<HueyColor>
}

export const HUEY_CONTEXT: InjectionKey<HueyContext> = Symbol('huey')

export function useHueyContext(): HueyContext {
  const ctx = inject(HUEY_CONTEXT)
  if (!ctx) {
    throw new Error('Huey components must be used within <HueyRoot>')
  }
  return ctx
}
