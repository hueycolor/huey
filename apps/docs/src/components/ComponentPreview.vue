<script setup lang="ts">
import type { Highlighter } from 'shiki'
import type { Framework } from '@/types'
import { TabsIndicator, TabsList, TabsRoot, TabsTrigger } from 'reka-ui'
import { createHighlighter } from 'shiki'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { componentCodeExamples } from '@/component-code-examples'
import { FRAMEWORK_CHANGE_EVENT, getStoredFramework, setStoredFramework } from '@/framework-preference'
import AppIcon from './AppIcon.vue'

const props = defineProps<{
  componentKey: string
}>()

const CLEAR_COPY_AFTER = 3000

const framework = ref<Framework>('vue')
const showCode = ref(false)
const highlighter = ref<Highlighter | null>(null)
const hasCopied = ref(false)

const codeExample = computed(() => {
  const examples = componentCodeExamples[props.componentKey]

  if (!examples)
    return ''

  return examples[framework.value]
})

const highlightedCode = computed(() => {
  if (!highlighter.value || !codeExample.value)
    return ''

  return highlighter.value.codeToHtml(codeExample.value, {
    lang: framework.value === 'vue' ? 'vue' : 'svelte',
    theme: 'vesper',
  })
})

const frameworks = [
  { value: 'vue', label: 'Vue', icon: 'logos:vue' },
  { value: 'svelte', label: 'Svelte', icon: 'logos:svelte-icon' },
]

function onFrameworkChange(event: Event) {
  const detail = (event as CustomEvent).detail

  if (detail?.framework) {
    framework.value = detail.framework
  }
}

async function initHighlighter() {
  if (highlighter.value)
    return
  highlighter.value = await createHighlighter({
    themes: ['vesper'],
    langs: ['vue', 'svelte'],
  })
}

async function toggleCode() {
  showCode.value = !showCode.value
  if (showCode.value) {
    await initHighlighter()
  }
}

async function copyToClipboard() {
  try {
    await navigator.clipboard.writeText(codeExample.value)
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

onMounted(() => {
  framework.value = getStoredFramework()
  window.addEventListener(FRAMEWORK_CHANGE_EVENT, onFrameworkChange)
})

onUnmounted(() => {
  window.removeEventListener(FRAMEWORK_CHANGE_EVENT, onFrameworkChange)
})
</script>

<template>
  <div class="component-preview">
    <div class="preview-area">
      <slot />
    </div>

    <button class="toggle-button" @click="toggleCode">
      <AppIcon :icon="showCode ? 'feather:eye' : 'feather:code'" />
      {{ showCode ? 'Preview' : 'Code' }}
    </button>

    <div v-if="showCode" class="code-panel">
      <div class="code-header">
        <TabsRoot
          :model-value="framework"
          class="framework-tabs"
          @update:model-value="(v: string) => { framework = v as Framework; setStoredFramework(framework) }"
        >
          <TabsList class="framework-tabs-list">
            <TabsIndicator class="framework-indicator-wrapper">
              <div class="framework-indicator" />
            </TabsIndicator>
            <TabsTrigger
              v-for="fw in frameworks"
              :key="fw.value"
              :value="fw.value"
              class="framework-trigger"
            >
              <AppIcon :icon="fw.icon" class="framework-icon" />
              {{ fw.label }}
            </TabsTrigger>
          </TabsList>
        </TabsRoot>
        <button class="copy-button" @click="copyToClipboard">
          <AppIcon v-if="hasCopied" icon="feather:check" />
          <AppIcon v-else icon="feather:copy" />
        </button>
      </div>
      <div class="code-block">
        <div v-if="highlightedCode" v-html="highlightedCode" />
        <pre v-else><code>{{ codeExample }}</code></pre>
      </div>
    </div>
  </div>
</template>

<style scoped>
.component-preview {
  border-radius: var(--radius-12);
  border: 1px solid var(--color-neutral-100);
  overflow: hidden;
}

.preview-area {
  padding: var(--spacing-24);
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  background-image: radial-gradient(
    color-mix(in srgb, var(--color-neutral-500) 80%, transparent) 0.5px,
    var(--color-neutral-50) 0.5px
  );
  background-size: 10px 10px;
}

.toggle-button {
  display: flex;
  align-items: center;
  gap: var(--spacing-8);
  width: 100%;
  padding: var(--spacing-10) var(--spacing-16);
  font: var(--label-sm);
  color: var(--color-stone-600);
  background-color: var(--color-linen-100);
  border-top: 1px solid var(--color-neutral-100);
  cursor: pointer;
  transition: all 150ms ease-out;

  &:hover {
    color: var(--color-stone-950);
    background-color: var(--color-linen-200);
  }
}

.code-panel {
  border-top: 1px solid var(--color-zinc-800);
  background-color: var(--color-zinc-900);
}

.code-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-10) var(--spacing-16);
  border-bottom: 1px solid var(--color-zinc-800);
}

.framework-tabs-list {
  display: flex;
  position: relative;
}

.framework-indicator-wrapper {
  position: absolute;
  left: 0;
  bottom: 0;
  width: var(--reka-tabs-indicator-size);
  height: 100%;
  transform: translateX(var(--reka-tabs-indicator-position));
  transition: all 150ms cubic-bezier(0.16, 1, 0.3, 1);
}

.framework-indicator {
  width: 100%;
  height: 100%;
  background-color: var(--color-zinc-800);
  border-radius: var(--radius-6);
}

.framework-trigger {
  display: flex;
  align-items: center;
  gap: var(--spacing-6);
  font: var(--label-sm);
  color: var(--color-zinc-400);
  cursor: pointer;
  padding: var(--spacing-4) var(--spacing-8);
  border-radius: var(--radius-6);
  background-color: transparent;
  z-index: 1;
  opacity: 0.7;
  transition: opacity 150ms ease;

  &[data-state='active'] {
    opacity: 1;
    color: var(--color-zinc-200);
  }

  &:hover {
    opacity: 1;
  }
}

.framework-icon {
  width: 16px;
  height: 16px;
}

.copy-button {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-zinc-400);
  padding: var(--spacing-4);
  border-radius: var(--radius-8);
  cursor: pointer;
  transition: color 150ms ease;

  &:hover {
    color: var(--color-zinc-200);
  }
}

.code-block {
  padding: var(--spacing-16);
  overflow-x: auto;
  font: var(--docs-sm);
}

.code-block pre {
  margin: 0;
  color: var(--color-zinc-300);
}

:deep(pre) {
  margin: 0;
  background-color: transparent !important;
}

:deep(code) {
  font: var(--docs-sm);
}
</style>
