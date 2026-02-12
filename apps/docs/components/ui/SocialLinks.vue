<script setup lang="ts">
const site = useSiteConfig()
const appConfig = useAppConfig()

const links = computed(() => appConfig.github && appConfig.github.url
  ? [
      {
        'icon': 'i-simple-icons-github',
        'to': appConfig.github.url,
        'target': '_blank',
        'aria-label': 'GitHub',
      },
    ]
  : [])
</script>

<template v-if="links?.length">
  <UButton
    v-for="(link, index) of links"
    :key="index"
    class="button"
    v-bind="{ color: 'neutral', variant: 'ghost', ...link }"
  />
</template>
