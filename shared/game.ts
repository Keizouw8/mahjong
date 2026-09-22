import Player, { type SOpponent, type SPlayer } from "./player";
import Tile from "./tiles";
import Deck, { type SDeck } from "./deck";

export type SGame = {
	players: { [key: string]: SPlayer | SOpponent };
	deck: SDeck | number;
	pile: SDeck;
	current: string | undefined;
};

export default class Game{
	players: { [key: string]: Player } = {};
	deck: Deck;
	pile: Deck; // discard pile
	current: Tile | undefined;
	
	constructor(players: string[]) {
		this.deck = Deck.fullDeck();
		this.pile = new Deck();
		for (let player of players) this.players[player] = new Player(player);
	}

	playerList() {
		return Object.keys(this.players);
	}

	numPlayers() {
		return this.playerList().length;
	}

	draw(): Tile {
		if (!this.deck.size()) {
			this.deck = this.pile;
			this.pile = new Deck();
			this.deck.shuffle();
		}
		
		return this.deck.draw() as Tile;
	}

	discard(tile: Tile) {
		if (this.current) this.pile.add(this.current);
		this.current = tile;
	}

	distribute() {
		this.deck.shuffle();
		for (let player of Object.values(this.players)) {
			for (let i = 0; i < 13; i++) player.add(this.draw());
		}
	}

	export(pid: string = ""): SGame {
		return {
			players: Object.fromEntries(Object.entries(this.players).map(([uuid, player]) => [uuid, pid ? player.export(uuid != pid) : player.export()])),
			deck: pid ? this.deck.size() : this.deck.export(),
			pile: this.pile.export(),
			current: this.current?.id
		};
	}

	static import(source: SGame): Game {
		let game = new Game([]);

		for (let player of Object.values(source.players)) game.players[player.id] = Player.import(player);
		if (typeof source.deck == "number") game.deck = { size() { return source.deck } } as Deck;
		else game.deck = Deck.import(source.deck);
		game.pile = Deck.import(source.pile);
		game.current = source.current == undefined ? undefined : Tile.fromId(source.current);
		
		return game;
	}
}