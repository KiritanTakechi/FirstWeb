const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// 获取2D上下文
const ctx = canvas.getContext('2d');

// 定义樱花的颜色
const colors = [
    '#f8c3cd', '#f8b3c3', '#f6a3b3', '#f694a4',
    '#f58494', '#ffe4e1', '#ffc0cb', '#ffa6c9',
    '#db7093'];

// 定义存储樱花的数组
let sakuras = [];

// 定义樱花类
class Sakura {
    constructor(x, y, r, vx, vy) {
        this.x = x; // 樱花的x坐标
        this.y = y; // 樱花的y坐标
        this.r = r; // 樱花的半径
        this.vx = vx; // 樱花在x轴上的速度
        this.vy = vy; // 樱花在y轴上的速度
        this.color = colors[Math.floor(Math.random() * colors.length)]; // 随机选择颜色
        this.petals = 5; // 五瓣樱花
    }

    // 更新樱花的位置
    update() {
        this.x += this.vx;
        this.y += this.vy;
    }

    // 绘制樱花
    draw() {
        const angle = (Math.PI * 2) / this.petals; // 计算每个花瓣的角度
        const r = this.r / 2; // 花瓣的半径
        ctx.fillStyle = this.color;

        ctx.beginPath();
        // 绘制五个花瓣
        for (let i = 0; i <= this.petals; i++) {
            const petalX = this.x + r * Math.cos(angle * i);
            const petalY = this.y + r * Math.sin(angle * i);
            const controlX = this.x + r * Math.cos(angle * (i + 1.1)) * 4;
            const controlY = this.y + r * Math.sin(angle * (i + 1.1)) * 4;
            ctx.quadraticCurveTo(controlX, controlY, petalX, petalY);
        }
        ctx.closePath();
        ctx.fill();

        // 绘制花瓣中心
        ctx.beginPath();
        ctx.arc(this.x, this.y, r / 3.5, 0, 2 * Math.PI);
        ctx.fillStyle = '#fff';
        ctx.fill();
    }
}

// 创建樱花
function createSakura() {
    const x = Math.random() * canvas.width; // 随机x坐标
    const y = -50; // 初始y坐标为-50
    const r = Math.random() * 15 + 5; // 随机半径
    const vx = Math.random() * 2 - 1; // 随机x轴速度
    const vy = Math.random() * 2 + 1; // 随机y轴速度
    const sakura = new Sakura(x, y, r, vx, vy); // 创建樱花对象

    sakuras.push(sakura); // 将樱花添加到数组中
}

// 绘制所有樱花
function drawSakuras() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // 清空画布

    for (let i = 0; i < sakuras.length; i++) {
        const sakura = sakuras[i];

        sakura.update(); // 更新樱花的位置

        sakura.draw(); // 绘制樱花

        // 如果樱花已经飘出画布，则从数组中删除
        if (sakura.y > canvas.height + 50) {
            sakuras.splice(i, 1);
            i--;
        }
    }
}

// 每100毫秒创建一个樱花
setInterval(createSakura, 100);

// 循环绘制樱花
function loop() {
    requestAnimationFrame(loop);

    drawSakuras();
}

// 开始循环绘制樱花
loop();