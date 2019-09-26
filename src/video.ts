import {
	uiHorizontalBox,
	uiWindow,
	uiGrid,
	uiLabel,
	uiCombobox,
	uiButton,
	uiProgressBar,
	uiAlign
} from '@passoa/libui';
import * as fs from 'fs';
import Convert from './convert';
export class videoPage extends uiHorizontalBox {
	readonly extlist = [ '.mp4', '.wmv', '.flv' ];

	constructor(topWin: uiWindow) {
		super();
		let grid = new uiGrid();
		let len = 0,
			pos = 0,
			errNums = 0;
		let err = '';
		this.append(grid, false);

		let label1 = new uiLabel('请先选择要处理的目录');
		let label2 = new uiLabel('请先选择要输出的目录');
		let label3 = new uiLabel('转换进度');
		let combox = new uiCombobox();
		for (let iter of this.extlist) combox.append(iter);

		combox.setSelected(0);
		let progress = new uiProgressBar();
		let b1 = new uiButton('选择目录');
		let b2 = new uiButton('输出目录');
		let b3 = new uiButton('开始转换');
		b1.on('click', () => {
			label1.setText(topWin.openFolder());
		});

		b2.on('click', () => {
			label2.setText(topWin.openFolder());
		});
		b3.on('click', () => {
			if (!fs.existsSync(label1.getText()) || !fs.existsSync(label2.getText())) {
				topWin.msgBoxError('路径检查错误', '请确认处理和输出目录是否有效!');
				return;
			}
			let src = fs.statSync(label1.getText());
			let dst = fs.statSync(label2.getText());
			if (!src.isDirectory() || !dst.isDirectory()) {
				topWin.msgBoxError('路径检查错误', '请确认处理和输出目录是否有效!');
				return;
			}
			b3.disable();
			let conv = new Convert();
			conv.on('start', (length) => {
				len = length;
			});
			conv.on('progress', (code, path) => {
				pos++;
				progress.setValue(pos / len * 100);
				if (code) {
					errNums++;
					err += `${code}:${path}\r\n`;
				}
			});
			conv.on('end', () => {
				if (errNums) {
					topWin.msgBoxError('错误提示', `有${errNums}个文件转换错误，请查看错误日志${label2.getText()}/error.log！`);
					fs.writeFile('${dst}/error.log', err, () => {});
					err = '';
					errNums = 0;
				}

				len = 0;
				pos = 0;
				progress.setValue(0);
				b3.enable();
			});
			conv.start(label1.getText(), label2.getText(), this.extlist[combox.getSelected()], this.extlist);
		});
		grid.append(b1, 0, 0, 1, 1, false, uiAlign.uiAlignCenter, false, uiAlign.uiAlignFill);
		grid.append(label1, 1, 0, 1, 1, false, uiAlign.uiAlignFill, false, uiAlign.uiAlignFill);
		grid.append(b2, 0, 1, 1, 1, false, uiAlign.uiAlignCenter, false, uiAlign.uiAlignFill);
		grid.append(label2, 1, 1, 1, 1, false, uiAlign.uiAlignFill, false, uiAlign.uiAlignFill);
		grid.append(label3, 0, 2, 1, 1, false, uiAlign.uiAlignFill, false, uiAlign.uiAlignFill);
		grid.append(progress, 1, 2, 1, 1, false, uiAlign.uiAlignFill, false, uiAlign.uiAlignFill);
		grid.append(new uiLabel('目标格式'), 0, 3, 1, 1, false, uiAlign.uiAlignFill, false, uiAlign.uiAlignFill);
		grid.append(combox, 1, 3, 1, 1, false, uiAlign.uiAlignFill, false, uiAlign.uiAlignFill);
		//hbox.append(combox, false);
		//hbox.append(progress, false);
		this.append(b3, false);
	}
}
