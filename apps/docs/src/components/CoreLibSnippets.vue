<script setup lang="ts">
import { ref, watch } from 'vue'
import AppIcon from '@/components/AppIcon.vue'
import TabbedSnippet from '@/components/TabbedSnippet.vue'
import { coreLibSnippets } from '@/snippets'

const CLEAR_COPY_AFTER = 3000 // ms

const tabs = coreLibSnippets.map(snippet => ({ label: snippet.name, value: snippet.package }))
const hasCopiedCommand = ref(false)

async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text)
  }
  catch (err) {
    console.error('Failed to copy text: ', err)
  }

  hasCopiedCommand.value = true

  window.dispatchEvent(new CustomEvent('huey:celebrate'))
}

watch(hasCopiedCommand, () => {
  setTimeout(() => {
    hasCopiedCommand.value = false
  }, CLEAR_COPY_AFTER)
})
</script>

<template>
  <TabbedSnippet
    :tabs="tabs"
    background-color="var(--color-zinc-800)"
    foreground-color="var(--color-stone-50)"
  >
    <template #trigger="{ tab }">
      {{ tab.label }}
    </template>
    <template #content="{ tab }">
      <AppIcon icon="feather:chevron-right" style="font-size: 20px;" />
      <span class="snippet">
        {{ tab.value }}
      </span>
      <button class="copy-button" hc-button @click="copyToClipboard(tab.value)">
        <AppIcon v-if="hasCopiedCommand" icon="feather:check" style="font-size: 20px;" />
        <AppIcon v-else icon="feather:copy" style="font-size: 20px;" />
      </button>
    </template>
  </TabbedSnippet>
</template>

<style scoped>
:deep(.tabs-list) {
  margin-bottom: -1px;
}

:deep(.content-wrapper) {
  border: 1px solid var(--color-zinc-700);
}

:deep(.indicator-wrapper) {
  border: 1px solid var(--color-zinc-700);
  border-bottom: unset;
}

.snippet {
  font: var(--docs-md);
  display: flex;
  height: fit-content;
  flex: 1;
}

.copy-button {
  color: inherit;
  padding: var(--spacing-8);

  &:hover {
    background-color: transparent;
    cursor: pointer;
  }
}

@media(width >= 50rem) {
  .snippet {
    font: var(--docs-md);
  }
}
</style>
