<template>
  <div class="bg">
    <img :src="qrcodeUrl" alt>
    <!-- <canvas id="canvas"></canvas> -->
  </div>
</template>
<script>
import reactLogo from "../assets/img/react.png";
import generateQrcode from "../js/qrcode";
export default {
  data() {
    return {
      qrcodeUrl: ""
    };
  },
  created() {
    generateQrcode("https://baidu.com", {
      logoSize:0.25,
      logoSrc: reactLogo,
      canvasOptions: {
        width: 200,
        margin: 0
      }
    }).then(canvas => {
      this.qrcodeUrl = canvas.toDataURL();
    });
    /* qrcode
      .toDataURL(
        "https://github.com/vuejs/vue-cli/tree/204d8f07deb5362804bbffc672d206072ab364f5",
        {
          margin: 2,
          color: {
            dark: "#ff55ffff",
            // light: "#fff" //white,
            light: "#000" //transparent
          }
        }
      )
      .then(url => {
        this.qrcodeUrl = url;
      }); */
  },
  mounted() {
    /* qrcode
      .toCanvas(
        canvasEl,
        "https://github.com/vuejs/vue-cli/tree/204d8f07deb5362804bbffc672d206072ab364f5"
      )
      .then(canvas => {
        console.log(canvas)
      }); */
  }
};
</script>
<style lang="less">
.bg {
  width: 150px;
  height: 150px;
  background-color: black;
  img {
    display: block;
    width: 100%;
    height: 100%;
  }
  #canvas {
    width: 200px;
    height: 200px;
  }
}
</style>

