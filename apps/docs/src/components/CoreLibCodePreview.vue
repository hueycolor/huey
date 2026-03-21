<script setup lang="ts">
import type { Highlighter } from 'shiki'
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from 'reka-ui'
import { createHighlighter } from 'shiki'
import { computed, onMounted, ref, watch } from 'vue'
import { coreLibCodePreviews } from '@/code-previews'
import AppIcon from './AppIcon.vue'

const CLEAR_COPY_AFTER = 3000

const tabs = coreLibCodePreviews.map(t => ({ label: t.label, value: t.value }))
const selectedTab = ref(tabs[0].value)
const highlighter = ref<Highlighter | null>(null)
const hasCopied = ref(false)

const highlightedCode = computed(() => {
  const result: Record<string, string> = {}

  for (const tab of coreLibCodePreviews) {
    if (highlighter.value) {
      result[tab.value] = highlighter.value.codeToHtml(tab.code, {
        lang: 'typescript',
        theme: 'vesper',
      })
    }
  }
  return result
})

const currentCode = computed(() => {
  return coreLibCodePreviews.find(t => t.value === selectedTab.value)?.code ?? ''
})

onMounted(async () => {
  highlighter.value = await createHighlighter({
    themes: ['vesper'],
    langs: ['typescript'],
  })
})

async function copyToClipboard() {
  try {
    await navigator.clipboard.writeText(currentCode.value)
  }
  catch (err) {
    console.error('Failed to copy text: ', err)
  }

  hasCopied.value = true
  window.dispatchEvent(new CustomEvent('huey:celebrate'))
}

watch(hasCopied, () => {
  setTimeout(() => {
    hasCopied.value = false
  }, CLEAR_COPY_AFTER)
})
</script>

<template>
  <TabsRoot v-model="selectedTab" class="tabs-root">
    <TabsList class="tabs-list">
      <TabsTrigger
        v-for="tab in tabs"
        :key="tab.value"
        class="trigger"
        :value="tab.value"
      >
        {{ tab.label }}
      </TabsTrigger>
    </TabsList>

    <div class="code-window">
      <div class="window-header">
        <div class="window-actions">
          <span data-window-action="close" />
          <span data-window-action="minimize" />
          <span data-window-action="fullscreen" />
        </div>
        <span class="filename">index.ts</span>
        <div class="code-actions">
          <button class="copy-button" @click="copyToClipboard">
            <AppIcon v-if="hasCopied" icon="feather:check" style="font-size: 20px;" />
            <AppIcon v-else icon="feather:copy" style="font-size: 20px;" />
          </button>
        </div>
      </div>
      <TabsContent
        v-for="tab in coreLibCodePreviews"
        :key="tab.value"
        :value="tab.value"
        class="tab-content"
      >
        <div
          v-if="highlightedCode[tab.value]"
          class="code-block"
          v-html="highlightedCode[tab.value]"
        />
        <pre v-else class="code-block code-fallback"><code>{{ tab.code }}</code></pre>
      </TabsContent>
    </div>
  </TabsRoot>
</template>

<style scoped>
.tabs-root {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-32);

  .tabs-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: var(--spacing-8);

    .trigger {
      padding: var(--spacing-16) calc(var(--spacing-12) + var(--spacing-6));
      border-radius: var(--radius-8);
      color: var(--color-zinc-400);
      font: var(--label-md);
      cursor: pointer;
      transition: all 150ms ease-out;
      background-color: color-mix(in srgb, var(--color-zinc-700) 12%, transparent);
      border: 1px solid var(--color-zinc-700);

      &:hover {
        color: var(--color-zinc-200);
      }

      &[data-state='active'] {
        color: var(--color-zinc-50);
        background-color: var(--color-zinc-700);
      }
    }
  }

  .code-window {
    height: 420px;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-24);
    border-radius: var(--radius-12);
    border: 1px solid var(--color-zinc-800);
    background-color: var(--color-zinc-900);
    overflow: hidden;
    padding: var(--spacing-16);

    .window-header {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      align-items: center;

      .window-actions {
        display: flex;
        gap: var(--spacing-8);

        [data-window-action] {
          width: 12px;
          height: 12px;
          border-radius: var(--radius-full);

          &[data-window-action="close"] {
            background-color: #ff5f57;
          }

          &[data-window-action="minimize"] {
            background-color: #febc2e;
          }

          &[data-window-action="fullscreen"] {
            background-color: #28c840;
          }
        }
      }

      .filename {
        font: var(--docs-xs);
        letter-spacing: var(--docs-sm-spacing);
        color: var(--color-zinc-400);
      }

      .code-actions {
        display: flex;
        justify-content: flex-end;

        .copy-button {
          display: flex;
          justify-content: center;
          align-items: center;
          color: var(--color-zinc-400);
          padding: var(--spacing-4);
          border-radius: var(--radius-8);
          transition: color 150ms ease;
          cursor: pointer;

          &:hover {
            color: var(--color-zinc-200);
          }
        }
      }
    }
  }
}

.code-content {
  padding: var(--spacing-16) var(--spacing-24);
  overflow-x: auto;
}

.tab-content {
  &[data-state='inactive'] {
    display: none;
  }
}

.code-block {
  font: var(--docs-sm);
}

.code-fallback {
  color: var(--color-zinc-300);
  margin: var(--spacing-0);
}

:deep(pre) {
  margin: var(--spacing-0);
  background-color: transparent !important;
}

:deep(code) {
  font: var(--docs-sm);
}
</style>
