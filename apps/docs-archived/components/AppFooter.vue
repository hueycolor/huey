<script setup lang="ts">
import SocialLinks from '~/components/ui/SocialLinks.vue'
</script>

<template>
  <UFooter>
    <template #left>
      <span huey-wordmark>Huey</span>
    </template>

    <template #right>
      <SocialLinks />
    </template>
  </UFooter>
</template>
