<script setup lang="ts">
import { TextMorph } from 'torph/vue'
import { onMounted, ref, watch } from 'vue'
import AppIcon from '@/components/AppIcon.vue'
import TabbedSnippet from '@/components/TabbedSnippet.vue'
import { uiLibSnippets } from '@/snippets'

const CLEAR_COPY_AFTER = 3000 // ms

const frameworkIcons: Record<string, string> = {
  vue: 'ri:vuejs-line',
  svelte: 'ri:svelte-line',
}

const tabs = uiLibSnippets.map(snippet => ({ label: snippet.name, value: snippet.package }))
const mounted = ref(false)
onMounted(() => {
  mounted.value = true
})
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
      <span style="text-transform: capitalize;">
        {{ tab.label }}
      </span>
    </template>
    <template #panel="{ selectedTab }">
      <AppIcon icon="feather:chevron-right" style="font-size: 20px;" />
      <TextMorph
        :text="mounted ? selectedTab : ''"
        :duration="400"
        ease="cubic-bezier(0.19, 1, 0.22, 1)"
        class="snippet"
      />
      <button class="copy-button" hc-button @click="copyToClipboard(selectedTab)">
        <AppIcon v-if="hasCopiedCommand" icon="feather:check" style="font-size: 20px;" />
        <AppIcon v-else icon="feather:copy" style="font-size: 20px;" />
      </button>
    </template>
  </TabbedSnippet>
</template>

<style scoped>
.snippet {
  font: var(--docs-sm);
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
