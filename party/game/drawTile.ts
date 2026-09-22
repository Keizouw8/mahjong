import type { MahjongRoom } from "..";
import type { Connection } from "partyserver";

export default function drawTile (room: MahjongRoom, sender: Connection, fromCurrent: boolean = false) {
	if (!room.game) return;
	let player = room.game.players[sender.id];
	if (!player) return;
	if (fromCurrent) {
		if (room.game.current) player.hand.add(room.game.current);
		room.game.current = undefined;
	} else player.hand.add(room.game.draw());
	room.sendGame();
}
