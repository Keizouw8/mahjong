import { EdgeTTS } from "node-edge-tts";
import { rename, mkdir } from "node:fs/promises";
import { join } from "node:path";
import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "@ffmpeg-installer/ffmpeg";
import { Suit, pronounciations } from "../shared/tiles";

ffmpeg.setFfmpegPath(ffmpegPath.path);

let languages: [string, EdgeTTS][] = [
	["en", new EdgeTTS({ lang: "en-US", voice: "en-US-AriaNeural" })],
	["cn", new EdgeTTS({ lang: "zh-CN", voice: "zh-CN-XiaoyiNeural" })]
];

for (let [lang, tts] of languages) {
	let english: boolean = lang == "en";
	await mkdir(path([lang, "suits"]), { recursive: true });
	for (let suit of Object.values(Suit)) tts.ttsPromise(`${english ? suit : pronounciations.suits[suit]}`, path([lang, "suits", `${suit}.mp3`])).catch(console.error);
	await mkdir(path([lang, "honors"]), { recursive: true });
	for (let [i, honor] of Object.entries(pronounciations.honor)) tts.ttsPromise(`${honor[+english]}`, path([lang, "honors", `${i}.mp3`])).catch(console.error);
	await mkdir(path([lang, "numbers"]), { recursive: true });
	for (let i = 0; i < 9; i++) tts.ttsPromise(`${i + 1}`, path([lang, "numbers", `${i}.mp3`]))
		.then(() => trim(path([lang, "numbers", `${i}.mp3`])))
		.catch(console.error);
}

function path(terms: string[]) {
	return join(join(import.meta.dir, "../static/audio"), pathHelper(terms));
}

function pathHelper(terms: string[]): string {
	if (!terms.length) return "";
	return join(terms[0], pathHelper(terms.slice(1)));
}

function trim(input: string) {
	let temp = `${input}.temp.mp3`;
	ffmpeg(input)
		.audioFilters([
			"areverse",
			"silenceremove=start_periods=1:start_duration=0:start_threshold=-30dB",
			"areverse"
		])
		.output(temp)
		.on("end", () => rename(temp, input))
		.on("error", console.error)
		.run();
}