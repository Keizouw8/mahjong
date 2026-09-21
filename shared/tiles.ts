export enum Suit {
	Dot = "dot",
	Bamboo = "bamboo",
	Character = "character",
	Honor = "honor",
	Flower = "flower"
};

export const characters: { [key in Suit]: string[] } = {
	character: ["\u{1F007}", "\u{1F008}", "\u{1F009}", "\u{1F00A}", "\u{1F00B}", "\u{1F00C}", "\u{1F00D}", "\u{1F00E}", "\u{1F00F}"],
	bamboo: ["\u{1F010}", "\u{1F011}", "\u{1F012}", "\u{1F013}", "\u{1F014}", "\u{1F015}", "\u{1F016}", "\u{1F017}", "\u{1F018}"],
	dot: ["\u{1F019}", "\u{1F01A}", "\u{1F01B}", "\u{1F01C}", "\u{1F01D}", "\u{1F01E}", "\u{1F01F}", "\u{1F020}", "\u{1F021}"],
	honor: ["\u{1F000}", "\u{1F001}", "\u{1F002}", "\u{1F003}", "\u{1F004}\u{FE0E}", "\u{1F005}", "\u{1F006}"],
	flower: ["\u{1F022}", "\u{1F023}", "\u{1F024}", "\u{1F025}", "\u{1F026}", "\u{1F027}", "\u{1F028}", "\u{1F029}"]
}

export const suits: { [key in Suit]: number } = {
	dot: 9,
	bamboo: 9,
	character: 9,
	honor: 7,
	flower: 8
};

export default class Tile {
	suit: Suit;
	value: number;
	copy: number;
	id: string;

	constructor(suit: Suit, value: number, copy: number) {
		this.suit = suit;
		this.value = value;
		this.copy = copy;
		this.id = `${suit}-${value}-${copy}`;
	}

	static fromId(id: string): Tile {
		let [suit, value, copy] = id.split("-");
		if (!(suit in Suit)) throw new Error("Provided invalid suit");
		return new Tile(suit as Suit, +value, +copy);
	}

	render(): string {
		if (this.value > suits[this.suit]) throw new Error("Invalid value within suit");
		return characters[this.suit][this.value];
	}
}

export function generateDeck(flowers: boolean = false): Tile[] {
	let deck: Tile[] = [];
	
	for (let suit of Object.keys(suits) as Suit[]){
		if (suit == Suit.Flower) continue;
		deck.push(...Array.from({ length: suits[suit] }, (_, i) => Array.from({ length: 4 }, (_, o) => new Tile(suit, i, o))).flat());
	}
	
	if (flowers) deck.push(...Array.from({ length: suits[Suit.Flower] }, (_, i) => new Tile(Suit.Flower, i, 1)));
	
	return deck;
}