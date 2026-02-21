<script setup lang="ts">
import Huey from '~/components/ui/Huey.vue'
</script>

<template>
  <section class="hero">
    <div class="content">
      <h1>A composable color picker for the web</h1>
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

    padding-block: 200px;

    .content {
      display: flex;
      flex-direction: column;
      width: 400px;
    }
  }
</style>
