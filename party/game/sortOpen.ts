import MahjongRoom from "..";
import type * as Party from "partykit/server";
import Deck, { type SDeck } from "../../shared/deck";

export const sortOpen: SHandler = (room: MahjongRoom, sender: Party.Connection, open: SDeck) => {
	if (!room.game) return;
	let player = room.game.players[sender.id];
	if (!player) return;
	player.open = Deck.import(open);
	room.sendGame();
}