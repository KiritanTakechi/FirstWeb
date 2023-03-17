import getPageSize from '../utils/getPageSize.js';

export default function resizeCanvas(canvas) {
    // 监听窗口的resize事件
    window.addEventListener('resize', () => {
        // 设置画布的宽度和高度
        canvas.width = getPageSize().width;
        canvas.height = getPageSize().height;
    });
}