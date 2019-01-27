const particleInit = (canvas, text) => {
    // var canvas = document.getElementById("canvas")
    var context = canvas.getContext("2d");
    // var W = canvas.width = window.innerWidth,
    // H = canvas.height = window.innerHeight,

    var W = canvas.width = 800,
        H = canvas.height = 400,
        gridX = 7,
        gridY = 7,
        // colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5',
        //     '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50',
        //     '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800',
        //     '#FF5722'
        // ],
        colors = ['#f3b1d1', '#fffa9d', '#9fd4fb', '#ffffff'],
        durVal = 0.15;

    // 粒子
    function Particle(x, y) {
        this.x = x;
        this.y = y;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.futurRadius = randomInt(1.1, 5.1);
        this.radius = 1.1;
        this.dying = false;
        this.base = [x, y];

        this.drawParticle = function() {

            // 当前粒子变小到一定程度之后，每次将它的半径+0.1，使其慢慢变大
            if (this.radius < this.futurRadius && this.dying === false) {
                this.radius += durVal;
            } else { //粒子已经到达最大状态
                this.dying = true; //表示粒子还处于show状态
            }

            //每次-0.1
            if (this.dying) {
                this.radius -= durVal;
            }

            context.save();
            context.fillStyle = this.color;
            context.beginPath();
            context.arc(this.x, this.y, this.radius, Math.PI * 2, false);
            context.closePath();
            context.fill();
            context.restore();

            //将消失的粒子重置最初的状态
            if (this.y < 0 || this.radius < 1) {
                this.x = this.base[0];
                this.y = this.base[1];
                this.dying = false;
            }
        }
    }

    // 文本对像
    function Shape(text, size, x, y) {
        this.text = text;
        this.size = size;
        this.x = x;
        this.y = y;
        this.placement = []; //文字的数据的位置信息
    }
    Shape.prototype.getValue = function() {
        context.textAlign = "center";
        context.font = this.size + "px arial";
        context.fillText(this.text, this.x, this.y);

        // 复制画布上指定矩形的像素数据
        var idata = context.getImageData(0, 0, W, H);
        // data 属性返回一个对象，是一个8位无符号整数的数组Uint8ClampedArray
        var buffer = new Uint32Array(idata.data.buffer);

        // 抽样获取图像数据使用particle对象记录下当前像素下数据的位置信息
        for (var i = 0; i < H; i += gridY) {
            for (var j = 0; j < W; j += gridX) {
                if (buffer[i * W + j]) {
                    var particle = new Particle(j, i);
                    this.placement.push(particle);
                }
            }
        }
    }

    // 创建模型数据对象
    // var word = new Shape("`(*∩_∩*)′", 200, W/2, H/2);
    var word = new Shape(text, 200, W / 2, H / 2);
    // 调用getValue方法，获取数据位置信息
    word.getValue();

    (function drawFrame() {
        window.requestAnimationFrame(drawFrame);
        context.clearRect(0, 0, W, H);

        for (var i = 0; i < word.placement.length; i++) {
            //调用particle对像的drawParticle方法，开始画布上画
            word.placement[i].drawParticle();
        }

    }())

    function randomInt(min, max) {
        return min + Math.random() * (max - min + 1);
    }
}

export default particleInit;