import type { MahjongRoom } from "..";
import type { Connection } from "partyserver";
import Deck, { type SDeck } from "../../shared/deck";
import getGame from "./getGame";

export default function sortHand (room: MahjongRoom, sender: Connection, hand: SDeck) {
	let { player } = getGame(room, sender);
	player.hand = Deck.import(hand);
}
