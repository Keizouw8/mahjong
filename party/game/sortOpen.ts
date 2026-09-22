import type { MahjongRoom } from "..";
import type { Connection } from "partyserver";
import Deck, { type SDeck } from "../../shared/deck";

export default function sortOpen (room: MahjongRoom, sender: Connection, open: SDeck) {
	if (!room.game) return;
	let player = room.game.players[sender.id];
	if (!player) return;
	player.open = Deck.import(open);
	room.sendGame();
}
