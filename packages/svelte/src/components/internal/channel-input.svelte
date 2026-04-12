<script lang="ts" module>
  import type { HTMLInputAttributes } from 'svelte/elements'

  export type ChannelInputProps = HTMLInputAttributes
</script>

<script lang="ts">
  let { ...rest }: ChannelInputProps = $props()
</script>

<input {...rest} autocomplete="off" spellcheck="false" dir="ltr" />
