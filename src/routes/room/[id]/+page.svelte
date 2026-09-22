<script lang="ts">
    import { onMount } from "svelte";
    import { page } from "$app/state";
    import { goto } from "$app/navigation";
    
	import PartySocket from "partysocket";
    import Game, { type SGame } from "../../../../shared/game";
    import type Tile from "../../../../shared/tiles";

    const tileBack = "\u{1F02B}";
    
	let socket: PartySocket;
	let roomid = $derived(page.params.id);
	let uuid = $state("");
	let users: { [key: string]: User } = $state({});
	let game: Game | false = $state(false);
	let hand: Tile[] = $state([]);
	let open: Tile[] = $state([]);

	let sortedPlayers = $derived(Object.values(users).sort((a, b) => +b.playing - +a.playing));
	let startable = $derived(!Object.values(users).filter(user => user.playing).length);

	let draggedIndex: number | undefined;
	
	function dropHand(targetIndex: number){
		if(draggedIndex === undefined || !hand) return;
		const [draggedTile] = hand.splice(draggedIndex, 1);
		hand.splice(targetIndex, 0, draggedTile);
		draggedIndex = undefined;
		send("sortHand", { tiles: hand.map(tile => tile.id) });
	}

	function dropOpen(targetIndex: number){
		if(draggedIndex === undefined || !open) return;
		const [draggedTile] = open.splice(draggedIndex, 1);
		open.splice(targetIndex, 0, draggedTile);
		draggedIndex = undefined;
		send("sortOpen", { tiles: open.map(tile => tile.id) });
	}

	let events: { [key: string]: Function } = {
		uuid(id: string){ uuid = id; },
		users(p: { [key: string]: User }){ users = p; },
		game(g: SGame | false){
			game = g && Game.import(g);
			if(game && game.players[uuid]){
				hand = game.players[uuid].hand.tiles;
				open = game.players[uuid].open.tiles;
			}
		}
	};

	onMount(function(){
		socket = new PartySocket({
			host: import.meta.env.DEV ? `${window.location.hostname}:1999` : window.location.host,
			room: roomid
		});

		socket.onclose = () => goto("/");
		socket.onmessage = function({ data }){
			let { event, payload }: Message = JSON.parse(data);
			events[event]?.(payload);
		}
		
		return () => socket.close();
	});

	function send(event: string, payload?: any){
		socket.send(JSON.stringify({ event, payload }));
	}
</script>

<a href="/">home</a>
<h1>room: {roomid}</h1>
<h2>game</h2>
{#if game}
	<button onclick={() => send("endGame")}>end game</button>
	<h4>Deck <button onclick={() => send("drawTile")}>draw</button></h4>
	<span>{game.deck.size()} tiles</span>
	<h4>Current tile <button disabled={!game.current} onclick={() => send("drawTile", true)}>draw</button></h4>
	{#if game.current}
		<span style="font-size: 75px;">{game.current.render()}</span>
	{:else}
		<span>empty</span>
	{/if}
	<h4>Discard pile</h4>
	<div>
		{#each (game as Game).pile.tiles as tile (tile.id)}
			<span style="font-size: 50px;">{tile.render()}</span>
		{:else}
			<span>empty</span>
		{/each}
	</div>
{:else}
	<button onclick={() => send("startGame")} disabled={startable}>start game</button>
{/if}

<h2>users</h2>
{#each sortedPlayers as user (user.id)}
	<div style="color: {user.playing ? "unset" : "gray"}">
		{#if user.id == uuid}
			<b>
				<span onblur={_ => send("updateUser", { username: user.username.replaceAll(/\s/g, "") })} bind:innerText={user.username} contenteditable></span>
				(you)
			</b>
		{:else}
			<b>{user.username}</b>
		{/if}
		<ul>
			<li>Points: {user.points}
    			{#if user.id == uuid}
    				<button onclick={_ => send("add", parseFloat(prompt("How many: ") || "0") || 0)}>add</button>
    			{:else}
    			    <button onclick={_ => send("pay", { recipient: user.id, amount: parseFloat(prompt("How many: ") || "0") || 0 })}>pay</button>
    			{/if}
			</li>
			{#if game && user.playing}
				<li>Open:
					{#if user.id == uuid && open}
						{#if open.length}
							<div>
							{#each open as tile, i (tile.id)}
								<span
									draggable="true"
									ondragstart={_ => draggedIndex = i}
									ondragover={e => e.preventDefault()}
									ondrop={_ => dropOpen(i)}
									onclick={() => send("closeTile", tile.id)}
									onkeydown={() => {}}
									role="button"
									tabindex="0"
									style="font-size: 75px;">{tile.render()}</span>								
							{/each}
						</div>
						{:else}
							<span>empty</span>
						{/if}
					{:else}
						{#each game.players[user.id].open.tiles as tile (tile.id)}
							<span style="font-size: 50px;">{tile.render()}</span>
						{:else}
							<span>empty</span>
						{/each}
					{/if}
				</li>
				<li>Hand:
					{#if user.id == uuid && hand}
						<div>
							{#each hand as tile, i (tile.id)}
								<span
									draggable="true"
									ondragstart={_ => draggedIndex = i}
									ondragover={e => e.preventDefault()}
									ondrop={_ => dropHand(i)}
									onclick={() => send("openTile", tile.id)}
									oncontextmenu={e => {
										e.preventDefault();
										send("discardTile", tile.id);
									}}
									onkeydown={() => {}}
									role="button"
									tabindex="0"
									style="font-size: 75px;">{tile.render()}</span>
							{:else}
								<span>empty??</span>
							{/each}
						</div>
					{:else}
						<span style="font-size: 50px;">{tileBack.repeat(game.players[user.id].hand.size())}</span>
					{/if}
				</li>
			{:else}
				<li>Stance:
					{ ["spectator", "player"][+user.playing] }
					{#if user.id == uuid && !game}
						<button onclick={_ => send("updateUser", { playing: !user.playing })}>toggle</button>
					{/if}
				</li>
			{/if}
		</ul>
	</div>
{/each}