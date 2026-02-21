<script setup lang="ts">
import type { ButtonHTMLAttributes } from 'vue'

withDefaults(defineProps<HueyButtonProps>(), {
  variant: 'primary',
  as: 'button',
})
</script>

<script lang="ts">
export interface HueyButtonProps extends /* @vue-ignore */ ButtonHTMLAttributes {
  variant?: 'primary' | 'secondary' | 'tertiary'
  as?: string
}
</script>

<template>
  <component :is="as" :huey-button="$props.variant">
    <slot />
  </component>
</template>

<style scoped>
[huey-button] {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-8);
  padding-block: var(--spacing-8);
  padding-inline: var(--spacing-24);
  min-height: 48px;
  border-radius: var(--radius-12);
  font: var(--label-md);
  cursor: pointer;

  &:focus-visible {
    outline-color: var(--color-beige-950);
    outline-offset: var(--spacing-2);
    outline-style: solid;
    outline-width: 2px;
  }
}
[huey-button='primary'] {
  background-color: var(--color-beige-950);
  color: var(--color-beige-50);
}
[huey-button='secondary'] {
  background-color: var(--color-linen-100);
  color: var(--color-stone-950);
}
</style>
