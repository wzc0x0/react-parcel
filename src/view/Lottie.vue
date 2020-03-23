<template>
  <div class="box">
    <div id="container"></div>
  </div>
</template>
<script>
import lottie from "lottie-web";
export default {
  data() {
    return {
      lottie: ""
    };
  },
  mounted() {
    this.lottie = lottie.loadAnimation({
      container: document.getElementById("container"),
      renderer: "svg",
      loop: true,
      path:
        "https://labs.nearpod.com/bodymovin/demo/markus/halloween/markus.json"
    });
  }
};
</script>
<style lang="less" scoped></style>
