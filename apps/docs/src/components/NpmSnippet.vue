<script setup lang="ts">
import { TabsContent, TabsIndicator, TabsList, TabsRoot, TabsTrigger } from 'reka-ui'
import { ref, watch } from 'vue'
import AppIcon from '@/components/AppIcon.vue'
import { NpmSnippets } from '@/snippets'

const selectedFramework = ref(NpmSnippets[0].package)
const hasCopiedCommand = ref(false)

async function copyToClipboard() {
  try {
    await navigator.clipboard.writeText(selectedFramework.value)
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
  }, 3000)
})
</script>

<template>
  <TabsRoot v-model="selectedFramework" class="snippet-tabs" :default-value="selectedFramework">
    <TabsList class="tabs-list">
      <TabsIndicator class="indicator">
        <div class="bg-grass8 w-full h-full" />
      </TabsIndicator>
      <TabsTrigger
        v-for="snippet in NpmSnippets"
        :key="snippet.package"
        class="trigger"
        :value="snippet.package"
      >
        {{ snippet.name }}
      </TabsTrigger>
    </TabsList>
    <div class="content-wrapper">
      <TabsContent
        v-for="snippet in NpmSnippets"
        :key="snippet.package"
        class="tab-content"
        :value="snippet.package"
      >
        <AppIcon icon="feather:chevron-right" style="font-size: 20px;" />
        <span class="snippet">
          {{ snippet.package }}
        </span>
        <button class="copy-button" hc-button @click="copyToClipboard">
          <AppIcon v-if="hasCopiedCommand" icon="feather:check" style="font-size: 20px;" />
          <AppIcon v-else icon="feather:copy" style="font-size: 20px;" />
        </button>
      </TabsContent>
    </div>
  </TabsRoot>
</template>

<style scoped>
.snippet-tabs {
  --npm-snippet-background: var(--color-linen-100);
  --top-left-radius: 0;

  &:has(.trigger:first-of-type:not([data-state='active'])) {
    --top-left-radius: var(--radius-12);
  }
}

.tabs-list {
  display: flex;
  position: relative;

  .indicator {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 10px;
    height: 10px;
    width: var(--reka-tabs-indicator-size);
    height: 100%;
    border-radius: var(--radius-12) var(--radius-12) 0 0;
    background-color: var(--npm-snippet-background);
    transform: translateX(var(--reka-tabs-indicator-position));
    transition: all 150ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  .trigger {
    text-transform: capitalize;
    cursor: pointer;
    z-index: 1;
    padding: var(--spacing-8) var(--spacing-16);
    border-radius: var(--radius-12) var(--radius-12) 0 0;
    background-color: transparent;
  }

}

.content-wrapper {
  display: flex;
  background-color: var(--npm-snippet-background);
  border-radius: var(--top-left-radius) var(--radius-12) var(--radius-12) var(--radius-12);
  transition: border-radius 150ms ease-out;
  min-height: 55px;
  padding: var(--spacing-8) var(--spacing-16);
}

.tab-content {
  flex: 1;
  display: flex;
  align-items: center;
  gap: var(--spacing-8);

  &[data-state='inactive'] {
    display: none;
  }

  &[data-state='active'] {
    display: flex;
  }
}
.snippet {
  font-family: 'DM Mono';
  display: flex;
  height: fit-content;
  flex: 1
}
.copy-button {
  padding: var(--spacing-8);

  &:hover {
    background-color: transparent;
    cursor: pointer;
  }
}
</style>
