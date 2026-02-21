<script setup lang="ts">
import { useRoute } from 'nuxt/app'
import Button from '~/components/ui/Button.vue'
import SocialLinks from '~/components/ui/SocialLinks.vue'

const site = useSiteConfig()
const appConfig = useAppConfig()
const route = useRoute()

const isHomePage = computed(() => route.path === '/')
</script>

<template>
  <UHeader
    :ui="{ center: 'flex-1', left: 'left' }"
    to="/"
    :title="appConfig.header?.title || site.name"
    :compact="isHomePage"
  >
    <AppHeaderCenter v-if="!isHomePage" />

    <template #title>
      <AppHeaderLogo class="h-6 w-auto shrink-0" />
    </template>

    <template #right>
      <AppHeaderCTA />
      <UContentSearchButton class="lg:hidden" />
      <div v-if="isHomePage" class="header-links">
        <Button as="a" target="_blank" href="https://github.com/hueycolor/huey" variant="tertiary">
          Github
        </Button>
        <Button as="a" href="/overview/installation" variant="secondary">
          Documentation
        </Button>
      </div>
      <SocialLinks v-else />
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

[compact="true"] {
  div[data-slot="container"] {
   width: var(--content-width);
   padding: 0;
  }
}

.header-links {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-16)
}
</style>
