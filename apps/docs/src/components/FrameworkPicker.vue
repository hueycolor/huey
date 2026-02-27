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

const selectedFramework = ref('vue')

const frameworks = [
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
]

const selectedFrameworkData = computed(() =>
  frameworks.find(f => f.value === selectedFramework.value),
)
</script>

<template>
  <SelectRoot v-model="selectedFramework">
    <SelectTrigger class="SelectTrigger" aria-label="Select a framework">
      <span v-if="selectedFrameworkData" class="SelectedValue">
        <svg v-if="selectedFrameworkData.value === 'vue'" class="FrameworkIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 221">
          <path fill="#41B883" d="M204.8 0H256L128 220.8L0 0h97.92L128 51.2L157.44 0h47.36Z" />
          <path fill="#41B883" d="m0 0l128 220.8L256 0h-51.2L128 132.48L50.56 0H0Z" />
          <path fill="#35495E" d="M50.56 0L128 133.12L204.8 0h-47.36L128 51.2L97.92 0H50.56Z" />
        </svg>
        <svg v-else-if="selectedFrameworkData.value === 'svelte'" class="FrameworkIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 308">
          <path fill="#FF3E00" d="M239.682 40.707C211.113-.182 154.69-12.301 113.895 13.69L42.247 59.356a82.198 82.198 0 0 0-37.135 55.056a86.566 86.566 0 0 0 8.536 55.576a82.425 82.425 0 0 0-12.296 30.719a87.596 87.596 0 0 0 14.964 66.244c28.574 40.893 84.997 53.007 125.787 27.016l71.648-45.664a82.182 82.182 0 0 0 37.135-55.057a86.601 86.601 0 0 0-8.53-55.577a82.409 82.409 0 0 0 12.29-30.718a87.573 87.573 0 0 0-14.963-66.244" />
          <path fill="#FFF" d="M106.889 270.841c-23.102 6.007-47.497-3.036-61.103-22.648a52.685 52.685 0 0 1-9.003-39.85a49.978 49.978 0 0 1 1.713-6.693l1.35-4.115l3.671 2.697a92.447 92.447 0 0 0 28.036 14.007l2.663.808l-.245 2.659a16.067 16.067 0 0 0 2.89 10.656a17.143 17.143 0 0 0 18.397 6.828a15.786 15.786 0 0 0 4.403-1.935l71.67-45.672a14.922 14.922 0 0 0 6.734-9.977a15.923 15.923 0 0 0-2.713-12.011a17.156 17.156 0 0 0-18.404-6.832a15.78 15.78 0 0 0-4.396 1.933l-27.35 17.434a52.298 52.298 0 0 1-14.553 6.391c-23.101 6.007-47.497-3.036-61.101-22.649a52.681 52.681 0 0 1-9.004-39.849a49.428 49.428 0 0 1 22.34-33.114l71.664-45.677a52.218 52.218 0 0 1 14.563-6.398c23.101-6.007 47.497 3.036 61.101 22.648a52.685 52.685 0 0 1 9.004 39.85a50.559 50.559 0 0 1-1.713 6.692l-1.35 4.116l-3.67-2.693a92.373 92.373 0 0 0-28.037-14.013l-2.664-.809l.246-2.658a16.099 16.099 0 0 0-2.89-10.656a17.143 17.143 0 0 0-18.398-6.828a15.786 15.786 0 0 0-4.402 1.935l-71.67 45.674a14.898 14.898 0 0 0-6.73 9.975a15.9 15.9 0 0 0 2.709 12.012a17.156 17.156 0 0 0 18.404 6.832a15.841 15.841 0 0 0 4.402-1.935l27.345-17.427a52.147 52.147 0 0 1 14.552-6.397c23.101-6.006 47.497 3.037 61.102 22.65a52.681 52.681 0 0 1 9.003 39.848a49.453 49.453 0 0 1-22.34 33.12l-71.664 45.673a52.218 52.218 0 0 1-14.563 6.398" />
        </svg>
        {{ selectedFrameworkData.label }}
      </span>
      <SelectValue v-else placeholder="Select a framework" />
      <svg class="SelectIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
        <path fill="currentColor" d="m184.49 167.51a12 12 0 0 1 0 17l-48 48a12 12 0 0 1-17 0l-48-48a12 12 0 0 1 17-17L128 207l39.51-39.52a12 12 0 0 1 16.98.03Zm-96.98-79L128 49l39.51 39.52a12 12 0 0 0 17-17l-48-48a12 12 0 0 0-17 0l-48 48a12 12 0 0 0 17 17Z" />
      </svg>
    </SelectTrigger>

    <SelectPortal>
      <SelectContent
        class="SelectContent"
        :side-offset="5"
        position="popper"
        :style="{ zIndex: 13 }"
      >
        <SelectScrollUpButton class="SelectScrollButton">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15">
            <path fill="currentColor" fill-rule="evenodd" d="M3.135 8.75a.5.5 0 0 1-.027-.638l.027-.032L7.5 3.715l4.365 4.365a.5.5 0 0 1-.638.765l-.057-.057L7.5 5.117L3.83 8.788a.5.5 0 0 1-.696 0Z" clip-rule="evenodd" />
          </svg>
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
                <svg v-if="framework.value === 'vue'" class="FrameworkIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 221">
                  <path fill="#41B883" d="M204.8 0H256L128 220.8L0 0h97.92L128 51.2L157.44 0h47.36Z" />
                  <path fill="#41B883" d="m0 0l128 220.8L256 0h-51.2L128 132.48L50.56 0H0Z" />
                  <path fill="#35495E" d="M50.56 0L128 133.12L204.8 0h-47.36L128 51.2L97.92 0H50.56Z" />
                </svg>
                <svg v-else-if="framework.value === 'svelte'" class="FrameworkIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 308">
                  <path fill="#FF3E00" d="M239.682 40.707C211.113-.182 154.69-12.301 113.895 13.69L42.247 59.356a82.198 82.198 0 0 0-37.135 55.056a86.566 86.566 0 0 0 8.536 55.576a82.425 82.425 0 0 0-12.296 30.719a87.596 87.596 0 0 0 14.964 66.244c28.574 40.893 84.997 53.007 125.787 27.016l71.648-45.664a82.182 82.182 0 0 0 37.135-55.057a86.601 86.601 0 0 0-8.53-55.577a82.409 82.409 0 0 0 12.29-30.718a87.573 87.573 0 0 0-14.963-66.244" />
                  <path fill="#FFF" d="M106.889 270.841c-23.102 6.007-47.497-3.036-61.103-22.648a52.685 52.685 0 0 1-9.003-39.85a49.978 49.978 0 0 1 1.713-6.693l1.35-4.115l3.671 2.697a92.447 92.447 0 0 0 28.036 14.007l2.663.808l-.245 2.659a16.067 16.067 0 0 0 2.89 10.656a17.143 17.143 0 0 0 18.397 6.828a15.786 15.786 0 0 0 4.403-1.935l71.67-45.672a14.922 14.922 0 0 0 6.734-9.977a15.923 15.923 0 0 0-2.713-12.011a17.156 17.156 0 0 0-18.404-6.832a15.78 15.78 0 0 0-4.396 1.933l-27.35 17.434a52.298 52.298 0 0 1-14.553 6.391c-23.101 6.007-47.497-3.036-61.101-22.649a52.681 52.681 0 0 1-9.004-39.849a49.428 49.428 0 0 1 22.34-33.114l71.664-45.677a52.218 52.218 0 0 1 14.563-6.398c23.101-6.007 47.497 3.036 61.101 22.648a52.685 52.685 0 0 1 9.004 39.85a50.559 50.559 0 0 1-1.713 6.692l-1.35 4.116l-3.67-2.693a92.373 92.373 0 0 0-28.037-14.013l-2.664-.809l.246-2.658a16.099 16.099 0 0 0-2.89-10.656a17.143 17.143 0 0 0-18.398-6.828a15.786 15.786 0 0 0-4.402 1.935l-71.67 45.674a14.898 14.898 0 0 0-6.73 9.975a15.9 15.9 0 0 0 2.709 12.012a17.156 17.156 0 0 0 18.404 6.832a15.841 15.841 0 0 0 4.402-1.935l27.345-17.427a52.147 52.147 0 0 1 14.552-6.397c23.101-6.006 47.497 3.037 61.102 22.65a52.681 52.681 0 0 1 9.003 39.848a49.453 49.453 0 0 1-22.34 33.12l-71.664 45.673a52.218 52.218 0 0 1-14.563 6.398" />
                </svg>
                {{ framework.label }}
              </SelectItemText>
              <SelectItemIndicator class="SelectItemIndicator">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15">
                  <path fill="currentColor" fill-rule="evenodd" d="M11.467 3.727c.289.189.37.576.181.865l-4.25 6.5a.625.625 0 0 1-.944.12l-2.75-2.5a.625.625 0 0 1 .841-.925l2.208 2.007l3.849-5.886a.625.625 0 0 1 .865-.181Z" clip-rule="evenodd" />
                </svg>
              </SelectItemIndicator>
            </SelectItem>
          </SelectGroup>
        </SelectViewport>

        <SelectScrollDownButton class="SelectScrollButton">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15">
            <path fill="currentColor" fill-rule="evenodd" d="M3.135 6.158a.5.5 0 0 1 .707-.023L7.5 9.565l3.658-3.43a.5.5 0 0 1 .684.73l-4 3.75a.5.5 0 0 1-.684 0l-4-3.75a.5.5 0 0 1-.023-.707Z" clip-rule="evenodd" />
          </svg>
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
  width: 16px;
  height: 16px;
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
