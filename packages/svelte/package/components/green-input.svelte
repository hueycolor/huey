<script lang="ts">
  import type { GreenInputProps } from '@/types'
  import type { ArrowDirection } from '@hueycolor/core'
  import { getChannelBounds, hslToRgb, rgbToHsl } from '@hueycolor/core'
  import { useHueyContext } from '../context/huey-context.svelte'
  import ChannelInput from './internal/channel-input.svelte'

  let { ...rest }: GreenInputProps = $props()

  const { min, max } = getChannelBounds('g')
  const ctx = useHueyContext()

  const { g: initialG } = ctx.colorValue.toRgb()
  let greenRef = $state(initialG.toFixed(0))

  $effect(() => {
    const { g } = hslToRgb(ctx.hue, ctx.saturation, ctx.lightness)
    const rounded = g.toFixed(0)
    if (greenRef !== rounded) {
      greenRef = rounded
    }
  })

  function updateValue(input: HTMLInputElement, value: number) {
    input.value = String(value)
    greenRef = input.value

    const { r, b } = ctx.colorValue.toRgb()
    const { h, s, l } = rgbToHsl(r, value, b)
    ctx.hue = h
    ctx.saturation = s
    ctx.lightness = l
  }

  function handleEnter(e: KeyboardEvent | FocusEvent) {
    const input = e.target as HTMLInputElement
    const value = Number(input.value)

    if (Number.isNaN(value) || value < min || value > max) {
      input.value = greenRef
      return
    }

    updateValue(input, value)
  }

  function bumpValue(e: KeyboardEvent, direction: Exclude<ArrowDirection, 'left' | 'right'>) {
    const input = e.target as HTMLInputElement
    const current = Number(input.value)

    let step = e.shiftKey ? 10 : 1
    step *= direction === 'down' ? -1 : 1

    const base = Number.isNaN(current) ? Number(greenRef) : current
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

  const marker: Record<string, string> = { 'huey-input': 'green' }
</script>

<ChannelInput
  {...rest}
  {...marker}
  value={greenRef}
  onkeydown={handleKeydown}
  onblur={handleEnter}
/>
