<script setup lang="ts">
import NpmSnippet from '~/components/NpmSnippet.vue'
import Huey from '~/components/ui/Huey.vue'
</script>

<template>
  <section class="hero">
    <div class="content">
      <h1>A composable color picker for the web</h1>
      <NpmSnippet />
    </div>
    <div class="mascot">
      <Huey />
    </div>
  </section>
</template>

<style scoped>
  .hero {
    width: fit-content;

    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-16);

    padding-block: 200px;

    .content {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-40);
      width: 400px;
    }
  }
</style>

<style>
/* This applies only to the homepage */
h1 {
  font: var(--title-h1);
  letter-spacing: var(--title-h1-spacing);
}

h2 {
  font: var(--title-h2);
  letter-spacing: var(--title-h2-spacing);
}

h3 {
  font: var(--title-h3);
  letter-spacing: var(--title-h3-spacing);
}

h4 {
  font: var(--title-h4);
  letter-spacing: var(--title-h4-spacing);
}

h5 {
  font: var(--title-h5);
  letter-spacing: var(--title-h5-spacing);
}

h6 {
  font: var(--title-h6);
  letter-spacing: var(--title-h6-spacing);
}
</style>
