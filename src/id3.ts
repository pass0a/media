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
export class id3Page extends uiHorizontalBox {
	readonly extlist = [ '.mp4', '.wmv', '.flv', '.mp3', '.wav' ];

	constructor(topWin: uiWindow) {
		super();
		let grid = new uiGrid();
		let len = 0,
			pos = 0,
			err = 0;
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
		let b3 = new uiButton('提取ID3信息');
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
			conv.on('progress', (code) => {
				pos++;
				progress.setValue(pos / len * 100);
			});
			conv.on('end', () => {
				topWin.msgBox('提取ID3信息完成', `总共提取了${len}个文件的ID3信息`);
				len = 0;
				pos = 0;
				progress.setValue(0);
				b3.enable();
			});
			conv.id3(label1.getText(), label2.getText(), this.extlist);
		});
		grid.append(b1, 0, 0, 1, 1, false, uiAlign.uiAlignCenter, false, uiAlign.uiAlignFill);
		grid.append(label1, 1, 0, 1, 1, false, uiAlign.uiAlignFill, false, uiAlign.uiAlignFill);
		grid.append(b2, 0, 1, 1, 1, false, uiAlign.uiAlignCenter, false, uiAlign.uiAlignFill);
		grid.append(label2, 1, 1, 1, 1, false, uiAlign.uiAlignFill, false, uiAlign.uiAlignFill);
		grid.append(label3, 0, 2, 1, 1, false, uiAlign.uiAlignFill, false, uiAlign.uiAlignFill);
		grid.append(progress, 1, 2, 1, 1, false, uiAlign.uiAlignFill, false, uiAlign.uiAlignFill);
		//hbox.append(combox, false);
		//hbox.append(progress, false);
		this.append(b3, false);
	}
}
