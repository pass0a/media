import { uiTab, uiWindow, startLoop } from '@passoa/libui';
import { videoPage } from './video';
import { audioPage } from './audio';
import { id3Page } from './id3';

let x = new uiWindow('hello', 400, 320, 0);

let tab = new uiTab();
x.setChild(tab);
tab.append('视频转码', new videoPage(x));
tab.append('音频转码', new audioPage(x));
tab.append('提取ID3', new id3Page(x));
x.show();
startLoop();
