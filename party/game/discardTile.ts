import MahjongRoom from "..";
import type * as Party from "partykit/server";
import Tile from "../../shared/tiles";

export const discardTile: SHandler = (room: MahjongRoom, sender: Party.Connection, id: string) => {
	if (!room.game) return;
	let player = room.game.players[sender.id];
	if (!player) return;
	player.remove(id);
	if (room.game.current) room.game.pile.add(room.game.current);
	room.game.current = Tile.fromId(id);
	room.sendGame();
}