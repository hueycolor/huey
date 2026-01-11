import type { InjectionKey, Ref } from 'vue'
import { inject } from 'vue'

export interface HueyContext {
  hue: Ref<number>
  saturation: Ref<number>
  lightness: Ref<number>
  alpha: Ref<number>
}

export const HUEY_CONTEXT: InjectionKey<HueyContext> = Symbol('huey')

export function useHueyContext(): HueyContext {
  const ctx = inject(HUEY_CONTEXT)
  if (!ctx) {
    throw new Error('Huey components must be used within <HueyRoot>')
  }
  return ctx
}
