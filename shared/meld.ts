import Tile from "./tiles";

export default class Meld {
	tiles: Tile[];
	
	constructor(tiles: Tile[]) {
		this.tiles = tiles;
	}
}