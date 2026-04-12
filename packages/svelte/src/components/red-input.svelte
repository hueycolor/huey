<script lang="ts" module>
  import type { HTMLInputAttributes } from 'svelte/elements'

  export interface RedInputProps extends HTMLInputAttributes {}
</script>

<script lang="ts">
  import type { ArrowDirection } from '@hueycolor/core'
  import { getChannelBounds, hslToRgb, rgbToHsl } from '@hueycolor/core'
  import { useHueyContext } from '../context/huey-context.svelte'
  import ChannelInput from './internal/channel-input.svelte'

  let { ...rest }: RedInputProps = $props()

  const { min, max } = getChannelBounds('r')
  const ctx = useHueyContext()

  const { r: initialR } = ctx.colorValue.toRgb()
  let redRef = $state(initialR.toFixed(0))

  $effect(() => {
    const { r } = hslToRgb(ctx.hue, ctx.saturation, ctx.lightness)
    const rounded = r.toFixed(0)
    if (redRef !== rounded) {
      redRef = rounded
    }
  })

  function updateValue(input: HTMLInputElement, value: number) {
    input.value = String(value)
    redRef = input.value

    const { g, b } = ctx.colorValue.toRgb()
    const { h, s, l } = rgbToHsl(value, g, b)
    ctx.hue = h
    ctx.saturation = s
    ctx.lightness = l
  }

  function handleEnter(e: KeyboardEvent | FocusEvent) {
    const input = e.target as HTMLInputElement
    const value = Number(input.value)

    if (Number.isNaN(value) || value < min || value > max) {
      input.value = redRef
      return
    }

    updateValue(input, value)
  }

  function bumpValue(e: KeyboardEvent, direction: Exclude<ArrowDirection, 'left' | 'right'>) {
    const input = e.target as HTMLInputElement
    const current = Number(input.value)

    let step = e.shiftKey ? 10 : 1
    step *= direction === 'down' ? -1 : 1

    const base = Number.isNaN(current) ? Number(redRef) : current
    const value = Math.min(max, Math.max(min, base + step))

    updateValue(input, value)
  }

  function handleKeydown(e: KeyboardEvent) {
    switch (e.key) {
      case 'Enter':
        e.preventDefault()
        handleEnter(e)
        break
      case 'ArrowUp':
        e.preventDefault()
        bumpValue(e, 'up')
        break
      case 'ArrowDown':
        e.preventDefault()
        bumpValue(e, 'down')
        break
    }
  }

  const marker: Record<string, string> = { 'huey-input': 'red' }
</script>

<ChannelInput
  {...rest}
  {...marker}
  value={redRef}
  onkeydown={handleKeydown}
  onblur={handleEnter}
/>
