import type { MahjongRoom } from "..";
import type { Connection } from "partyserver";

export default function add (room: MahjongRoom, sender: Connection, amount: number) {
    room.users[sender.id].points += amount;
	room.sendUsers();
}
