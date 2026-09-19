<script lang="ts">
    import { goto } from "$app/navigation";
</script>
<h1>mahjong</h1>
<button onclick={_ => goto(`/room/${prompt("Room id:")}`)}>join room</button>