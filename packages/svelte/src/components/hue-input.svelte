<script lang="ts">
  import type { HueInputProps } from '@/types'
  import type { ArrowDirection } from '@hueycolor/core'
  import { getChannelBounds } from '@hueycolor/core'
  import { useHueyContext } from '../context/huey-context.svelte'
  import ChannelInput from './internal/channel-input.svelte'

  let { ...rest }: HueInputProps = $props()

  const { min, max } = getChannelBounds('h')
  const ctx = useHueyContext()

  let hueRef = $state(ctx.hue.toFixed(0))

  $effect(() => {
    const rounded = ctx.hue.toFixed(0)
    if (hueRef !== rounded) {
      hueRef = rounded
    }
  })

  function updateValue(input: HTMLInputElement, value: number) {
    input.value = String(value)
    hueRef = input.value
    ctx.hue = value
  }

  function handleEnter(e: KeyboardEvent | FocusEvent) {
    const input = e.target as HTMLInputElement
    const value = Number(input.value)

    if (Number.isNaN(value) || value < min || value > max) {
      input.value = hueRef
      return
    }

    updateValue(input, value)
  }

  function bumpValue(e: KeyboardEvent, direction: Exclude<ArrowDirection, 'left' | 'right'>) {
    const input = e.target as HTMLInputElement
    const current = Number(input.value)

    let step = e.shiftKey ? 10 : 1
    step *= direction === 'down' ? -1 : 1

    const base = Number.isNaN(current) ? Number(hueRef) : current
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

  const marker: Record<string, string> = { 'huey-input': 'hue' }
</script>

<ChannelInput
  {...rest}
  {...marker}
  value={hueRef}
  onkeydown={handleKeydown}
  onblur={handleEnter}
/>
