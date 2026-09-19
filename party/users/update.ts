import type MahjongRoom from "..";
import type * as Party from "partykit/server";

export const updateUser: SHandler = (room: MahjongRoom, sender: Party.Connection, payload) => {
	room.players[sender.id] = {
		...room.players[sender.id],
		...payload
	};
	room.sendPlayers();
}