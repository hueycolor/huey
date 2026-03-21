<script setup lang="ts">
import { TabsContent, TabsIndicator, TabsList, TabsRoot, TabsTrigger } from 'reka-ui'
import { ref } from 'vue'

const props = withDefaults(defineProps<{
  tabs: Tab[]
  defaultValue?: string
  indicatorColor?: string
  backgroundColor?: string
}>(), {
  indicatorColor: 'var(--color-grass-8)',
  backgroundColor: 'var(--color-linen-100)',
})

const selectedTab = ref(props.defaultValue ?? props.tabs[0]?.value)
</script>

<script lang="ts">
export interface Tab {
  label: string
  value: string
}
</script>

<template>
  <TabsRoot
    v-model="selectedTab"
    class="snippet-tabs"
    :style="{
      '--snippet-bg': backgroundColor,
      '--snippet-indicator': indicatorColor,
    }"
  >
    <TabsList class="tabs-list">
      <TabsIndicator class="indicator-wrapper">
        <div class="indicator" />
      </TabsIndicator>
      <TabsTrigger
        v-for="tab in tabs"
        :key="tab.value"
        class="trigger"
        :value="tab.value"
      >
        <slot name="trigger" :tab="tab">
          {{ tab.label }}
        </slot>
      </TabsTrigger>
    </TabsList>
    <div class="content-wrapper">
      <TabsContent
        v-for="tab in tabs"
        :key="tab.value"
        class="tab-content"
        :value="tab.value"
      >
        <slot name="content" :tab="tab" :value="tab.value" />
      </TabsContent>
    </div>
  </TabsRoot>
</template>

<style scoped>
.snippet-tabs {
  --top-left-radius: 0;

  &:has(.trigger:first-of-type:not([data-state='active'])) {
    --top-left-radius: var(--radius-12);
  }
}

.tabs-list {
  display: flex;
  position: relative;

  .indicator-wrapper {
    position: absolute;
    left: 0;
    bottom: 0;
    width: var(--reka-tabs-indicator-size);
    height: 100%;
    border-radius: var(--radius-12) var(--radius-12) 0 0;
    background-color: var(--snippet-bg);
    transform: translateX(var(--reka-tabs-indicator-position));
    transition: all 150ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  .indicator {
    width: 100%;
    height: 100%;
    background-color: var(--snippet-indicator);
    border-radius: inherit;
  }

  .trigger {
    display: flex;
    align-items: center;
    gap: var(--spacing-4);
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
  background-color: var(--snippet-bg);
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
</style>
