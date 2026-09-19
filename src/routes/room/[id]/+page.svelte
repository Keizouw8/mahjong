<script lang="ts">
    import { goto } from "$app/navigation";
	import PartySocket from "partysocket";
    import { onMount } from "svelte";
	
	let { params } = $props();
	let socket: PartySocket;
	let roomid = $derived(params.id);
	let uuid = $state("");
	let players: Player[] = $state([]);

	let events: { [key: string]: Function } = {
		uuid(id: string){ uuid = id; },
		players(p: Player[]){ players = p; }
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
		
		console.log(socket);
		
		return socket.close;
	});
</script>
<h1>room: {params.id}</h1>
<h2>players</h2>
{#each players as player}
	<b>{player.username} {#if player.id == uuid}(you){/if}</b>
	<ul>
		<li>Stance: {player.stance}</li>
		<li>Wins: {player.wins}</li>
		<li>Points: {player.points}</li>
	</ul>
{/each}