<script lang="ts" module>
  import type { HTMLInputAttributes } from 'svelte/elements'

  export interface HexInputProps extends HTMLInputAttributes {
    alpha?: boolean
  }
</script>

<script lang="ts">
  import type { ArrowDirection } from '@hueycolor/core'
  import { hueyColor, isHex } from '@hueycolor/core'
  import { useHueyContext } from '../context/huey-context.svelte'

  let { alpha = true, id, ...rest }: HexInputProps = $props()

  const ctx = useHueyContext()

  function formatHex(hex: string) {
    return alpha ? hex : hex.slice(0, 6)
  }

  let hexRef = $state(formatHex(ctx.colorValue.toHex().toUpperCase()))

  $effect(() => {
    hexRef = formatHex(ctx.colorValue.toHex().toUpperCase())
  })

  function updateValue(input: HTMLInputElement, value: string) {
    input.value = String(value)
    hexRef = input.value.toUpperCase()

    const newColor = hueyColor(hexRef)
    const { h, s, l } = newColor.toHsl()

    if (s > 0) {
      ctx.hue = h
    }
    ctx.saturation = s
    ctx.lightness = l

    if (alpha) {
      ctx.alpha = newColor.getAlpha()
    }
  }

  function handleEnter(e: KeyboardEvent | FocusEvent) {
    const input = e.target as HTMLInputElement
    const value = input.value

    if (!isHex(value)) {
      input.value = hexRef
      return
    }

    updateValue(input, value)
  }

  function bumpHexPair(pair: string, step: number): string {
    const num = Number.parseInt(pair, 16)

    if ((num + step) < 0) {
      return '00'
    }

    if ((num + step) > 255) {
      return 'FF'
    }

    const bumped = (num + step + 256) % 256
    return bumped.toString(16).toUpperCase().padStart(2, '0')
  }

  function bumpValue(e: KeyboardEvent, direction: Exclude<ArrowDirection, 'left' | 'right'>) {
    const input = e.target as HTMLInputElement
    const rawValue = input.value
    const slicedValue = rawValue.replace(/^#/, '').slice(0, 6)

    if (!isHex(rawValue) && isHex(slicedValue)) {
      input.value = slicedValue
      return
    }

    if (!isHex(slicedValue)) {
      input.value = hexRef
      return
    }

    const hexPairs = slicedValue.match(/.{2}/g)

    let step = e.shiftKey ? 10 : 1
    step *= direction === 'down' ? -1 : 1

    const { selectionEnd, selectionStart } = input
    const start = selectionStart ?? 0
    const end = selectionEnd ?? 0

    const isFullTextSelected = (end - start) === input.value.length

    if (isFullTextSelected) {
      let newHexVal = ''

      hexPairs?.forEach((pair) => {
        newHexVal = newHexVal.concat(bumpHexPair(pair, step))
      })

      updateValue(input, newHexVal)
      input.setSelectionRange(0, input.value.length)
      return
    }

    let startPairIndex: number
    let endPairIndex: number

    if (start === end) {
      startPairIndex = Math.min(Math.floor(start / 2), 2)
      endPairIndex = startPairIndex
    }
    else {
      startPairIndex = Math.floor(start / 2)
      endPairIndex = Math.floor((end - 1) / 2)
    }

    let newHexVal = ''
    hexPairs?.forEach((pair, index) => {
      if (index >= startPairIndex && index <= endPairIndex) {
        newHexVal = newHexVal.concat(bumpHexPair(pair, step))
      }
      else {
        newHexVal = newHexVal.concat(pair)
      }
    })

    updateValue(input, newHexVal)

    const newSelectionStart = startPairIndex * 2
    const newSelectionEnd = (endPairIndex + 1) * 2
    input.setSelectionRange(newSelectionStart, newSelectionEnd)
  }

  function handleFocus(e: FocusEvent) {
    const input = e.target as HTMLInputElement
    input.setSelectionRange(0, -1)
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

  const marker: Record<string, string> = { 'huey-input': 'hex' }
</script>

<input
  {id}
  {...rest}
  {...marker}
  value={hexRef}
  type="text"
  autocomplete="off"
  spellcheck="false"
  dir="ltr"
  onkeydown={handleKeydown}
  onblur={handleEnter}
  onfocus={handleFocus}
/>
