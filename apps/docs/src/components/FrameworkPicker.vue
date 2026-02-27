<script setup lang="ts">
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectPortal,
  SelectRoot,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from 'reka-ui'
import { computed, ref } from 'vue'
import AppIcon from './AppIcon.vue'

const selectedFramework = ref('vue')

const frameworks = [
  { value: 'vue', label: 'Vue', icon: 'logos:vue' },
  { value: 'svelte', label: 'Svelte', icon: 'logos:svelte-icon' },
]

const selectedFrameworkData = computed(() =>
  frameworks.find(f => f.value === selectedFramework.value),
)
</script>

<template>
  <SelectRoot v-model="selectedFramework">
    <SelectTrigger class="SelectTrigger" aria-label="Select a framework">
      <span v-if="selectedFrameworkData" class="SelectedValue">
        <AppIcon :icon="selectedFrameworkData.icon" class="FrameworkIcon" />
        {{ selectedFrameworkData.label }}
      </span>
      <SelectValue v-else placeholder="Select a framework" />
      <AppIcon icon="ph:caret-up-down" class="SelectIcon" />
    </SelectTrigger>

    <SelectPortal>
      <SelectContent
        class="SelectContent"
        :side-offset="5"
        position="popper"
        :style="{ zIndex: 13 }"
      >
        <SelectScrollUpButton class="SelectScrollButton">
          <AppIcon icon="ph:caret-up" />
        </SelectScrollUpButton>

        <SelectViewport class="SelectViewport">
          <SelectGroup>
            <SelectItem
              v-for="framework in frameworks"
              :key="framework.value"
              :value="framework.value"
              class="SelectItem"
            >
              <SelectItemText class="SelectItemText">
                <AppIcon :icon="framework.icon" class="FrameworkIcon" />
                {{ framework.label }}
              </SelectItemText>
              <SelectItemIndicator class="SelectItemIndicator">
                <AppIcon icon="ph:check" />
              </SelectItemIndicator>
            </SelectItem>
          </SelectGroup>
        </SelectViewport>

        <SelectScrollDownButton class="SelectScrollButton">
          <AppIcon icon="ph:caret-down" />
        </SelectScrollDownButton>
      </SelectContent>
    </SelectPortal>
  </SelectRoot>
</template>

<style scoped>
button {
  all: unset;
}

.SelectTrigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  padding-inline: var(--spacing-12);
  border-radius: var(--radius-8);
  font: var(--paragraph-sm);
  background-color: var(--color-linen-100);
  border: 1px solid color-mix(in srgb, var(--color-linen-950) 10%, transparent 100%);
  cursor: pointer;
  transition: all 150ms ease-out;
}

.SelectTrigger:hover {
  background-color: var(--color-linen-200);
}

.SelectTrigger:focus {
  outline: 2px solid var(--color-stone-950);
  outline-offset: 2px;
}

.SelectTrigger[data-placeholder] {
  color: var(--color-stone-500);
}

.SelectIcon {
  color: var(--color-stone-600);
  transition: transform 150ms ease-out;
}

.SelectedValue {
  display: flex;
  align-items: center;
  gap: var(--spacing-8);
}

:deep(.SelectContent) {
  position: relative;
  width: var(--reka-select-trigger-width);
  background-color: var(--color-beige-50);
  border: 1px solid color-mix(in srgb, var(--color-linen-950) 10%, transparent 100%);
  border-radius: var(--radius-8);
  padding: var(--spacing-6);
  box-shadow: 0px 10px 32px -10px rgba(12, 10, 9, 0.1), 0px 10px 20px -15px rgba(12, 10, 9, 0.2);
  animation-duration: 200ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
  transform-origin: top center;
}

:deep(.SelectContent[data-side='top']) {
  animation-name: slideDownAndFade;
}

:deep(.SelectContent[data-side='bottom']) {
  animation-name: slideUpAndFade;
}

.SelectViewport {
  padding: var(--spacing-2);
}

.SelectLabel {
  padding: var(--spacing-6) var(--spacing-32);
  font: var(--subheading-xs);
  color: var(--color-stone-600);
  text-transform: uppercase;
}

.SelectItem {
  font: var(--paragraph-sm);
  line-height: 1.5;
  color: var(--color-stone-950);
  border-radius: var(--radius-4);
  display: flex;
  align-items: center;
  min-height: 36px;
  padding: var(--spacing-6) var(--spacing-32) var(--spacing-6) var(--spacing-8);
  position: relative;
  user-select: none;
  outline: none;
  cursor: pointer;
}

.SelectItem[data-disabled] {
  color: var(--color-stone-400);
  pointer-events: none;
}

.SelectItem[data-highlighted] {
  background-color: color-mix(in srgb, var(--color-linen-950) 8%, transparent 100%);
  color: var(--color-stone-950);
}

.SelectItemText {
  display: flex;
  align-items: center;
  gap: var(--spacing-8);
}

.FrameworkIcon {
  width: 18px;
  height: 18px;
}

.SelectItemIndicator {
  position: absolute;
  right: var(--spacing-8);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--color-stone-950);
}

.SelectScrollButton {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 28px;
  background-color: var(--color-beige-50);
  color: var(--color-stone-600);
  cursor: default;
}

@keyframes slideUpAndFade {
  from {
    opacity: 0;
    transform: translateY(2px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes slideDownAndFade {
  from {
    opacity: 0;
    transform: translateY(-2px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
