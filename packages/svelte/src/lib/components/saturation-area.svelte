<script lang="ts">
  import type { SaturationAreaProps } from '@/types'
  import { clamp, getAbsolutePosition, getPageXYFromEvent, hslToHsv, hsvToHsl, resolveArrowDirection } from '@hueycolor/core'
  import { useHueyContext } from '../context/huey-context.svelte'
  import { allowUserSelect, preventUserSelect } from '../utils/index'
  import ColorThumb from './internal/color-thumb.svelte'

  let { colorFormat = 'hsl', class: className, 'aria-label': ariaLabel }: SaturationAreaProps = $props()

  const ctx = useHueyContext()

  let areaEl: HTMLDivElement | undefined = $state()

  let hslSaturation = $state(hslToHsv(ctx.hue, ctx.saturation, ctx.lightness).s)
  let isDragging = $state(false)

  $effect(() => {
    const h = ctx.hue
    const s = ctx.saturation
    const l = ctx.lightness
    if (isDragging)
      return
    hslSaturation = hslToHsv(h, s, l).s
  })

  const areaBg = $derived.by(() => {
    const hslString = `hsl(${ctx.hue}, 100%, 50%)`

    if (colorFormat === 'hsl') {
      return `linear-gradient(to top, black, transparent, white), linear-gradient(to right, hsl(0, 0%, 50%), transparent), ${hslString}`
    }

    return `linear-gradient(to top, black, transparent), linear-gradient(to right, white, transparent),
    ${hslString}`
  })

  const thumbBg = $derived(`hsl(${ctx.hue}, ${ctx.saturation}%, ${ctx.lightness}%)`)

  function handleChange(e: MouseEvent | TouchEvent) {
    if (!areaEl)
      return

    const areaWidth = areaEl.clientWidth
    const areaHeight = areaEl.clientHeight

    const { x: xOffset, y: yOffset } = getAbsolutePosition(areaEl)
    const { x: pageX, y: pageY } = getPageXYFromEvent(e)

    const left = clamp(pageX - xOffset, 0, areaWidth)
    const top = clamp(pageY - yOffset, 0, areaHeight)

    if (colorFormat === 'hsl') {
      ctx.saturation = (left / areaWidth) * 100
      ctx.lightness = clamp(1 - (top / areaHeight), 0, 1) * 100
      return
    }

    const sv = (left / areaWidth) * 100
    const v = clamp(1 - (top / areaHeight), 0, 1) * 100

    hslSaturation = sv

    const hsl = hsvToHsl(ctx.hue, sv, v)

    ctx.saturation = hsl.s
    ctx.lightness = hsl.l
  }

  const offsetLeft = $derived.by(() => {
    if (colorFormat === 'hsl') {
      return `${ctx.saturation}%`
    }
    return `${hslSaturation}%`
  })

  const offsetTop = $derived.by(() => {
    if (colorFormat === 'hsl') {
      return `${100 - ctx.lightness}%`
    }
    const hsv = hslToHsv(ctx.hue, ctx.saturation, ctx.lightness)
    return `${100 - hsv.v}%`
  })

  function handleMouseDown(e: MouseEvent) {
    e.preventDefault()
    isDragging = true
    preventUserSelect()

    window.addEventListener('mousemove', handleChange)
    window.addEventListener('mouseup', handleChange)
    window.addEventListener('mouseup', handleMouseUp)
  }

  function handleTouchStart(e: TouchEvent) {
    isDragging = true
    handleChange(e)
    window.addEventListener('touchend', handleTouchEnd)
  }

  function handleTouchEnd() {
    isDragging = false
    window.removeEventListener('touchend', handleTouchEnd)
  }

  function handleKeyDown(e: KeyboardEvent) {
    const direction = resolveArrowDirection(e)
    const step = e.shiftKey ? 10 : 1

    if (!direction)
      return

    e.preventDefault()

    isDragging = true

    if (colorFormat === 'hsl') {
      switch (direction) {
        case 'left':
          ctx.saturation = clamp(ctx.saturation - step, 0, 100)
          break
        case 'down':
          ctx.lightness = clamp(ctx.lightness - step, 0, 100)
          break
        case 'right':
          ctx.saturation = clamp(ctx.saturation + step, 0, 100)
          break
        case 'up':
          ctx.lightness = clamp(ctx.lightness + step, 0, 100)
          break
      }
      isDragging = false
      return
    }

    const hsv = hslToHsv(ctx.hue, ctx.saturation, ctx.lightness)
    hsv.s = hslSaturation

    switch (direction) {
      case 'left':
        hsv.s = clamp(hsv.s - step, 0, 100)
        break
      case 'down':
        hsv.v = clamp(hsv.v - step, 0, 100)
        break
      case 'right':
        hsv.s = clamp(hsv.s + step, 0, 100)
        break
      case 'up':
        hsv.v = clamp(hsv.v + step, 0, 100)
        break
    }

    hslSaturation = hsv.s

    const hsl = hsvToHsl(ctx.hue, hsv.s, hsv.v)

    ctx.saturation = hsl.s
    ctx.lightness = hsl.l
    isDragging = false
  }

  function unbindEventListeners() {
    window.removeEventListener('mousemove', handleChange)
    window.removeEventListener('mouseup', handleChange)
    window.removeEventListener('mouseup', handleMouseUp)
    window.removeEventListener('touchend', handleTouchEnd)
  }

  function handleMouseUp() {
    isDragging = false
    allowUserSelect()
    unbindEventListeners()
  }

  $effect(() => {
    return () => unbindEventListeners()
  })

  const areaMarker: Record<string, string> = { 'huey-area': '' }
</script>

<div
  bind:this={areaEl}
  {...areaMarker}
  role="group"
  class={className}
  style={`background: ${areaBg}; --huey-thumb-color: ${thumbBg};`}
  onmousedown={handleMouseDown}
  ontouchmove={handleChange}
  ontouchstart={handleTouchStart}
>
  <ColorThumb
    style={`top: ${offsetTop}; left: ${offsetLeft};`}
    tabindex={0}
    role="slider"
    aria-label={ariaLabel ?? "Color thumb"}
    aria-valuenow={Math.round(ctx.saturation)}
    aria-valuemin={0}
    aria-valuemax={100}
    aria-valuetext={`Saturation ${Math.round(ctx.saturation)}%, Lightness ${Math.round(ctx.lightness)}%`}
    onkeydown={handleKeyDown}
  />
</div>

<style>
  :global {
    [huey-area] {
      --huey-area-height: 230px;
      --huey-area-width: 240px;
      --huey-area-radius: 12px;

      position: relative;
      width: var(--huey-area-width);
      height: var(--huey-area-height);
      border-radius: var(--huey-area-radius);
      touch-action: none;
    }
  }
</style>
