import type { MahjongRoom } from "..";
import type { Connection } from "partyserver";

export default function pay (room: MahjongRoom, sender: Connection, { recipient, amount }: { recipient: string, amount: number }) {
    room.users[sender.id].points -= amount;
    room.users[recipient].points += amount;
	room.sendUsers();
}
