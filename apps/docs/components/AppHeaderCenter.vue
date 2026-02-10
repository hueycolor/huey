<template>
  <UContentSearchButton
    :collapsed="false"
    class="w-full header-search-bar"
    variant="soft"
    :ui="{
      leadingIcon: 'size-4 mr-1',
    }"
  />
</template>

<style>
.header-search-bar {
  background-color: color-mix(in srgb, var(--color-linen-200) 50%, transparent);
  border: 1px solid var(--color-linen-200);

  &:hover {
    background-color: color-mix(in srgb, var(--color-linen-200) 100%, transparent);;
  }

  &:focus-visible {
    outline: 2px solid var(--color-beige-950);
    outline-offset: var(--spacing-2);
  }
}

kbd {
  background: var(--color-beige-100);
}
</style>
