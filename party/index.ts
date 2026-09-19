import type * as Party from "partykit/server";
import { updateUser } from "./users/update";

const events: { [key: string]: SHandler } = { updateUser }

export default class MahjongRoom implements Party.Server {
	inGame: boolean = false;
	players: { [key: string]: Player} = {};
	
	constructor(readonly room: Party.Room) { }
	
	onConnect(conn: Party.Connection, ctx: Party.ConnectionContext) {
		console.log(`Connected:
			id: ${conn.id}
			room: ${this.room.id}
			url: ${new URL(ctx.request.url).pathname}`);

		this.players[conn.id] = {
			id: conn.id,
			username: "anonymous",
			wins: 0,
			points: 0,
			playing: false
		};
		
		conn.send(JSON.stringify({ event: "uuid", payload: conn.id }));
		this.sendPlayers();
	}

	onClose(conn: Party.Connection) {
		delete this.players[conn.id];
		this.sendPlayers();
	}

	onMessage(message: string, sender: Party.Connection) {
		let { event, payload }: Message = JSON.parse(message);
		events[event]?.(this, sender, payload);
	}

	sendPlayers() {
		this.room.broadcast(JSON.stringify({ event: "players", payload: this.players }));
	}
}

MahjongRoom satisfies Party.Worker;
