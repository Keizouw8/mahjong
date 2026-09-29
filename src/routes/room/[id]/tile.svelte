<script lang="ts">
    import type { DragEventHandler, MouseEventHandler } from "svelte/elements";
    import type Tile from "../../../../shared/tiles";

	interface Props{
		tile: Tile;
		interactive?: boolean;
		size?: number;
		onDrag?: DragEventHandler<HTMLSpanElement>;
		onDrop?: DragEventHandler<HTMLSpanElement>;
		onClick?: MouseEventHandler<HTMLSpanElement>;
		onContext?: MouseEventHandler<HTMLSpanElement>;
		[key: string]: unknown;
	}

	let { tile, interactive, onDrop, onDrag, onClick, onContext, size }: Props = $props();
	let fontSize = $derived(size || 50);
</script>

{#if interactive}
	<span draggable="true"
		ondragstart={e => {
			e.dataTransfer?.setData("text/plain", tile.id);
			onDrag?.(e);
		}}
		ondragover={e => e.preventDefault()}
		ondrop={onDrop}
		onclick={onClick}
		oncontextmenu={onContext}
		onkeydown={() => {}}
		role="button"
		tabindex="0"
		style="font-size: {fontSize}px;"
		data-tile={tile.id} >{tile.render()}
	</span>
{:else}
	<span style="font-size: {fontSize}px;">{tile.render()}</span>
{/if}

<style>
	span[draggable="true"] {
		touch-action: none;
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		user-select: none;
		display: inline-block;
	}
</style>
