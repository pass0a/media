import { execSync } from 'child_process';
import { readdirSync } from 'fs';
import { extname, basename } from 'path';
import { decode, encode } from 'iconv-lite';
let extlist = [ '.flv', '.mp4', '.mkv' ];
let avexe = 'F:/downloads/ffmpeg-latest-win32-shared/bin/ffmpeg';
let input = 'f:/video'; //process.argv[2];
let output = process.argv[3];
let fmt = 'mp4'; //process.argv[4];
console.log(process.argv);
let inputlist = readdirSync(input);
let file: string;
for (const iterator of inputlist) {
	if (extlist.indexOf(extname(iterator))) {
		let cmd = `"${avexe}" -i "${input}/${iterator}" "${output}/${basename(iterator, extname(iterator))}.${fmt}"`;
		console.log(cmd);
		let r = execSync(cmd);
		console.log(r.toString('binary'));
	}
}
