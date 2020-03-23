<template>
  <div class="hammer">
    <div class="hammer-box" v-show="show" @click="show = false">
      <div class="pinch-wrapper">
        <img :src="imgUrl" @click.stop alt />
      </div>
    </div>
    <div class="thumbnail">
      <img @click="onClick" src="../assets/img/bg.jpg" alt />
    </div>
  </div>
</template>

<script>
import Hammer from "hammerjs";

export default {
  data() {
    return {
      show: false,
      imgUrl: ""
    };
  },
  methods: {
    onClick(e) {
      this.show = true;
      this.imgUrl = e.target.src;
    }
  },
  mounted() {
    let el = document.querySelector(".pinch-wrapper");
    let img = el.querySelector("img");
    let ham = new Hammer(el);

    ham.get("pinch").set({ enable: true });
    ham.get("pinch").set({ irection: Hammer.DIRECTION_ALL });

    ham.on("panstart", e => {
      let lf = img.offsetLeft;
      let tp = img.offsetTop;
      ham.on("panmove", e => {
        img.style.marginLeft = lf + e.deltaX + "px";
        img.style.marginTop = tp + e.deltaY + "px";
      });
    });

    ham.on("pinchstart", e => {
      let w = img.width;
      let h = img.height;

      ham.on("pinch", e => {
        // el.style.transform = `scale(${e.scale})`;
        el.style.width = w * e.scale + "px";
        el.style.height = h * e.scale + "px";
      });

      /* ham.on("pinchend", e => {
        el.style.width = w * e.scale + "px";
        el.style.height = h * e.scale + "px";
      }); */
    });
  }
};
</script>

<style lang="less">
.hammer {
  width: 100%;
  height: 300px;
  .hammer-box {
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.6);
    position: fixed;
    .pinch-wrapper {
      width: 90%;
      height: 80%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      overflow: hidden;
    }
  }
  .thumbnail {
    width: 200px;
    height: 100px;
    margin: 0 auto;
    border: 1px solid #ccc;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
