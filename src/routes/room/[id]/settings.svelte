<script lang="ts">
	let { value = $bindable() }: { value: Settings } = $props();
</script>
<h2>settings</h2>
<h3>audio</h3>
<label><input type="checkbox" value="value" bind:checked={value.audio.english}> english prononciation (chinese default)</label>
<label><input type="checkbox" value="value" bind:checked={value.audio.dingTurn}> ding when player before you discards</label>
<label><input type="checkbox" value="value" bind:checked={value.audio.discarded}> announce discarded tile</label>
<label><input type="checkbox" value="value" bind:checked={value.audio.local}> generate tile audio locally</label>
<h3>spectators</h3>
<label><input type="checkbox" value="value" bind:checked={value.spectators.hide}> hide spectators</label>
<label><input type="checkbox" value="value" bind:checked={value.spectators.last}> display spectators last</label>
