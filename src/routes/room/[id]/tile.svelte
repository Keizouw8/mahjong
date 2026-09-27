<script lang="ts">
    import type { DragEventHandler, MouseEventHandler } from "svelte/elements";
    import type Tile from "../../../../shared/tiles";

	interface Props{
		tile: Tile;
		size?: number;
		onDrag?: DragEventHandler<HTMLSpanElement>;
		onDrop?: DragEventHandler<HTMLSpanElement>;
		onClick?: MouseEventHandler<HTMLSpanElement>;
		onContext?: MouseEventHandler<HTMLSpanElement>;
		[key: string]: unknown;
	}

	let { tile, interactive, onDrop, onDrag, onClick, onContext, size }: Props = $props();
	let fontSize = $derived(size || 50);
	$inspect(fontSize);
</script>
{#if interactive}
	<span draggable="true"
		ondragstart={onDrag}
		ondragover={e => e.preventDefault()}
		ondrop={onDrop}
		onclick={onClick}
		oncontextmenu={onContext}
		onkeydown={() => {}}
		role="button"
		tabindex="0"
		style="font-size: {fontSize}px;">{tile.render()}
	</span>
{:else}
	<span style="font-size: {fontSize}px;">{tile.render()}</span>
{/if}