import type { HueyColor } from '@hueycolor/core'
import type { HueyState } from '../src/lib/context/huey-context.svelte'
import { hueyColor, isHuey } from '@hueycolor/core'
import { flushSync, mount } from 'svelte'
import { describe, expect, it } from 'vitest'
import Harness from './harness.svelte'

interface Handle {
  state: HueyState
  getColor: () => string | HueyColor
}

function makeHarness(initial: string | HueyColor): Handle {
  let handle: Handle | null = null

  mount(Harness, {
    target: document.body,
    props: {
      initial,
      onReady: (h: Handle) => {
        handle = h
      },
    },
  })

  if (!handle) {
    throw new Error('Harness did not initialize')
  }

  return handle
}

function nudgeHue(handle: Handle, by = 10) {
  handle.state.hue = (handle.state.hue + by) % 360
  flushSync()
}

describe('hueyRoot - format round-trip', () => {
  it('keeps a hex string as a hex string', () => {
    const h = makeHarness('#FF5500')
    nudgeHue(h)

    const result = h.getColor()
    expect(typeof result).toBe('string')
    expect(result as string).toMatch(/^#[0-9a-f]{6,8}$/i)
  })

  it('keeps an rgb string as an rgb string', () => {
    const h = makeHarness('rgb(210, 120, 120)')
    nudgeHue(h)

    const result = h.getColor()
    expect(typeof result).toBe('string')
    expect(result as string).toMatch(/^rgb/i)
  })

  it('keeps an hsl string as an hsl string', () => {
    const h = makeHarness('hsl(0, 50%, 50%)')
    nudgeHue(h)

    const result = h.getColor()
    expect(typeof result).toBe('string')
    expect(result as string).toMatch(/^hsl/i)
  })

  it('keeps an oklch string as an oklch string', () => {
    const h = makeHarness('oklch(0.5 0.15 180)')
    nudgeHue(h)

    const result = h.getColor()
    expect(typeof result).toBe('string')
    expect(result as string).toMatch(/^oklch/i)
  })

  it('preserves an rgba alpha component', () => {
    const h = makeHarness('rgba(210, 120, 120, 0.4)')
    nudgeHue(h)

    const result = h.getColor() as string
    expect(result).toMatch(/^rgba/i)
    expect(result).toContain('0.4')
  })

  it('keeps a HueyColor instance as a HueyColor instance', () => {
    const h = makeHarness(hueyColor('#FF5500'))
    nudgeHue(h)

    const result = h.getColor()
    expect(typeof result).toBe('object')
    expect(isHuey(result)).toBe(true)
  })

  it('falls back to a parsed color without crashing on invalid input', () => {
    expect(() => makeHarness('not-a-color')).not.toThrow()
  })
})
