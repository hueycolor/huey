<script setup lang="ts">
import NpmSnippet from '~/components/NpmSnippet.vue'
import Button from '~/components/ui/Button.vue'
import Huey from '~/components/ui/Huey.vue'
</script>

<template>
  <section class="hero">
    <div class="content">
      <h1 class="title">
        A composable color picker for the web
      </h1>
      <div class="snippets">
        <NpmSnippet />
        <div class="actions">
          <Button as="a" href="/overview/installation" class="main-action">
            Get Started
          </Button>
          <Button as="a" href="#" variant="secondary">
            Demo
          </Button>
        </div>
      </div>
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

    .title {
      font: var(--title-h1);
      letter-spacing: var(--title-h1-spacing);
    }

    .content {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-40);
      width: 400px;
    }

    .snippets {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-16);

      .actions {
        display: flex;
        align-items: center;
        gap: var(--spacing-16);

        .main-action {
          flex: 1
        }
      }
    }
  }
</style>
