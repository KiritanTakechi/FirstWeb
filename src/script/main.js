import {initSakura, sakuraUpdate} from './module/sakura.js';
import resizeCanvas from './module/resizeCanvas.js';
import scrolly from "./module/scrolly.js";


function startSakura() {
    let canvas = initSakura();
    resizeCanvas(canvas);// 监测画布大小
    sakuraUpdate(canvas);// 开始飘落动画循环
}

startSakura();

scrolly();