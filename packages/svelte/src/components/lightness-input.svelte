<script lang="ts">
  import type { LightnessInputProps } from '@/types'
  import type { ArrowDirection } from '@hueycolor/core'
  import { getChannelBounds } from '@hueycolor/core'
  import { useHueyContext } from '../context/huey-context.svelte'
  import ChannelInput from './internal/channel-input.svelte'

  let { ...rest }: LightnessInputProps = $props()

  const { min, max } = getChannelBounds('l')
  const ctx = useHueyContext()

  let lightnessRef = $state(ctx.lightness.toFixed(0))

  $effect(() => {
    const rounded = ctx.lightness.toFixed(0)
    if (lightnessRef !== rounded) {
      lightnessRef = rounded
    }
  })

  function updateValue(input: HTMLInputElement, value: number) {
    input.value = String(value)
    lightnessRef = input.value
    ctx.lightness = value
  }

  function handleEnter(e: KeyboardEvent | FocusEvent) {
    const input = e.target as HTMLInputElement
    const value = Number(input.value)

    if (Number.isNaN(value) || value < min || value > max) {
      input.value = lightnessRef
      return
    }

    updateValue(input, value)
  }

  function bumpValue(e: KeyboardEvent, direction: Exclude<ArrowDirection, 'left' | 'right'>) {
    const input = e.target as HTMLInputElement
    const current = Number(input.value)

    let step = e.shiftKey ? 10 : 1
    step *= direction === 'down' ? -1 : 1

    const base = Number.isNaN(current) ? Number(lightnessRef) : current
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

  const marker: Record<string, string> = { 'huey-input': 'lightness' }
</script>

<ChannelInput
  {...rest}
  {...marker}
  value={lightnessRef}
  onkeydown={handleKeydown}
  onblur={handleEnter}
/>
