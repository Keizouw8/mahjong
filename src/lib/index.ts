import Tile, { Suit, pronounciations } from "../../shared/tiles";

export function fetchTTS(tile: Tile, english: boolean) {
	let pre = `/audio/${["cn", "en"][+english]}`;
	if (tile.suit == Suit.Flower) return playSeries([`${pre}/suits/flower.mp3`]);
	if (tile.suit != Suit.Honor) return playSeries([`${pre}/numbers/${tile.value}.mp3`, `${pre}/suits/${tile.suit}.mp3`]);
	playSeries([`${pre}/honors/${tile.value}.mp3`]);
}

async function playSeries(urls: string[]) {
	for (let url of urls) await new Promise(resolve => {
		let audio = new Audio(url);
		audio.onended = resolve;
		audio.play();
	});
}

export function localTTS(tile: Tile, english: boolean) {
	let utterance = new SpeechSynthesisUtterance(getPronounciation(tile, english));
	utterance.lang = english ? "en-US" : "zh-CN";
    window.speechSynthesis.speak(utterance);
}

function getPronounciation(tile: Tile, english: boolean) {
	if (tile.suit == Suit.Flower) return english ? "flower" : pronounciations.suits[Suit.Flower];
	if (tile.suit != Suit.Honor) return `${tile.value + 1}${ english ? " " : "" }${english ? tile.suit : pronounciations.suits[tile.suit]}`;
	return pronounciations.honor[tile.value][+english];
}