import type { MahjongRoom } from "..";
import type { Connection } from "partyserver";
import Tile from "../../shared/tiles";

export default function closeTile(room: MahjongRoom, sender: Connection, id: string) {
	if (!room.game) return;
	let player = room.game.players[sender.id];
	if (!player) return;
	player.open.remove(id);
	player.hand.add(Tile.fromId(id));
	room.sendGame();
}
