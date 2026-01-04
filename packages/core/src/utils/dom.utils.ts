import type { Coordinates } from '@core/types'

export function getScrollXY(): Coordinates {
  const x = window.scrollX || window.pageXOffset || document.documentElement.scrollLeft || 0
  const y = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0

  return { x, y }
}

/** get the position of the container relative to the document’s edge, regardless of any scrolling that has occurred */
export function getAbsolutePosition(container: HTMLElement): Coordinates {
  const { x: scrollX, y: scrollY } = getScrollXY()

  const rect = container.getBoundingClientRect()

  return {
    x: rect.left + scrollX,
    y: rect.top + scrollY,
  }
}

export function getPageXYFromEvent(e: MouseEvent | TouchEvent): Coordinates {
  const coordinates: Coordinates = { x: 0, y: 0 }
  if (e instanceof MouseEvent) {
    coordinates.x = e.pageX
    coordinates.y = e.pageY
  }

  if (typeof TouchEvent !== 'undefined' && e instanceof TouchEvent) {
    coordinates.x = (e.touches ? e.touches[0].pageX : e.changedTouches ? e.changedTouches[0].pageX : 0)
    coordinates.y = (e.touches ? e.touches[0].pageY : e.changedTouches ? e.changedTouches[0].pageY : 0)
  }

  return coordinates
}
