<template>
  <div>
    <canvas id="canvas" width="100%" height="100%" style="background: #ccc"></canvas>
  </div>
</template>
<script>
import particleInit from './particle.js'
export default {
  mounted() {
    particleInit()
  }
}
</script>
<style>

</style>
