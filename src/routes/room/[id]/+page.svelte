<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/state";
	import PartySocket from "partysocket";
    import { onMount } from "svelte";
    
	let socket: PartySocket;
	let roomid = $derived(page.params.id);
	let uuid = $state("");
	let players: { [key: string]: Player } = $state({});

	let events: { [key: string]: Function } = {
		uuid(id: string){ uuid = id; },
		players(p: { [key: string]: Player }){ players = p; }
	};

	onMount(function(){
		socket = new PartySocket({
			host: `${window.location.hostname}:${import.meta.env.DEV ? 1999 : window.location.port}`,
			room: roomid
		});

		socket.onclose = () => goto("/");
		socket.onmessage = function({ data }){
			let { event, payload }: Message = JSON.parse(data);
			events[event]?.(payload);
		}
		
		return () => socket.close();
	});

	function send(event: string, payload: any){
		socket.send(JSON.stringify({ event, payload }));
	}
</script>
<a href="/">home</a>
<h1>room: {roomid}</h1>
<h2>players</h2>
{#each Object.values(players) as player}
	{#if player.id == uuid}
		<b>
			<span onblur={_ => send("updateUser", { username: player.username.replaceAll(/\s/g,'') })} bind:innerText={player.username} contenteditable></span>
			(you)
		</b>
	{:else}
		<b>{player.username}</b>
	{/if}
	<ul>
		<li>Stance:
			{#if player.id == uuid}	
				<button onclick={_ => send("updateUser", { playing: !player.playing })}>{ ["spectate", "play"][+player.playing] }</button>
			{:else}
				{ ["spectate", "play"][+player.playing] }
			{/if}
		</li>
		<li>Wins: {player.wins}</li>
		<li>Points: {player.points}</li>
	</ul>
{/each}