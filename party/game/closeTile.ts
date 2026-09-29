import type { MahjongRoom } from "..";
import type { Connection } from "partyserver";
import Tile from "../../shared/tiles";
import getGame from "./getGame";

export default function closeTile(room: MahjongRoom, sender: Connection, id: string) {
	let { player } = getGame(room, sender);
	player.open.remove(id);
	player.hand.add(Tile.fromId(id));
	room.sendGame();
}
