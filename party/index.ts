import { Server, routePartykitRequest, type Connection, type ConnectionContext, type WSMessage } from "partyserver";
import Game from "../shared/game";

import updateUser from "./users/updateUser";
import startGame from "./game/startGame";
import drawTile from "./game/drawTile";
import sortHand from "./game/sortHand";
import discardTile from "./game/discardTile";
import openTile from "./game/openTile";
import sortOpen from "./game/sortOpen";
import closeTile from "./game/closeTile";
import add from "./users/add";
import pay from "./users/pay";

const events: { [key: string]: Function } = { updateUser, startGame, drawTile, sortHand, discardTile, openTile, sortOpen, closeTile, add, pay };

export class MahjongRoom extends Server {
	game: Game | false = false;
	users: { [key: string]: User } = {};

	onConnect(conn: Connection, ctx: ConnectionContext) {
		this.users[conn.id] = {
			id: conn.id,
			username: "anonymous",
			points: 0,
			playing: false
		};

		conn.send(JSON.stringify({ event: "uuid", payload: conn.id }));
		this.sendGame(conn);
		this.sendUsers();
	}

	onClose(conn: Connection) {
		delete this.users[conn.id];
		this.sendUsers();
		if (!Object.keys(this.users).length) this.game = false;
	}

	onMessage(conn: Connection, message: WSMessage) {
		let str = typeof message == "string" ? message : new TextDecoder().decode(message);
		let { event, payload }: Message = JSON.parse(str);
		events[event]?.(this, conn, payload);
	}

	sendUsers() {
		this.broadcast(JSON.stringify({ event: "users", payload: this.users }));
	}

	sendGame(conn?: Connection) {
		if (conn) return conn.send(JSON.stringify({ event: "game", payload: this.game && this.game.export(conn.id) }));
		for (let c of this.getConnections()) c.send(JSON.stringify({ event: "game", payload: this.game && this.game.export(c.id) }));
	}
}

export default {
	async fetch(request: Request, env: any) {
		return (
			(await routePartykitRequest(request, env)) ||
			env.ASSETS.fetch(request)
		);
	}
};
