import { exec } from 'child_process';
import { readdirSync } from 'fs';
import { extname, basename } from 'path';
import { EventEmitter } from 'events';
import { dirname } from 'path';
export default class Convert extends EventEmitter {
	private ffmpeg: string;
	private ffprobe: string;
	constructor() {
		super();
		this.ffmpeg = dirname(process.execPath) + '/ffmpeg/bin/ffmpeg.exe';
		this.ffprobe = dirname(process.execPath) + '/ffmpeg/bin/ffprobe.exe';
	}
	async execCmd(cmd: string) {
		return new Promise<number>((resolve) => {
			let r = exec(cmd, { windowsHide: true }, (err, stdout, stderr) => {
				if (err) {
					resolve(-1);
				} else {
					resolve(0);
				}
			});
		});
	}
	async id3(src: string, dst: string, extlist: Array<string>) {
		let iList = readdirSync(src);
		let cmd: string;
		let code: number;
		for (let idx = 0; idx < iList.length; idx++) {
			if (-1 == extlist.indexOf(extname(iList[idx]))) {
				iList.splice(idx, 1);
				continue;
			}
		}
		this.emit('start', iList.length);
		for (const iterator of iList) {
			cmd = `"${this
				.ffprobe}"  -v quiet -print_format json -show_format "${src}/${iterator}" > ${dst}/${iterator}.txt`;
			code = await this.execCmd(cmd);
			this.emit('progress', code, `${src}/${iterator}`);
		}
		this.emit('end');
	}
	async start(src: string, dst: string, fmt: string, extlist: Array<string>) {
		let iList = readdirSync(src);
		let cmd: string;
		let code: number;
		for (let idx = 0; idx < iList.length; ) {
			if (extname(iList[idx]) == `${fmt}`) {
				iList.splice(idx, 1);
				continue;
			}
			if (-1 == extlist.indexOf(extname(iList[idx]))) {
				iList.splice(idx, 1);
				continue;
			}
			idx++;
		}
		this.emit('start', iList.length);
		for (const iterator of iList) {
			cmd = `"${this.ffmpeg}" -y -i "${src}/${iterator}" "${dst}/${basename(iterator, extname(iterator))}${fmt}"`;
			code = await this.execCmd(cmd);
			this.emit('progress', code, `${src}/${iterator}`);
		}
		this.emit('end');
	}
}
