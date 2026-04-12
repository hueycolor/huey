<script lang="ts" module>
  import type { ColorSliderProps } from './internal/channel-slider.svelte'

  export interface LightnessSliderProps extends Omit<ColorSliderProps, 'value'> {}
</script>

<script lang="ts">
  import { useHueyContext } from '../context/huey-context.svelte'
  import ChannelSlider from './internal/channel-slider.svelte'

  let { 'aria-label': ariaLabel, orientation, ...rest }: LightnessSliderProps = $props()

  const ctx = useHueyContext()

  const thumbBg = $derived(`hsl(${ctx.hue}, ${ctx.saturation}%, ${ctx.lightness}%)`)

  const trackBg = $derived.by(() => {
    const dir = orientation === 'vertical' ? 'to top' : 'to right'
    return `linear-gradient(${dir}, #000, hsl(${ctx.hue}, ${ctx.saturation}%, 50%), #fff)`
  })

  const marker: Record<string, string> = { 'huey-slider': 'lightness' }
</script>

<ChannelSlider
  {...rest}
  {...marker}
  {orientation}
  bind:value={ctx.lightness}
  aria-label={ariaLabel ?? 'Lightness slider'}
  max={100}
  min={0}
  step={1}
  style={`background: ${trackBg}; --huey-thumb-color: ${thumbBg};`}
/>
