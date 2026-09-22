import type { MahjongRoom } from "..";

export default function endGame (room: MahjongRoom) {
	room.game = false;
	room.sendGame();
}
