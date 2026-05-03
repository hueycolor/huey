<script lang="ts" module>
  export interface ColorSliderProps {
    min?: number
    max?: number
    step?: number
    orientation?: 'horizontal' | 'vertical'
    value?: number
    style?: string | null
    class?: string | null
    'aria-label'?: string | null
  }
</script>

<script lang="ts">
  import { clamp, getAbsolutePosition, getPageXYFromEvent, normalize, resolveArrowDirection, roundToStep } from '@hueycolor/core'
  import { allowUserSelect, preventUserSelect } from '../../utils/index'
  import ColorThumb from './color-thumb.svelte'

  let {
    value = $bindable(0),
    min = 0,
    max = 100,
    step = 1,
    orientation = 'horizontal',
    ...rest
  }: ColorSliderProps = $props()

  let trackEl: HTMLDivElement | undefined = $state()

  const isVertical = $derived(orientation === 'vertical')

  const thumbTop = $derived.by(() => {
    const percent = normalize(value, min, max, 0, 100)
    return isVertical ? `${100 - percent}%` : '50%'
  })
  const thumbLeft = $derived.by(() => {
    const percent = normalize(value, min, max, 0, 100)
    return isVertical ? '50%' : `${percent}%`
  })

  function handleChange(e: MouseEvent | TouchEvent) {
    if (!trackEl)
      return

    let raw: number

    if (isVertical) {
      const { y: yOffset } = getAbsolutePosition(trackEl)
      const { y: pageY } = getPageXYFromEvent(e)
      const top = pageY - yOffset
      const height = trackEl.clientHeight
      raw = normalize(1 - top / height, 0, 1, min, max)
    }
    else {
      const { x: xOffset } = getAbsolutePosition(trackEl)
      const { x: pageX } = getPageXYFromEvent(e)
      const left = pageX - xOffset
      const width = trackEl.clientWidth
      raw = normalize(left / width, 0, 1, min, max)
    }

    const stepped = Math.round(raw / step) * step
    value = clamp(roundToStep(stepped, step), min, max)
  }

  function handleMouseDown(e: MouseEvent) {
    handleChange(e)
    preventUserSelect()

    window.addEventListener('mousemove', handleChange)
    window.addEventListener('mouseup', handleMouseUp)
  }

  function handleKeyDown(e: KeyboardEvent) {
    const direction = resolveArrowDirection(e)

    if (!direction)
      return

    e.preventDefault()

    const oldVal = value
    const largeStep = e.shiftKey ? step * 10 : step

    switch (direction) {
      case 'left':
      case 'down':
        value = clamp(roundToStep(oldVal - largeStep, largeStep), min, max)
        break
      case 'right':
      case 'up':
        value = clamp(roundToStep(oldVal + largeStep, largeStep), min, max)
        break
    }
  }

  function unbindEventListeners() {
    window.removeEventListener('mousemove', handleChange)
    window.removeEventListener('mouseup', handleMouseUp)
  }

  function handleMouseUp() {
    allowUserSelect()
    unbindEventListeners()
  }

  $effect(() => {
    return () => unbindEventListeners()
  })

  const trackMarker: Record<string, string> = { 'huey-slider-track': '' }
</script>

<div
  bind:this={trackEl}
  {...rest}
  {...trackMarker}
  role="slider"
  aria-orientation={orientation}
  aria-valuemin={min}
  aria-valuemax={max}
  aria-valuenow={value}
  onmousedown={handleMouseDown}
  ontouchmove={handleChange}
  ontouchstart={handleChange}
>
  <ColorThumb tabindex={0} style="top: {thumbTop}; left: {thumbLeft};" onkeydown={handleKeyDown} />
</div>

<style>
  :global {
    [huey-slider-track] {
      --huey-slider-track-height: 16px;
      --huey-slider-track-width: 129px;
      --huey-gradient-dir: to right;
      --huey-gradient-angle: 90deg;

      position: relative;
      width: var(--huey-slider-track-width);
      height: var(--huey-slider-track-height);
      border-radius: calc(1px * infinity);
      touch-action: none;
    }

    [huey-slider-track][aria-orientation='vertical'] {
      --huey-gradient-dir: to top;
      --huey-gradient-angle: 0deg;

      width: var(--huey-slider-track-height);
      height: var(--huey-slider-track-width);
    }

    [huey-slider-track] [huey-slider-thumb] {
      height: var(--huey-slider-track-height);
    }

    [huey-slider='hue'] {
      background: linear-gradient(var(--huey-gradient-dir, to right), #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
    }

    [huey-slider='alpha'] {
      background: var(--huey-slider-bg);
    }
  }
</style>
