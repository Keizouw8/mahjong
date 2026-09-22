import MahjongRoom from "..";
import type * as Party from "partykit/server";
import Tile from "../../shared/tiles";

export const closeTile: SHandler = (room: MahjongRoom, sender: Party.Connection, id: string) => {
	if (!room.game) return;
	let player = room.game.players[sender.id];
	if (!player) return;
	player.open.remove(id);
	player.hand.add(Tile.fromId(id));
	room.sendGame();
}