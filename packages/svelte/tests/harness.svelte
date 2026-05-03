<script lang="ts">
  import type { HueyColor } from '@hueycolor/core'
  import type { HueyState } from '../src/lib/context/huey-context.svelte'
  import HueyRoot from '../src/lib/components/huey-root.svelte'
  import Probe from './probe.svelte'

  interface Props {
    initial: string | HueyColor
    onReady: (handle: { state: HueyState, getColor: () => string | HueyColor }) => void
  }

  let { initial, onReady }: Props = $props()
  let color = $state<string | HueyColor>(initial)
</script>

<HueyRoot bind:color>
  <Probe {onReady} getColor={() => color} />
</HueyRoot>
