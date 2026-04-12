<script lang="ts" module>
  import type { HTMLInputAttributes } from 'svelte/elements'

  export interface SaturationInputProps extends HTMLInputAttributes {}
</script>

<script lang="ts">
  import type { ArrowDirection } from '@hueycolor/core'
  import { getChannelBounds } from '@hueycolor/core'
  import { useHueyContext } from '../context/huey-context.svelte'
  import ChannelInput from './internal/channel-input.svelte'

  let { ...rest }: SaturationInputProps = $props()

  const { min, max } = getChannelBounds('s')
  const ctx = useHueyContext()

  let saturationRef = $state(ctx.saturation.toFixed(0))

  $effect(() => {
    const rounded = ctx.saturation.toFixed(0)
    if (saturationRef !== rounded) {
      saturationRef = rounded
    }
  })

  function updateValue(input: HTMLInputElement, value: number) {
    input.value = String(value)
    saturationRef = input.value
    ctx.saturation = value
  }

  function handleEnter(e: KeyboardEvent | FocusEvent) {
    const input = e.target as HTMLInputElement
    const value = Number(input.value)

    if (Number.isNaN(value) || value < min || value > max) {
      input.value = saturationRef
      return
    }

    updateValue(input, value)
  }

  function bumpValue(e: KeyboardEvent, direction: Exclude<ArrowDirection, 'left' | 'right'>) {
    const input = e.target as HTMLInputElement
    const current = Number(input.value)

    let step = e.shiftKey ? 10 : 1
    step *= direction === 'down' ? -1 : 1

    const base = Number.isNaN(current) ? Number(saturationRef) : current
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

  const marker: Record<string, string> = { 'huey-input': 'saturation' }
</script>

<ChannelInput
  {...rest}
  {...marker}
  value={saturationRef}
  onkeydown={handleKeydown}
  onblur={handleEnter}
/>
