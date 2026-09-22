import type * as Party from "partykit/server";
import Game from "../shared/game";
import { updateUser } from "./users/update";
import { startGame } from "./game/start";
import { drawTile } from "./game/draw";
import { sortHand } from "./game/sort";
import { discardTile } from "./game/discard";

const events: { [key: string]: SHandler } = { updateUser, startGame, drawTile, sortHand, discardTile }

export default class MahjongRoom implements Party.Server {
	game: Game | false = false;
	users: { [key: string]: User} = {};
	
	constructor(readonly room: Party.Room) { }
	
	onConnect(conn: Party.Connection, ctx: Party.ConnectionContext) {
		console.log(`Connected:
			id: ${conn.id}
			room: ${this.room.id}
			url: ${new URL(ctx.request.url).pathname}`);

		this.users[conn.id] = {
			id: conn.id,
			username: "anonymous",
			wins: 0,
			points: 0,
			playing: false
		};
		
		conn.send(JSON.stringify({ event: "uuid", payload: conn.id }));
		this.sendGame(conn);
		this.sendUsers();
	}

	onClose(conn: Party.Connection) {
		delete this.users[conn.id];
		this.sendUsers();
		if (!Object.keys(this.users).length) this.game = false;
	}

	onMessage(message: string, sender: Party.Connection) {
		let { event, payload }: Message = JSON.parse(message);
		events[event]?.(this, sender, payload);
	}

	sendUsers() {
		this.room.broadcast(JSON.stringify({ event: "users", payload: this.users }));
	}

	sendGame(conn?: Party.Connection) {
		if (conn) return conn.send(JSON.stringify({ event: "game", payload: this.game && this.game.export(conn.id) }));
		for (let conn of this.room.getConnections()) conn.send(JSON.stringify({ event: "game", payload: this.game && this.game.export(conn.id) }));
	}
}

MahjongRoom satisfies Party.Worker;
