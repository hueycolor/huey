<script setup lang="ts">
import SocialLinks from '~/components/ui/SocialLinks.vue'

const site = useSiteConfig()
const appConfig = useAppConfig()
</script>

<template>
  <UHeader
    :ui="{ center: 'flex-1', left: 'left' }"
    to="/"
    :title="appConfig.header?.title || site.name"
  >
    <AppHeaderCenter />

    <template #title>
      <AppHeaderLogo class="h-6 w-auto shrink-0" />
    </template>

    <template #right>
      <AppHeaderCTA />
      <UContentSearchButton class="lg:hidden" />
      <SocialLinks />
    </template>

    <template #toggle="{ open, toggle }">
      <IconMenuToggle
        :open="open"
        class="lg:hidden"
        @click="toggle"
      />
    </template>

    <template #body>
      <AppHeaderBody />
    </template>
  </UHeader>
</template>

<style>
.left {
  a:focus-visible {
    border-radius: var(--radius-8);
    outline: 2px solid var(--color-beige-950);
    outline-offset: var(--spacing-2);
  }
}

.button {
  &:hover {
    background-color: var(--color-linen-200);
  }
  &:focus-visible {
    background-color: var(--color-linen-200);
    outline: 2px solid var(--color-beige-950);
    outline-offset: var(--spacing-2);
  }
}
</style>
