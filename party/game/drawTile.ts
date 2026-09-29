import type { MahjongRoom } from "..";
import type { Connection } from "partyserver";
import getGame from "./getGame";

export default function drawTile (room: MahjongRoom, sender: Connection, fromCurrent: boolean = false) {
	let { player, game } = getGame(room, sender);
	if (fromCurrent) {
		if (game.current) player.hand.add(game.current);
		game.current = undefined;
	} else player.hand.add(game.draw());
	room.sendGame();
}
