import Tile from "./tiles"
import Meld from "./meld";

export default class Player{
	hand: Tile[] = [];
	open: Meld[] = [];

	constructor() {}
	
	addHand(tile: Tile) {
		this.hand.push(tile);
	}

	meld(meld: Meld) {
		this.open.push(meld);
	}
}