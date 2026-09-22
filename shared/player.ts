import Tile from "./tiles"
import Deck, { type SDeck } from "./deck";

export type SPlayer = {
	id: string;
	hand: SDeck;
	open: SDeck;
}

export type SOpponent = {
	id: string;
	hand: number;
	open: SDeck;
}

export default class Player{
	id: string;
	hand: Deck;
	open: Deck;

	constructor(id: string) {
		this.id = id;
		this.hand = new Deck();
		this.open = new Deck();
	}

	remove(id: string) {
		this.hand.remove(id);
	}
	
	add(tile: Tile) {
		this.hand.add(tile);
	}

	meld(tile: Tile) {
		this.open.add(tile);
	}

	export(opponent: boolean = false) {
		return {
			id: this.id,
			hand: opponent ? this.hand.size() : this.hand.export(),
			open: this.open.export(),
		} as SPlayer | SOpponent;
	}

	static import(source: SPlayer | SOpponent): Player{
		let player = new Player(source.id);
		player.open = Deck.import(source.open);
		if (typeof source.hand == "number") player.hand = { size() { return source.hand } } as Deck;
		else player.hand = Deck.import(source.hand);
		return player;
	}
}