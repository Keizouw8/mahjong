type Stance = "ready" | "unready" | "spectating" | "playing";

type Player = {
	id: string;
	username: string;
	points: number;
	wins: number;
	stance: Stance;
};

type Message = {
	event: string;
	payload: any;
};

type SHandler = (room: MahjongRoom, sender: Party.Connection, payload: any) => any;