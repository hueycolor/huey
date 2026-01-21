/* eslint-disable regexp/no-super-linear-backtracking */

export const HEX_REGEX = /^#?(?:[A-F0-9]{8}|[A-F0-9]{6}|[A-F0-9]{3})$/i
export const RGB_REGEX = /^rgba?\(\s*(\d+)\s*[,\s]\s*(\d+)\s*[,\s]\s*(\d+)\s*(?:[,/]\s*([\d.]+)\s*)?\)$/i
export const HSL_REGEX = /^hsla?\(\s*([\d.]+)(?:deg|rad|grad|turn)?\s*[,\s]\s*([\d.]+)%?\s*[,\s]\s*([\d.]+)%?\s*(?:[,/]\s*([\d.]+))?\s*\)$/i
export const OKLCH_REGEX = /^oklch\(\s*([\d.]+%?)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)(?:deg|rad|grad|turn)?\s*(?:[,/]\s*([\d.]+))?\s*\)$/i
