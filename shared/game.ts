import Player from "./player";
import Tile, { generateDeck } from "./tiles";

export default class Game{
	playerList: string[] = [];
	players: { [key: string]: Player } = {};
	deck: Tile[];
	discard: Tile[] = [];
	turn = 0;
	
	constructor(players: string[]) {
		this.deck = generateDeck();
		this.deck.sort(() => 0.5 - Math.random());
		
		for (let player of players) {
			this.players[player] = new Player();
			this.playerList.push(player);
		}
	}

	nextTurn() {
		this.turn = (this.turn + 1) % this.playerList.length;
	}
}