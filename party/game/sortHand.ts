import type { MahjongRoom } from "..";
import type { Connection } from "partyserver";
import Deck, { type SDeck } from "../../shared/deck";

export default function sortHand (room: MahjongRoom, sender: Connection, hand: SDeck) {
	if (!room.game) return;
	let player = room.game.players[sender.id];
	if (!player) return;
	player.hand = Deck.import(hand);
}
