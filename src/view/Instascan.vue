<template>
  <div>
    <video id="preview"></video>
    <button @click="start">开始呗</button>
  </div>
</template>
<script>
import Instascan from "instascan";

export default {
  mounted() {
    let scanner = new Instascan.Scanner({
      video: document.getElementById("preview")
    });
    scanner.addListener("scan", function(content) {
      console.log(content);
    });
    Instascan.Camera.getCameras()
      .then(function(cameras) {
        if (cameras.length > 0) {
          scanner.start(cameras[0]);
        } else {
          console.error("No cameras found.");
        }
      })
      .catch(function(e) {
        console.error(e);
      });
  },
  methods:{
    start() {
      scanner.st
    }
  }
};
</script>
<style lang="less" scoped>
</style>
