<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { TabsContent, TabsIndicator, TabsList, TabsRoot, TabsTrigger } from 'reka-ui'
import Button from '~/components/ui/Button.vue'
import { NpmSnippets } from '~/huey.config'
</script>

<template>
  <TabsRoot class="snippet-tabs" :default-value="NpmSnippets[0]?.name">
    <TabsList class="tabs-list">
      <TabsIndicator class="indicator">
        <div class="bg-grass8 w-full h-full" />
      </TabsIndicator>
      <TabsTrigger
        v-for="snippet in NpmSnippets"
        :key="snippet.name"
        class="trigger"
        :value="snippet.name"
      >
        {{ snippet.name }}
      </TabsTrigger>
    </TabsList>
    <TabsContent
      v-for="snippet in NpmSnippets"
      :key="snippet.name"
      class="tab-content"
      :value="snippet.name"
    >
      <Icon icon="feather:chevron-right" style="font-size: 20px;" />
      <span class="snippet">
        {{ snippet.package }}
      </span>
      <button class="copy-button">
        <Icon icon="feather:copy" style="font-size: 20px;" />
      </button>
    </TabsContent>
  </TabsRoot>
</template>

<style scoped>
.snippet-tabs {
  --npm-snippet-background: var(--color-linen-100);
}

.tabs-list {
  display: flex;
  position: relative;

  .indicator {
    position: absolute;
    left: 0;
    bottom: 0;
    background-color: red;
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
.tab-content {
  display: flex;
  align-items: center;
  gap: var(--spacing-8);
  min-height: 55px;
  padding: var(--spacing-8) var(--spacing-16);
  background-color: var(--npm-snippet-background);
  border-radius: 0 var(--radius-12) var(--radius-12) var(--radius-12);
}
.snippet {
  display: flex;
  height: fit-content;
  flex: 1
}
.copy-button {

  &:hover {
    background-color: transparent;
    cursor: pointer;
  }
}
</style>
