import type { MahjongRoom } from "..";
import type { Connection } from "partyserver";
import Tile from "../../shared/tiles";
import getGame from "./getGame";

export default function discardTile (room: MahjongRoom, sender: Connection, id: string) {
	let { player, game } = getGame(room, sender);
	player.remove(id);
	if (game.current) game.pile.add(game.current);
	game.current = Tile.fromId(id);
	let players = game.playerList();
	room.send("previousPlayerDiscarded", true, players[(players.indexOf(player.id) + 1) % players.length]);
	room.sendGame();
}
