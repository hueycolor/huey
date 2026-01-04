<script setup lang="ts">
import { ColorThumb } from '..'
</script>

<template>
  <div huey-slider-internal>
    <ColorThumb />
  </div>
</template>

<style>
[huey-slider-internal] {
  width: 129px;
  height: 16px;
  border-radius: calc(1px * infinity);
}
</style>
