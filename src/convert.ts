import { execSync } from 'child_process';
import { readdirSync } from 'fs';
import { extname, basename } from 'path';
let extlist = [ '.flv', '.mp4', '.mkv', '.wmv' ];
let avexe = 'E:/downloads/ffmpeg-4.1-win32-shared/ffmpeg-4.1-win32-shared/bin/ffmpeg.exe';
let input = 'f:/video'; //process.argv[2];
let output = 'e:/tmp'; //process.argv[3];
let fmt = 'mp4'; //process.argv[4];
console.log(process.argv);
let inputlist = readdirSync(input);
let file: string;
for (const iterator of inputlist) {
	if (!extlist.indexOf(extname(iterator))) {
		let cmd = `"${avexe}" -y -i "${input}/${iterator}" "${output}/${basename(iterator, extname(iterator))}.${fmt}"`;
		let r = execSync(cmd);
		console.log(r.toString());
	}
}
