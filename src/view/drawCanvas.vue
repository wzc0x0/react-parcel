<template>
  <div class="draw-wrapper">
    <div id="container" @transitionend="drawEnd">
      <canvas id="canvas" width="300" height="300"></canvas>
      <ul id="gift-wrapper"></ul>
    </div>
    <a
      class="draw-btn"
      :class="{'btn-disabled':start}"
      href="javascript:;"
      @click="reward"
    >{{start ? '抽奖中':'抽奖'}}</a>
    <!-- <input type="text" v-model="num" disabled> -->
  </div>
</template>
<script>
// import * as math from "mathjs";
// import BigNumber from "bignumber.js";
// let a = new BigNumber("91234000000000001");
import reactLogo from "../assets/img/react.png";
let content = [
  { text: "1元红包", img: "images/redpacket.png" },
  { text: "2元红包" },
  { text: "3元红包" },
  { text: "显示器", img: "images/display.png" },
  { text: "5元红宝" },
  { text: "6元红宝" },
  { text: "7元红宝" },
  { text: "8元红宝" }
];

let deg = 0;
export default {
  data() {
    return {
      num: "",
      start: false
    };
  },
  methods: {
    reward() {
      this.start = true;
      let container = document.querySelector("#container");
      deg += 360 - (deg % 360) + (360 * 6 - 5 * (360 / 8));
      container.style.transform = "rotate(" + deg + "deg)";
    },
    drawEnd() {
      this.start = false;
    }
  },
  mounted() {
    let container = document.querySelector("#container");
    let canvas = container.querySelector("#canvas");
    let ul = container.querySelector("#gift-wrapper");

    let generateFragment = content => {
      if (!Array.isArray(content)) return;
      let turn = 1 / content.length;
      let html = content.map((item, i) => {
        let li = `<li><p style="transform: rotate(${i * turn}turn)">${
          item.img ? `<img src="${reactLogo}">` : item.text
        }</p></li>`;
        return li;
      });

      return html.join("");
    };

    let ctx = canvas.getContext("2d");
    let num = 8;

    for (let i = 0; i < num; i++) {
      // 保存当前状态
      ctx.save();
      // 开始一条新路径
      ctx.beginPath();
      // 位移到圆心，下面需要围绕圆心旋转
      ctx.translate(150, 150);
      // 从(0, 0)坐标开始定义一条新的子路径
      ctx.moveTo(0, 0);
      // 旋转弧度,需将角度转换为弧度,使用 degrees * Math.PI/180 公式进行计算。
      ctx.rotate((((360 / num) * i - (360 / num / 2 + 90)) * Math.PI) / 180);
      // 绘制圆弧
      ctx.arc(0, 0, 150, 0, (2 * Math.PI) / num, false);

      // 颜色间隔
      if (i % 2 == 0) {
        ctx.fillStyle = "#ffb820";
      } else {
        ctx.fillStyle = "#ffcb3f";
      }

      // 填充扇形
      ctx.fill();
      // 绘制边框
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = "#e4370e";
      ctx.stroke();

      // 恢复前一个状态
      ctx.restore();
    }

    ul.innerHTML = generateFragment(content);
  }
};
</script>
<style lang="less">
#root {
  padding-top: 20px;
}
#gift-wrapper {
  position: absolute;
  left: 0;
  top: 0;
  width: inherit;
  height: inherit;
  z-index: 2;
  & > li {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    color: #e4370e;
    font-weight: bold;
    text-shadow: 0 1px 1px rgba(255, 255, 255, 0.6);
    p {
      position: relative;
      padding-top: 20px;
      margin: 0 auto;
      text-align: center;
      transform-origin: 50% 150px;
      img {
        width: 50px;
        height: 50px;
      }
    }
  }
}
</style>

<style lang="less" scoped>
.draw-wrapper {
  position: relative;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  margin: 0 auto;
  // border: 16px solid #e44025;
  // box-shadow: 0 2px 3px #333, 0 0 2px #000;
  #container {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    width: inherit;
    height: inherit;
    border-radius: inherit;
    background-clip: padding-box;
    background-color: #ffcb3f;
    transition: all 6s ease;
  }
  .draw-btn {
    position: absolute;
    left: 110px;
    top: 110px;
    z-index: 3;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    color: #f4e9cc;
    background-color: #e44025;
    line-height: 80px;
    text-align: center;
    font-size: 20px;
    text-shadow: 0 -1px 1px rgba(0, 0, 0, 0.6);
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.6);
    text-decoration: none;
  }

  .draw-btn::after {
    position: absolute;
    display: block;
    content: "";
    left: 10px;
    top: -46px;
    width: 0;
    height: 0;
    overflow: hidden;
    border-width: 30px;
    border-style: solid;
    border-color: transparent;
    border-bottom-color: #e44025;
  }
  .btn-disabled {
    pointer-events: none;
    background: #b07a7b;
    color: #ccc;
    border: none;
  }
  .btn-disabled::after {
    border-bottom-color: #b07a7b;
  }
}
</style>
