export interface HSL {
  h: number;
  s: number;
  l: number;
}

export interface HSV {
  h: number;
  s: number;
  v: number;
}

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface HSLA extends HSL {
  a: number;
}

export interface RGBA extends RGB {
  a: number;
}

export type Color = string | HSL | HSV | RGB | HSLA | RGBA;

export type ColorChannel = 'hue' | 'saturation' | 'lightness' | 'value' | 'alpha';
export type ColorFormat = 'hex' | 'hex8' | 'hsl' | 'hsv' | 'rgb';