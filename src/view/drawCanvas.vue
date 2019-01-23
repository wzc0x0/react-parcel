<template>
  <div class="draw-wrapper">
    <div id="container">
      <canvas id="canvas" width="300" height="300"></canvas>
    </div>
    <a href="javascript:;">抽奖</a>
  </div>
</template>
<script>
export default {
  // https://blog.givebest.cn/GB-canvas-turntable.html
  mounted() {
    let canvas = document.querySelector('#canvas')

    let ctx = canvas.getContext('2d')
    let num = 8

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
      ctx.rotate((360 / num * i - (360 / num / 2 + 90)) * Math.PI / 180);
      // 绘制圆弧
      ctx.arc(0, 0, 150, 0, 2 * Math.PI / num, false);

      // 颜色间隔
      if (i % 2 == 0) {
        ctx.fillStyle = '#ffb820';
      } else {
        ctx.fillStyle = '#ffcb3f';
      }

       // 填充扇形
      ctx.fill();
      // 绘制边框
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = '#e4370e';
      ctx.stroke();

      // 恢复前一个状态
      ctx.restore();
    }
  }

}
</script>

<style lang="less" scoped>

</style>
