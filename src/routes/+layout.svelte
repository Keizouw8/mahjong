<script lang="ts">
	import { onMount } from "svelte";
	import favicon from "$lib/assets/favicon.svg";

	let { children } = $props();

	onMount(async () => {
		await import("svelte-drag-drop-touch");
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>mahjong</title>
</svelte:head>

{@render children()}
