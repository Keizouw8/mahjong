import type MahjongRoom from "..";
import type * as Party from "partykit/server";

export const add: SHandler = (room: MahjongRoom, sender: Party.Connection, amount: number) => {
    room.users[sender.id].points += amount;
	room.sendUsers();
}