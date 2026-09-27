<script lang="ts">
    import type { MouseEventHandler } from "svelte/elements";
    import type Tile from "../../../../shared/tiles";
    import TileElement from "./tile.svelte";
    import type PartySocket from "partysocket";

	interface Props{
		tiles: Tile[];
		interactive?: boolean;
		size?: number;
		onClick?: (tile: Tile, i: number) => MouseEventHandler<HTMLSpanElement>;
		onContext?: (tile: Tile, i: number) => MouseEventHandler<HTMLSpanElement>;
		socket?: PartySocket;
		sortEvent?: string;
	}

	let { tiles, size, onClick, onContext, interactive, socket, sortEvent }: Props = $props();

	let draggedIndex: number | undefined;

	function drop(targetIndex: number){
		if(draggedIndex === undefined || !tiles) return;
		const [draggedTile] = tiles.splice(draggedIndex, 1);
		tiles.splice(targetIndex, 0, draggedTile);
		draggedIndex = undefined;
		socket?.send(JSON.stringify({ event: sortEvent, payload: { tiles: tiles.map(tile => tile.id) } }));
	}
</script>
{#if tiles.length}
	<div>
		{#each tiles as tile, i (tile.id)}
			{#if interactive}
				<TileElement {tile} {size}
					onClick={onClick?.(tile, i)}
					onContext={onContext?.(tile, i)}
					onDrop={() => drop(i)}
					onDrag={_ => draggedIndex = i} interactive />
			{:else}
				<TileElement {tile} {size} />
			{/if}
		{/each}
	</div>
{:else}
	<span>empty</span>
{/if}