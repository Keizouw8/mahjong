import Tile from "./tiles";
import { arrayShuffle } from "array-shuffle";
import { suits, Suit } from "./tiles";

export type SDeck = {
	tiles: string[];
}

export default class Deck {
	tiles: Tile[] = [];
	
	constructor(tiles?: Tile[]) {
		if (tiles) this.tiles = tiles;
	}

	size() {
		return this.tiles.length;
	}

	draw() {
		return this.tiles.pop();
	}

	remove(id: string) {
		this.tiles = this.tiles.filter(tile => tile.id != id);
	}

	add(tile: Tile) {
		this.tiles.push(tile);
	}

	shuffle() {
		arrayShuffle(this.tiles);
	}

	export(): SDeck {
		return { tiles: this.tiles.map(tile => tile.id) };
	}

	static import(source: SDeck): Deck {
		return new Deck(source.tiles.map(Tile.fromId));
	}

	static fullDeck(flowers: boolean = false): Deck {
		let tiles: Tile[] = [];
			
		for (let suit of Object.keys(suits) as Suit[]){
			if (suit == Suit.Flower) continue;
			tiles.push(...Array.from({ length: suits[suit] }, (_, i) => Array.from({ length: 4 }, (_, o) => new Tile(suit, i, o))).flat());
		}
		
		if (flowers) tiles.push(...Array.from({ length: suits[Suit.Flower] }, (_, i) => new Tile(Suit.Flower, i, 1)));
		
		return new Deck(tiles);
	}
}