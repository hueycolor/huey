<script lang="ts">
  import type { BlueInputProps } from '@/types'
  import type { ArrowDirection } from '@hueycolor/core'
  import { getChannelBounds, hslToRgb, rgbToHsl } from '@hueycolor/core'
  import { useHueyContext } from '../context/huey-context.svelte'
  import ChannelInput from './internal/channel-input.svelte'

  let { ...rest }: BlueInputProps = $props()

  const { min, max } = getChannelBounds('b')
  const ctx = useHueyContext()

  const { b: initialB } = ctx.colorValue.toRgb()
  let blueRef = $state(initialB.toFixed(0))

  $effect(() => {
    const { b } = hslToRgb(ctx.hue, ctx.saturation, ctx.lightness)
    const rounded = b.toFixed(0)
    if (blueRef !== rounded) {
      blueRef = rounded
    }
  })

  function updateValue(input: HTMLInputElement, value: number) {
    input.value = String(value)
    blueRef = input.value

    const { r, g } = ctx.colorValue.toRgb()
    const { h, s, l } = rgbToHsl(r, g, value)
    ctx.hue = h
    ctx.saturation = s
    ctx.lightness = l
  }

  function handleEnter(e: KeyboardEvent | FocusEvent) {
    const input = e.target as HTMLInputElement
    const value = Number(input.value)

    if (Number.isNaN(value) || value < min || value > max) {
      input.value = blueRef
      return
    }

    updateValue(input, value)
  }

  function bumpValue(e: KeyboardEvent, direction: Exclude<ArrowDirection, 'left' | 'right'>) {
    const input = e.target as HTMLInputElement
    const current = Number(input.value)

    let step = e.shiftKey ? 10 : 1
    step *= direction === 'down' ? -1 : 1

    const base = Number.isNaN(current) ? Number(blueRef) : current
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

  const marker: Record<string, string> = { 'huey-input': 'blue' }
</script>

<ChannelInput
  {...rest}
  {...marker}
  value={blueRef}
  onkeydown={handleKeydown}
  onblur={handleEnter}
/>
