import type MahjongRoom from "..";
import type * as Party from "partykit/server";

export const updateUser: SHandler = (room: MahjongRoom, sender: Party.Connection, payload) => {
	room.users[sender.id] = {
		...room.users[sender.id],
		...payload
	};
	room.sendUsers();
}