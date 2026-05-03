import type { HueyColor } from '@hueycolor/core';
export declare class HueyState {
    hue: number;
    saturation: number;
    lightness: number;
    alpha: number;
    colorValue: HueyColor;
    setColor: (color: string | HueyColor) => void;
}
export declare const HUEY_CONTEXT: unique symbol;
export declare function setHueyContext(state: HueyState): HueyState;
export declare function useHueyContext(): HueyState;
