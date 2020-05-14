<template>
  <el-popover
    popper-class="pop-over"
    placement="bottom"
    trigger="manual"
    v-model="visible"
  >
    <el-button slot="reference" @click="visible = !visible">手动激活</el-button>
    <div class="puzzle-container">
      <div class="puzzle-canvas">
        <canvas id="bg-canvas"></canvas>
        <canvas id="block-canvas"></canvas>
      </div>
      <div class="slider">
        <div class="track">
          拖动左边滑块完成上方拼图
        </div>
        <div
          class="button"
          :class="[
            checkStatus
              ? 'el-icon-circle-check button-right'
              : 'el-icon-s-grid button-normal'
          ]"
          @mousedown.prevent="drag"
        ></div>
      </div>
      <div class="operation">
        <span
          title="关闭验证码"
          class="el-icon-circle-close"
          @click="visible = false"
        ></span>
        <span title="刷新验证码" class="el-icon-refresh-left"></span>
      </div>
    </div>
  </el-popover>
</template>
<script>
import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import bgImg from "../assets/img/bg.jpg";
Vue.use(ElementUI);
const randomArea = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const getPixelRatio = context => {
  const backingStore =
    context.backingStorePixelRatio ||
    context.webkitBackingStorePixelRatio ||
    context.mozBackingStorePixelRatio ||
    context.msBackingStorePixelRatio ||
    context.oBackingStorePixelRatio ||
    context.backingStorePixelRatio ||
    1;
  return (window.devicePixelRatio || 1) / backingStore;
};
const draw = (ctx, xy = { x: 254, y: 109, r: 9 }, type) => {
  const x = xy.x,
    y = xy.y,
    r = xy.r,
    w = 40;
  const PI = Math.PI;
  //绘制
  ctx.beginPath();
  //left
  ctx.moveTo(x, y);
  //top
  ctx.arc(x + (w + 5) / 2, y, r, -PI, 0, true);
  ctx.lineTo(x + w + 5, y);
  //right
  ctx.arc(x + w + 5, y + w / 2, r, 1.5 * PI, 0.5 * PI, false);
  ctx.lineTo(x + w + 5, y + w);
  //bottom
  ctx.arc(x + (w + 5) / 2, y + w, r, 0, PI, false);
  ctx.lineTo(x, y + w);
  ctx.arc(x, y + w / 2, r, 0.5 * PI, 1.5 * PI, true);
  ctx.lineTo(x, y);
  //修饰，没有会看不出效果
  ctx.lineWidth = 1;
  ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
  ctx.strokeStyle = "rgba(255, 255, 255, 0.6)";
  ctx.stroke();
  ctx[type]();
  ctx.globalCompositeOperation = "xor";
};

const bgX = randomArea(127, 234),
  blockX = randomArea(10, 97),
  y = randomArea(10, 99);
export default {
  data() {
    return {
      visible: true,
      checkStatus: false,
      blockCanvas: null
    };
  },
  mounted() {
    const bgCanvas = document.getElementById("bg-canvas");
    const blockCanvas = document.getElementById("block-canvas");
    const bg = bgCanvas.getContext("2d");
    const block = blockCanvas.getContext("2d");
    const width = bgCanvas.width;
    const height = bgCanvas.height;
    const ratio = 1;

    bgCanvas.width = width * ratio;
    bgCanvas.height = height * ratio;
    blockCanvas.width = width * ratio;
    blockCanvas.height = height * ratio;

    const img = document.createElement("img");
    img.style.objectFit = "scale-down";
    img.src = bgImg;
    img.onload = () => {
      bg.drawImage(img, 0, 0, width * ratio, height * ratio);
      block.drawImage(img, 0, 0, width * ratio, height * ratio);
    };

    draw(bg, { x: bgX, y, r: 9 }, "fill");
    draw(block, { x: blockX, y, r: 9 }, "clip");
  },
  methods: {
    drag(e) {
      const dom = e.target;
      const block = document.getElementById("block-canvas");
      const currentCoordinate = { x: e.x, y: e.y };
      let x = 0;
      const move = event => {
        x = event.x - currentCoordinate.x;
        if (x >= 251 || x <= 0) {
          return;
        }

        if (x === bgX - blockX) {
          this.checkStatus = true;
          console.log("success");
        }
        block.style.left = x + "px";
        dom.style.left = x + "px";
      };
      const up = () => {
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
        dom.style.left = "";
        block.style.left = "";
      };
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
    }
  }
};
</script>
<style>
.pop-over {
  padding: 0;
}
</style>
<style lang="less" scoped>
.puzzle-container {
  padding: 12px 12px 0;
  .puzzle-canvas {
    position: relative;
    #bg-canvas,
    #block-canvas {
      width: 340px;
      height: 200px;
    }
    #block-canvas {
      top: 0;
      left: 0;
      position: absolute;
    }
  }
}

.slider {
  width: 100%;
  height: 65px;
  border-bottom: #c7c9d0 1px solid;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  .track {
    margin-left: 7px;
    width: 286px;
    height: 38px;
    background: rgba(28, 136, 188, 0.5);
    border-radius: 25px;
    font-size: 14px;
    line-height: 38px;
    padding-right: 15px;
    padding-left: 70px;
  }
  .pintuTrue {
    background: #67c23a;
    color: #ffffff;
  }
  .button-right {
    color: #7ac23c;
  }
  .button-normal {
    color: #3e5d8b;
    &:hover {
      color: #2181bd;
    }
  }
  .button {
    position: absolute;
    width: 50px;
    height: 50px;
    line-height: 48px;
    background: #ffffff;
    box-shadow: #b9bdc8 0 0 3px;
    border-radius: 50%;
    left: 7px;
    text-align: center;
    font-size: 28px;
    cursor: move;
  }
}
.operation {
  width: 100%;
  height: 40px;
  > span {
    color: #9fa3ac;
    display: inline-block;
    width: 40px;
    font-size: 25px;
    line-height: 40px;
    text-align: center;
    &:hover {
      background: #e2e8f5;
    }
  }
}
</style>
