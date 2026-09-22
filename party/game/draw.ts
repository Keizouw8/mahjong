import MahjongRoom from "..";
import type * as Party from "partykit/server";

export const drawTile: SHandler = (room: MahjongRoom, sender: Party.Connection, fromCurrent: boolean = false) => {
	if (!room.game) return;
	let player = room.game.players[sender.id];
	if (!player) return;
	if (fromCurrent) {
		if (room.game.current) player.hand.add(room.game.current);
		room.game.current = undefined;
	} else player.hand.add(room.game.draw());
	room.sendGame();
}