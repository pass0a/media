import { execSync } from 'child_process';
import { readdirSync } from 'fs';
import { extname, basename } from 'path';
import { decode, encode } from 'iconv-lite';
let extlist = [ '.mp3', '.mp4', '.mkv' ];
let avexe = 'F:/downloads/ffmpeg-latest-win32-shared/bin/ffmpeg';
let input = process.argv[2];
let output = process.argv[3];
let fmt = process.argv[4];
let inputlist = readdirSync(input);
for (const iterator of inputlist) {
	console.log(iterator);
	let cmd = `"${avexe}" -i "${input}/${iterator}" "${output}/${basename(iterator, extname(iterator))}.mp4"`;
	console.log(cmd);
	let r = execSync(cmd);
	console.log(r.toString());
}
