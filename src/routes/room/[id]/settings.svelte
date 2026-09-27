<script lang="ts">
	let { value = $bindable(), ...props }: { value: Settings } = $props();
</script>
<h2>Settings</h2>
<h3>Audio</h3>
<label><input type="checkbox" value="value" bind:checked={value.audio.english}> English prononciation</label>
<label><input type="checkbox" value="value" bind:checked={value.audio.discarded}> Announce discarded card</label>
<h3>Spectators</h3>
<label><input type="checkbox" value="value" bind:checked={value.spectators.hide}> Hide spectators</label>
<label><input type="checkbox" value="value" bind:checked={value.spectators.last}> Display spectators last</label>
