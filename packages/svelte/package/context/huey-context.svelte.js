import { getContext, setContext } from 'svelte';
export class HueyState {
    hue = $state(0);
    saturation = $state(0);
    lightness = $state(0);
    alpha = $state(1);
    colorValue = $state(null);
    setColor = () => { };
}
export const HUEY_CONTEXT = Symbol('huey');
export function setHueyContext(state) {
    setContext(HUEY_CONTEXT, state);
    return state;
}
export function useHueyContext() {
    const ctx = getContext(HUEY_CONTEXT);
    if (!ctx) {
        throw new Error('Huey components must be used within <HueyRoot>');
    }
    return ctx;
}
