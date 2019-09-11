import {
	uiWindow,
	uiButton,
	uiLabel,
	startLoop,
	uiHorizontalBox,
	openFolder,
	uiGrid,
	uiAlign,
	uiCombobox
} from '@passoa/libui';
import { exec } from 'child_process';

let extlist = [ 'mp4', 'wmv', 'flv' ];
let x = new uiWindow('hello', 400, 320, 0);
let hbox = new uiHorizontalBox();
let grid = new uiGrid();
x.setChild(hbox);
hbox.append(grid, false);

let label1 = new uiLabel('请先选择要处理的目录');
let label2 = new uiLabel('请先选择要输出的目录');
let combox = new uiCombobox();
combox.append('mp4');
combox.append('wmv');
combox.append('flv');
combox.setSelected(0);
let b1 = new uiButton('选择目录');
let b2 = new uiButton('输出目录');
let b3 = new uiButton('开始转换');
let b4 = new uiButton('提取ID3信息');
b1.on('click', () => {
	label1.setText(openFolder());
});

b2.on('click', () => {
	label2.setText(openFolder());
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
// g.append(b1, 0, 0, 1, 1, true, uiAlign.uiAlignFill, true, uiAlign.uiAlignFill);
// g.append(b2, 0, 1, 1, 1, true, uiAlign.uiAlignFill, true, uiAlign.uiAlignFill);
// g.append(b2, 0, 1, 1, 1, true, uiAlign.uiAlignFill, true, uiAlign.uiAlignFill);
grid.append(b1, 0, 0, 1, 1, false, uiAlign.uiAlignCenter, false, uiAlign.uiAlignFill);
grid.append(label1, 1, 0, 1, 1, false, uiAlign.uiAlignFill, false, uiAlign.uiAlignFill);
grid.append(b2, 0, 1, 1, 1, false, uiAlign.uiAlignCenter, false, uiAlign.uiAlignFill);
grid.append(label2, 1, 1, 1, 1, false, uiAlign.uiAlignFill, false, uiAlign.uiAlignFill);
hbox.append(combox, false);
hbox.append(b3, false);
hbox.append(b4, false);
x.show();
startLoop();
