<script lang="ts">
  import type { HueSliderProps } from '@/types'
  import { useHueyContext } from '../context/huey-context.svelte'
  import ChannelSlider from './internal/channel-slider.svelte'

  let { 'aria-label': ariaLabel, ...rest }: HueSliderProps = $props()

  const ctx = useHueyContext()

  const thumbBg = $derived(`hsl(${ctx.hue}, 100%, 50%)`)

  const marker: Record<string, string> = { 'huey-slider': 'hue' }
</script>

<ChannelSlider
  {...rest}
  {...marker}
  bind:value={ctx.hue}
  aria-label={ariaLabel ?? 'Hue slider'}
  max={360}
  min={0}
  step={1}
  style={`--huey-thumb-color: ${thumbBg};`}
/>
