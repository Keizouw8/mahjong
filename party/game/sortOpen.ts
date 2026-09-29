import type { MahjongRoom } from "..";
import type { Connection } from "partyserver";
import Deck, { type SDeck } from "../../shared/deck";
import getGame from "./getGame";

export default function sortOpen (room: MahjongRoom, sender: Connection, open: SDeck) {
	let { player } = getGame(room, sender);
	player.open = Deck.import(open);
	room.sendGame();
}
