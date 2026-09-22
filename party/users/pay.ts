import type MahjongRoom from "..";
import type * as Party from "partykit/server";

export const pay: SHandler = (room: MahjongRoom, sender: Party.Connection, { recipient, amount }: { recipient: string, amount: number }) => {
    room.users[sender.id].points -= amount;
    room.users[recipient].points += amount;
	room.sendUsers();
}