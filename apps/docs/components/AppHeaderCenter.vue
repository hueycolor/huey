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
  background-color: color-mix(in srgb, var(--color-beige-200) 50%, transparent);
  border: 1px solid var(--color-beige-200);

  &:hover {
    background-color: color-mix(in srgb, var(--color-beige-200) 100%, transparent);;
  }

  &:focus-visible {
    outline-color: var(--color-beige-950);
    outline-offset: 2px;
    outline-style: solid;
    outline-width: 2px;
  }
}

kbd {
  background: var(--color-beige-100);
}
</style>
