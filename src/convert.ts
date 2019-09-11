import { execSync } from 'child_process';
import { readdirSync } from 'fs';
import { extname } from 'path';
import { decode, encode } from 'iconv-lite';
let handle = [ '.mp3', '.mp4', '.mkv' ];
let avexe = 'E:/downloads/ffmpeg-4.1-win32-shared/ffmpeg-4.1-win32-shared/bin/ffmpeg';
