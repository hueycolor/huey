<script lang="ts" module>
  import type { ColorSliderProps } from './internal/channel-slider.svelte'

  export interface AlphaSliderProps extends Omit<ColorSliderProps, 'value'> {}
</script>

<script lang="ts">
  import { useHueyContext } from '../context/huey-context.svelte'
  import ChannelSlider from './internal/channel-slider.svelte'

  let { 'aria-label': ariaLabel, orientation, ...rest }: AlphaSliderProps = $props()

  const ctx = useHueyContext()

  const alphaSliderBg = $derived.by(() => {
    const isVertical = orientation === 'vertical'
    const dir = isVertical ? '0deg' : '90deg'
    const checkerSize = isVertical ? '66.67% auto' : 'auto 66.67%'

    return `
  linear-gradient(${dir}, hsla(${ctx.hue}, ${ctx.saturation}%, ${ctx.lightness}%, 0) 0 calc(var(--huey-slider-track-height) / 2), hsla(${ctx.hue}, ${ctx.saturation}%, ${ctx.lightness}%, 1) calc(100% - calc(var(--huey-slider-track-height) / 2)) 100%), url('data:image/svg+xml;utf8,%3Csvg%20width%3D%222%22%20height%3D%222%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M0%200h1v2h1V1H0%22%20fill-rule%3D%22nonzero%22%20fill%3D%22%23e1e1e1%22/%3E%3C/svg%3E') 0 0 / ${checkerSize}, #fff
  `
  })

  const thumbBg = $derived(
    `color-mix(in srgb, white, hsl(${ctx.hue}, ${ctx.saturation}%, ${ctx.lightness}%) ${ctx.alpha * 100}%)`,
  )

  const marker: Record<string, string> = { 'huey-slider': 'alpha' }
</script>

<ChannelSlider
  {...rest}
  {...marker}
  {orientation}
  bind:value={ctx.alpha}
  aria-label={ariaLabel ?? 'Alpha slider'}
  max={1}
  min={0}
  step={0.01}
  style={`--huey-slider-bg: ${alphaSliderBg}; --huey-thumb-color: ${thumbBg};`}
/>
