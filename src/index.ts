import {
	uiWindow,
	uiButton,
	uiLabel,
	startLoop,
	uiHorizontalBox,
	uiGrid,
	uiAlign,
	uiCombobox,
	uiProgressBar
} from '@passoa/libui';
import { exec } from 'child_process';
import * as fs from 'fs';

let extlist = [ 'mp4', 'wmv', 'flv' ];
let x = new uiWindow('hello', 400, 320, 0);
let hbox = new uiHorizontalBox();
let grid = new uiGrid();
x.setChild(hbox);
hbox.append(grid, false);

let label1 = new uiLabel('请先选择要处理的目录');
let label2 = new uiLabel('请先选择要输出的目录');
let combox = new uiCombobox();
for (let iter of extlist) combox.append(iter);

combox.setSelected(0);
let progress = new uiProgressBar();
let b1 = new uiButton('选择目录');
let b2 = new uiButton('输出目录');
let b3 = new uiButton('开始转换');
let b4 = new uiButton('提取ID3信息');
b1.on('click', () => {
	label1.setText(x.openFolder());
});

b2.on('click', () => {
	label2.setText(x.openFolder());
	// let x = exec(process.execPath + ' convert.js ' + label1.getText());
	// if (x.stdout)
	// 	x.stdout.on('data', (data) => {
	// 		console.log(Buffer.from(data).toString());
	// 	});
	// let list = readdirSync(label.getText());
	// for (const iterator of list) {
	// 	var y = encode(decode(Buffer.from(iterator), 'gbk'), 'utf8');
	// 	if (handle.indexOf(extname(y.toString())) > 0) {
	// 		console.log(iterator);
	// 	}
	// }
	// let av = exec(avexe + ' --help');
	// av.on('close', (code) => {
	// 	console.log('exit:', code);
	// });
});
b3.on('click', () => {
	if (!fs.existsSync(label1.getText())) {
		x.msgBoxError('路径检查错误', '请确认处理目录是否有效:' + label1.getText());
		return;
	}
	if (!fs.existsSync(label2.getText())) {
		x.msgBoxError('路径检查错误', '请确认输出目录是否有效:' + label2.getText());
		return;
	}
	let tmp = exec(
		'passoa convert.js ' + label1.getText() + ' ' + label2.getText() + ' ' + extlist[combox.getSelected()]
	);
	if (tmp.stdout)
		tmp.stdout.on('data', (data) => {
			console.log(Buffer.from(data).toString());
		});
});
// g.append(b1, 0, 0, 1, 1, true, uiAlign.uiAlignFill, true, uiAlign.uiAlignFill);
// g.append(b2, 0, 1, 1, 1, true, uiAlign.uiAlignFill, true, uiAlign.uiAlignFill);
// g.append(b2, 0, 1, 1, 1, true, uiAlign.uiAlignFill, true, uiAlign.uiAlignFill);
grid.append(b1, 0, 0, 1, 1, false, uiAlign.uiAlignCenter, false, uiAlign.uiAlignFill);
grid.append(label1, 1, 0, 1, 1, false, uiAlign.uiAlignFill, false, uiAlign.uiAlignFill);
grid.append(b2, 0, 1, 1, 1, false, uiAlign.uiAlignCenter, false, uiAlign.uiAlignFill);
grid.append(label2, 1, 1, 1, 1, false, uiAlign.uiAlignFill, false, uiAlign.uiAlignFill);
hbox.append(combox, false);
hbox.append(progress, false);
hbox.append(b3, false);
hbox.append(b4, false);
x.show();
startLoop();
