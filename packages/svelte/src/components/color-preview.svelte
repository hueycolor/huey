<script lang="ts">
	import type { HueyColor } from '@huey/core'

	interface Props {
		class?: string
		color: HueyColor
	}

	let { class: className, color }: Props = $props()

	let bg = $derived.by(() => {
		const rgba = color.toRgbString()

		return `
    linear-gradient(${rgba}, ${rgba}),
    repeating-conic-gradient(
      #ffffff 0deg,
      #ffffff 90deg,
      rgba(0, 0, 0, 0.3) 90deg,
      rgba(0, 0, 0, 0.3) 180deg
    ) 25% 25% / var(--opacity-tile) var(--opacity-tile)
  `
	})
</script>

<div
	data-huey-preview
	class={className}
	style:background={bg}
	aria-label={color.toRgbString()}
	role="presentation"
	aria-live="polite"
/>

<style>
	[data-huey-preview] {
		--preview-tile: 20px;
		--opacity-tile: calc(var(--preview-tile) - 50%);

		display: inline-block;
		width: var(--preview-tile);
		height: var(--preview-tile);
		border-radius: calc(var(--preview-tile) - 80%);
	}
</style>