import type { MahjongRoom } from "..";
import type { Connection } from "partyserver";
import Tile from "../../shared/tiles";

export default function discardTile (room: MahjongRoom, sender: Connection, id: string) {
	if (!room.game) return;
	let player = room.game.players[sender.id];
	if (!player) return;
	player.remove(id);
	if (room.game.current) room.game.pile.add(room.game.current);
	room.game.current = Tile.fromId(id);
	room.sendGame();
}
