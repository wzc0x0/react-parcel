<template>
  <div class="scratch-wrapper">
    <img
      class="img"
      src="../assets/img/react.png"
      alt=""
    >
    <canvas
      v-scratch
      id="canvas"
      width="128"
      height="128"
      @mouseover="move($event)"
      @touchmove="move($event)"
    ></canvas>
  </div>
</template>
<script>
let canvasCtx;
export default {
  directives: {
    scratch: {
      bind: function(el) {
        let ctx = el.getContext("2d"),
          width = el.width,
          height = el.height,
          area = width * height;
        ctx.beginPath();
        ctx.fillStyle = "grey";
        ctx.fillRect(0, 0, width, height);
        canvasCtx = ctx;
      }
    }
  },
  methods: {
    move(e) {
      let canvas = e.target || e.srcElement,
        w = canvas.width,
        h = canvas.height,
        x = e.clientX || e.touches[0].clientX,
        y = e.clientY || e.touches[0].clientY,
        canvasData = canvasCtx.getImageData(0, 0, w, h).data,
        i = 3,
        scratchNum = 0;

      while (i < canvasData.length) {
        i += 4;
        canvasData[i] === 0 && scratchNum++;
      }

      if (scratchNum > w * h * 0.7) {
        canvasCtx.clearRect(0, 0, w, h);
      }

      canvasCtx.globalCompositeOperation = "destination-out";
      canvasCtx.beginPath();
      canvasCtx.arc(x, y, 10, 0, Math.PI * 2);
      canvasCtx.fill();
      canvasCtx.closePath();
    }
  }
};
</script>

<style lang="less" scoped>
.img {
  display: block;
  width: 128px;
  height: auto;
  position: absolute;
  z-index: -1;
}
</style>

