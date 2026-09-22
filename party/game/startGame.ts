import type { MahjongRoom } from "..";
import Game from "../../shared/game";

export default function startGame (room: MahjongRoom) {
	room.game = new Game(Object.values(room.users).filter((user: User) => user.playing).map((user: User) => user.id));
	room.game.distribute();
	room.sendGame();
}
