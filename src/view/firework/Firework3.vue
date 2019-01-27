<template>
  <div>
    <canvas id="canvas" width="100%" height="500"></canvas>
  </div>
</template>
<script>
import particleInit from "./particle.js";
export default {
  mounted() {
    require("./firework.js");
    particleInit();
  }
};
</script>
<style>
html,body {
  width: 100%;
  height: 100vh;
  background-image: url('../../assets/img/bg.jpg');
  margin: 0px;
  overflow: hidden;
}
#canvas {
  width: 100%;
  position: absolute;
  z-index: 2;
  background: transparent;
}
#canvas-firework {
  background: transparent;
  position: absolute;
  z-index: 1;
}
</style>
