import type { MahjongRoom } from "..";
import type { Connection } from "partyserver";
import type Player from "../../shared/player";
import type Game from "../../shared/game";


export default function getGame(room: MahjongRoom, sender: Connection): { player: Player, game: Game } {
	if (!room.game) throw new Error("No game is going");
	let player = room.game.players[sender.id];
	if (!player) throw new Error("Player is not in game");
	return { player, game: room.game };
}