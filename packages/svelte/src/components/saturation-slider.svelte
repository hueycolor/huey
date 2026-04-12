<script lang="ts" module>
  import type { ColorSliderProps } from './internal/channel-slider.svelte'

  export interface SaturationSliderProps extends Omit<ColorSliderProps, 'value'> {}
</script>

<script lang="ts">
  import { useHueyContext } from '../context/huey-context.svelte'
  import ChannelSlider from './internal/channel-slider.svelte'

  let { 'aria-label': ariaLabel, orientation, ...rest }: SaturationSliderProps = $props()

  const ctx = useHueyContext()

  const thumbBg = $derived(`hsl(${ctx.hue}, ${ctx.saturation}%, 50%)`)

  const trackBg = $derived.by(() => {
    const dir = orientation === 'vertical' ? 'to top' : 'to right'
    return `linear-gradient(${dir}, hsl(${ctx.hue}, 0%, 50%), hsl(${ctx.hue}, 100%, 50%))`
  })

  const marker: Record<string, string> = { 'huey-slider': 'saturation' }
</script>

<ChannelSlider
  {...rest}
  {...marker}
  {orientation}
  bind:value={ctx.saturation}
  aria-label={ariaLabel ?? 'Saturation slider'}
  max={100}
  min={0}
  step={1}
  style={`background: ${trackBg}; --huey-thumb-color: ${thumbBg};`}
/>
