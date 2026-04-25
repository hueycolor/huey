<script lang="ts">
  import type { HueyRootProps } from '@/types'
  import type { ColorFormat, HueyColor } from '@hueycolor/core'
  import { clamp, hueyColor } from '@hueycolor/core'
  import { HueyState, setHueyContext } from '../context/huey-context.svelte'

  let { color = $bindable(), children }: HueyRootProps = $props()

  if (!color) {
    throw new Error('<HueyRoot> is missing required bind:color of type string or HueyColor')
  }

  const state = setHueyContext(new HueyState())

  function safeHueyColor(input: string | HueyColor): HueyColor {
    try {
      return hueyColor(input)
    }
    catch {
      return hueyColor('#000000')
    }
  }

  const initialParsed = safeHueyColor(color)
  const initialHsl = initialParsed.toHsl()
  state.hue = initialHsl.h
  state.saturation = initialHsl.s
  state.lightness = initialHsl.l
  state.alpha = initialHsl.a
  state.colorValue = initialParsed

  let stringFormat: ColorFormat | null = typeof color === 'string' ? initialParsed.getFormat() : null

  state.setColor = (c: string | HueyColor) => {
    const parsed = safeHueyColor(c)
    const hsl = parsed.toHsl()

    state.hue = clamp(hsl.h, 0, 360)
    state.saturation = clamp(hsl.s, 0, 100)
    state.lightness = clamp(hsl.l, 0, 100)
    state.alpha = clamp(hsl.a, 0, 1)
  }

  $effect(() => {
    const h = state.hue
    const s = state.saturation
    const l = state.lightness
    const a = state.alpha

    const next = hueyColor(`hsla(${clamp(h, 0, 360)}, ${clamp(s, 0, 100)}%, ${clamp(l, 0, 100)}%, ${clamp(a, 0, 1)})`)

    state.colorValue = next

    if (stringFormat === null) {
      color = next
    }
    else if (stringFormat === 'hex') {
      color = next.toHexString()
    }
    else if (stringFormat === 'rgb') {
      color = next.toRgbString()
    }
    else if (stringFormat === 'oklch') {
      color = next.toOklchString()
    }
    else {
      color = next.toHslString()
    }
  })
</script>

{@render children?.()}
