export interface ColorSliderProps {
    min?: number;
    max?: number;
    step?: number;
    orientation?: 'horizontal' | 'vertical';
    value?: number;
    style?: string | null;
    class?: string | null;
    'aria-label'?: string | null;
}
declare const ChannelSlider: import("svelte").Component<ColorSliderProps, {}, "value">;
type ChannelSlider = ReturnType<typeof ChannelSlider>;
export default ChannelSlider;
