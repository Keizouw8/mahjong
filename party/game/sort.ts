import MahjongRoom from "..";
import type * as Party from "partykit/server";
import Deck, { type SDeck } from "../../shared/deck";

export const sortHand: SHandler = (room: MahjongRoom, sender: Party.Connection, hand: SDeck) => {
	if (!room.game) return;
	let player = room.game.players[sender.id];
	if (!player) return;
	player.hand = Deck.import(hand);
}