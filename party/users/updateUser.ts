import type { MahjongRoom } from "..";
import type { Connection } from "partyserver";

export default function updateUser (room: MahjongRoom, sender: Connection, payload: any) {
	room.users[sender.id] = {
		...room.users[sender.id],
		...payload
	};
	room.sendUsers();
}
