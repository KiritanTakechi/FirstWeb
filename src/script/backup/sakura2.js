import getPageSize from '../utils/getPageSize.js';
//import {canvas} from '../main.js';

export {sakuraUpdate};

// 获取canvas元素
const canvas = document.getElementById('canvas');

// 将canvas的尺寸设置为页面的实际尺寸
canvas.width = getPageSize().width;
canvas.height = getPageSize().height;

// 获取2D上下文
const ctx = canvas.getContext('2d');

// 定义樱花的颜色
const COLORS = [
    '#f8c3cd', '#f8b3c3', '#f6a3b3', '#f694a4',
    '#f58494', '#ffe4e1', '#ffc0cb', '#ffa6c9',
    '#db7093'
];

// 定义存储樱花的数组
let sakuras = [];

// 定义常量
const PETALS = 5;
const GRAVITY = 0.01;

// 定义樱花类
class Sakura {
    constructor(x, y, r, vx, vy) {
        this.x = x; // 樱花的x坐标
        this.y = y; // 樱花的y坐标
        this.r = r; // 樱花的半径
        this.vx = vx; // 樱花在x轴上的速度
        this.vy = vy; // 樱花在y轴上的速度
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)]; // 随机选择颜色
        this.petals = PETALS; // 花瓣数
    }

    // 更新樱花的位置
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += GRAVITY; // 增加重力加速度
    }

    // 绘制樱花
    draw() {
        const angle = (Math.PI * 2) / this.petals; // 计算每个花瓣的角度
        const r = this.r / 2; // 花瓣的半径
        ctx.fillStyle = this.color; // 设置填充颜色

        ctx.beginPath();
        // 绘制每个花瓣
        for (let i = 0; i <= this.petals; i++) {
            const petalX = this.x + r * Math.cos(angle * i);
            const petalY = this.y + r * Math.sin(angle * i);
            const controlX = this.x + r * Math.cos(angle * (i + 1.1)) * 4;
            const controlY = this.y + r * Math.sin(angle * (i + 1.1)) * 4;

            ctx.quadraticCurveTo(controlX, controlY, petalX, petalY);
        }

        ctx.fill();
    }

    // 检查樱花是否超出屏幕
    isOutOfBounds() {
        return this.x < -this.r || this.x > canvas.width + this.r || this.y > canvas.height + this.r;
    }
}

// 创建樱花
function createSakura() {
    const x = Math.random() * canvas.width;
    const y = -Math.random() * canvas.height / 2;
    const r = Math.random() * 10 + 5;
    const vx = Math.random() * 1.2 - 0.8;
    const vy = Math.random() * 1.2 + 0.8;

    return new Sakura(x, y, r, vx, vy);
}

// 更新画面
function sakuraUpdate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // 清空画布

    sakuras = sakuras.filter(sakura => !sakura.isOutOfBounds()); // 过滤掉超出屏幕的樱花

    // 添加新的樱花
    if (sakuras.length < 100) {
        sakuras.push(createSakura());
    }

    // 更新樱花的位置并绘制
    sakuras.forEach(sakura => {
        sakura.update();
        sakura.draw();
    });

    requestAnimationFrame(sakuraUpdate); // 请求下一帧动画
}

// function initSakura() {
//     let canvas = document.createElement('canvas');
//     canvas.id = 'canvas';
//     document.body.insertBefore(canvas, document.body.firstElementChild);
//     return canvas;
// }