import type { HueyContext } from '@composables/use-huey-context'
import HueyRoot from '@components/huey-root.vue'
import { HUEY_CONTEXT } from '@composables/use-huey-context'
import { hueyColor, isHuey } from '@hueycolor/core'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { defineComponent, h, inject, nextTick, ref } from 'vue'

function makeHarness<T extends string | ReturnType<typeof hueyColor>>(initial: T) {
  const externalColor = ref<string | ReturnType<typeof hueyColor>>(initial)
  let captured: HueyContext | null = null

  const Probe = defineComponent({
    setup() {
      captured = inject(HUEY_CONTEXT) ?? null
      return () => null
    },
  })

  const Wrapper = defineComponent({
    setup() {
      return () => h(
        HueyRoot,
        {
          'modelValue': externalColor.value,
          'onUpdate:modelValue': (v: string | ReturnType<typeof hueyColor>) => {
            externalColor.value = v
          },
        },
        () => h(Probe),
      )
    },
  })

  mount(Wrapper)

  if (!captured) {
    throw new Error('HueyContext was not provided')
  }

  return { externalColor, ctx: captured as HueyContext }
}

async function nudgeHue(ctx: HueyContext, by = 10) {
  ctx.hue.value = (ctx.hue.value + by) % 360
  await nextTick()
}

describe('hueyRoot - format round-trip', () => {
  it('keeps a hex string as a hex string', async () => {
    const { externalColor, ctx } = makeHarness('#FF5500')
    await nudgeHue(ctx)

    expect(typeof externalColor.value).toBe('string')
    expect(externalColor.value as string).toMatch(/^#[0-9a-f]{6,8}$/i)
  })

  it('keeps an rgb string as an rgb string', async () => {
    const { externalColor, ctx } = makeHarness('rgb(210, 120, 120)')
    await nudgeHue(ctx)

    expect(typeof externalColor.value).toBe('string')
    expect(externalColor.value as string).toMatch(/^rgb/i)
  })

  it('keeps an hsl string as an hsl string', async () => {
    const { externalColor, ctx } = makeHarness('hsl(0, 50%, 50%)')
    await nudgeHue(ctx)

    expect(typeof externalColor.value).toBe('string')
    expect(externalColor.value as string).toMatch(/^hsl/i)
  })

  it('keeps an oklch string as an oklch string', async () => {
    const { externalColor, ctx } = makeHarness('oklch(0.5 0.15 180)')
    await nudgeHue(ctx)

    expect(typeof externalColor.value).toBe('string')
    expect(externalColor.value as string).toMatch(/^oklch/i)
  })

  it('preserves an rgba alpha component', async () => {
    const { externalColor, ctx } = makeHarness('rgba(210, 120, 120, 0.4)')
    await nudgeHue(ctx)

    expect(externalColor.value as string).toMatch(/^rgba/i)
    expect(externalColor.value as string).toContain('0.4')
  })

  it('keeps a HueyColor instance as a HueyColor instance', async () => {
    const { externalColor, ctx } = makeHarness(hueyColor('#FF5500'))
    await nudgeHue(ctx)

    expect(typeof externalColor.value).toBe('object')
    expect(isHuey(externalColor.value)).toBe(true)
  })

  it('falls back to a parsed color without crashing on invalid input', () => {
    expect(() => makeHarness('not-a-color')).not.toThrow()
  })
})
