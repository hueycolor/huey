<script setup lang="ts">
import { TabsContent, TabsIndicator, TabsList, TabsRoot, TabsTrigger } from 'reka-ui'
</script>

<template>
  <TabsRoot default-value="vue" class="snippet-tabs">
    <TabsList class="tab-triggers">
      <TabsIndicator class="indicator">
        <div class="bg-grass8 w-full h-full" />
      </TabsIndicator>
      <TabsTrigger
        class="trigger"
        value="vue"
      >
        Vue
      </TabsTrigger>
      <TabsTrigger
        class="trigger"
        value="svelte"
      >
        Svelte
      </TabsTrigger>
    </TabsList>
    <TabsContent
      class="tab-content"
      value="vue"
    >
      Tab 1
    </TabsContent>
    <TabsContent
      class="tab-content"
      value="svelte"
    >
      Tab 2
    </TabsContent>
  </TabsRoot>
</template>

<style scoped>
.snippet-tabs {
  --npm-snippet-background: var(--color-linen-100);
}

.tab-triggers {
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
    cursor: pointer;
    z-index: 1;
    padding: var(--spacing-8) var(--spacing-16);
    border-radius: var(--radius-12) var(--radius-12) 0 0;
    background-color: transparent;
  }

}
.tab-content {
  min-height: 55px;
  padding: var(--spacing-8) var(--spacing-16);
  background-color: var(--npm-snippet-background);
  border-radius: 0 var(--radius-12) var(--radius-12) var(--radius-12);
}
</style>
