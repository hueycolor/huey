import type { HTMLAttributes } from 'svelte/elements';
export interface ColorThumbProps extends HTMLAttributes<HTMLDivElement> {
    tabindex?: number;
}
declare const ColorThumb: import("svelte").Component<ColorThumbProps, {}, "">;
type ColorThumb = ReturnType<typeof ColorThumb>;
export default ColorThumb;
