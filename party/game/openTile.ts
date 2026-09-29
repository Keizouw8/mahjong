import type { MahjongRoom } from "..";
import type { Connection } from "partyserver";
import Tile from "../../shared/tiles";
import getGame from "./getGame";

export default function openTile(room: MahjongRoom, sender: Connection, id: string) {
	let { player } = getGame(room, sender);
	player.hand.remove(id);
	player.open.add(Tile.fromId(id));
	room.sendGame();
}
