<script setup lang="ts">
import { ref, watch } from 'vue'
import AppIcon from '@/components/AppIcon.vue'
import TabbedSnippet from '@/components/TabbedSnippet.vue'
import { NpmSnippets } from '@/snippets'

const CLEAR_COPY_AFTER = 3000 // ms

const frameworkIcons: Record<string, string> = {
  vue: 'ri:vuejs-line',
  svelte: 'ri:svelte-line',
}

const tabs = NpmSnippets.map(s => ({ label: s.name, value: s.package }))
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
    background-color="var(--npm-snippet-background, var(--color-linen-100))"
  >
    <template #trigger="{ tab }">
      <AppIcon :icon="frameworkIcons[tab.label]" style="font-size: 20px;" />
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
.snippet {
  font-family: 'DM Mono';
  display: flex;
  height: fit-content;
  flex: 1;
}

.copy-button {
  padding: var(--spacing-8);

  &:hover {
    background-color: transparent;
    cursor: pointer;
  }
}
</style>
