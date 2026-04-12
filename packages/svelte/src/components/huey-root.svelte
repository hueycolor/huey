<script lang="ts">
  import type { HueyColor } from '@hueycolor/core'
  import type { Snippet } from 'svelte'
  import { clamp, hueyColor } from '@hueycolor/core'
  import { HueyState, setHueyContext } from '../context/huey-context.svelte'

  interface Props {
    color: HueyColor
    children?: Snippet
  }

  let { color = $bindable(), children }: Props = $props()

  if (!color) {
    throw new Error('<HueyRoot> is missing required bind:color of type HueyColor')
  }

  const state = setHueyContext(new HueyState())

  const initialParsed = hueyColor(color)
  const initialHsl = initialParsed.toHsl()
  state.hue = initialHsl.h
  state.saturation = initialHsl.s
  state.lightness = initialHsl.l
  state.alpha = initialHsl.a
  state.colorValue = initialParsed

  state.setColor = (c: string | HueyColor) => {
    const parsed = hueyColor(c)
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
    color = next
  })
</script>

{@render children?.()}
