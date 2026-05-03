<script lang="ts">
  import type { HueyColor } from '@hueycolor/core'
  import type { HueyState } from '../src/lib/context/huey-context.svelte'
  import { useHueyContext } from '../src/lib/context/huey-context.svelte'

  interface Props {
    onReady: (handle: { state: HueyState, getColor: () => string | HueyColor }) => void
    getColor: () => string | HueyColor
  }

  let { onReady, getColor }: Props = $props()

  const state = useHueyContext()
  onReady({ state, getColor })
</script>
