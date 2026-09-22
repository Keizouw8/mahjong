import type { MahjongRoom } from "..";
import type { Connection } from "partyserver";
import Tile from "../../shared/tiles";

export default function openTile(room: MahjongRoom, sender: Connection, id: string) {
	if (!room.game) return;
	let player = room.game.players[sender.id];
	if (!player) return;
	player.hand.remove(id);
	player.open.add(Tile.fromId(id));
	room.sendGame();
}
