<script setup lang="ts">
import { Icon } from '@iconify/vue'
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectLabel,
  SelectPortal,
  SelectRoot,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from 'reka-ui'
import { computed, ref } from 'vue'

const selectedFramework = ref('vue')

const frameworks = [
  { value: 'vue', label: 'Vue', icon: 'logos:vue' },
  { value: 'react', label: 'React', icon: 'logos:react' },
  { value: 'svelte', label: 'Svelte', icon: 'logos:svelte-icon' },
  { value: 'solid', label: 'Solid', icon: 'logos:solidjs-icon' },
  { value: 'angular', label: 'Angular', icon: 'logos:angular-icon' },
  { value: 'preact', label: 'Preact', icon: 'logos:preact' },
]

const selectedFrameworkData = computed(() =>
  frameworks.find(f => f.value === selectedFramework.value),
)
</script>

<template>
  <SelectRoot v-model="selectedFramework">
    <SelectTrigger class="SelectTrigger" aria-label="Select a framework">
      <span v-if="selectedFrameworkData" class="SelectedValue">
        <Icon :icon="selectedFrameworkData.icon" class="FrameworkIcon" />
        {{ selectedFrameworkData.label }}
      </span>
      <SelectValue v-else placeholder="Select a framework" />
      <Icon icon="radix-icons:chevron-down" class="SelectIcon" />
    </SelectTrigger>

    <SelectPortal to="body">
      <SelectContent
        class="SelectContent"
        :side-offset="5"
        position="popper"
        :style="{ zIndex: 13 }"
      >
        <SelectScrollUpButton class="SelectScrollButton">
          <Icon icon="radix-icons:chevron-up" />
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
                <Icon :icon="framework.icon" class="FrameworkIcon" />
                {{ framework.label }}
              </SelectItemText>
              <SelectItemIndicator class="SelectItemIndicator">
                <Icon icon="radix-icons:check" />
              </SelectItemIndicator>
            </SelectItem>
          </SelectGroup>
        </SelectViewport>

        <SelectScrollDownButton class="SelectScrollButton">
          <Icon icon="radix-icons:chevron-down" />
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
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-8);
  min-width: 180px;
  padding: var(--spacing-8) var(--spacing-12);
  font: var(--paragraph-sm);
  color: var(--color-stone-950);
  background-color: var(--color-beige-100);
  border: 1px solid var(--color-linen-200);
  border-radius: var(--radius-8);
  cursor: pointer;
  transition: all 150ms ease-out;
}

.SelectTrigger:hover {
  background-color: var(--color-linen-100);
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

.SelectTrigger[data-state='open'] .SelectIcon {
  transform: rotate(180deg);
}

.SelectedValue {
  display: flex;
  align-items: center;
  gap: var(--spacing-8);
}

.SelectContent {
  background-color: var(--color-beige-50);
  z-index: 14;
  min-width: 180px;
  border: 1px solid var(--color-linen-200);
  border-radius: var(--radius-8);
  padding: var(--spacing-6);
  box-shadow: 0px 10px 38px -10px rgba(12, 10, 9, 0.35), 0px 10px 20px -15px rgba(12, 10, 9, 0.2);
  animation-duration: 400ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
}

.SelectContent[data-side='top'] {
  animation-name: slideDownAndFade;
}

.SelectContent[data-side='bottom'] {
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
  background-color: var(--color-beige-200);
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
    transform: translateY(2px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideDownAndFade {
  from {
    opacity: 0;
    transform: translateY(-2px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
