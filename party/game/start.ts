import MahjongRoom from "..";
import Game from "../../shared/game";

export const startGame: SHandler = (room: MahjongRoom) => {
	room.game = new Game(Object.values(room.users).filter(user => user.playing).map(user => user.id));
	room.game.distribute();
	room.sendGame();
}