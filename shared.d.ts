type User = {
	id: string;
	username: string;
	points: number;
	playing: boolean;
};

type Message = {
	event: string;
	payload: any;
};

type SHandler = (room: MahjongRoom, sender: Party.Connection, payload: any) => any;