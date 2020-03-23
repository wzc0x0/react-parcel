<template>
  <div class="box" ref="box">
    <!-- <p
      class="bubble"
      v-for="(item, i) in bubbles"
      :key="i"
      :style="{ left: item.left }"
      @animationend="animationEnd"
    >
      {{ item.text }}
    </p> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      stopId: ""
    };
  },
  mounted() {
    this.start();
    document.addEventListener("visibilitychange", () => {
      if (document["hidden"]) {
        clearInterval(this.stopId);
      } else {
        this.start();
        console.log("show");
      }
    });
  },
  methods: {
    generateFragment() {
      let dom = document.createElement("p");
      dom.textContent = "1".repeat(Math.ceil(Math.random() * 8));
      dom.classList.add("bubble");
      // dom.classList.add("scale");
      dom.style.left = Math.random() * (300 - 100) + "px";
      dom.addEventListener("animationend", this.animationEnd);
      dom.addEventListener("webkitAnimationEnd", this.animationEnd);
      return dom;
    },
    animationEnd(e) {
      let { animationName, target } = e;
      if (animationName === "bubble") {
        document.querySelector(".box").removeChild(target);
      }
    },
    start() {
      this.stopId = setInterval(() => {
        document.querySelector(".box").appendChild(this.generateFragment());
      }, 800);
    }
  }
};
</script>
<style lang="less">
@keyframes bubble {
  0% {
    bottom: 0;
  }
  100% {
    bottom: 100%;
  }
}
@keyframes scale {
  0% {
    transform: scaleX(0.8);
  }
  50% {
    transform: scaleX(1.2);
  }
  100% {
    transform: scaleX(1);
  }
}
.box {
  width: 300px;
  height: 400px;
  border: 1px solid #ccc;
  margin-top: 30px;
  overflow: hidden;
  position: relative;
  .bubble {
    min-width: 50px;
    max-width: 100px;
    height: 30px;
    background-color: purple;
    color: #fff;
    border-radius: 10px;
    text-align: center;
    line-height: 30px;
    position: absolute;
    bottom: 0;
    // animation: bubble 3s linear forwards;
    transform-origin: left;
    animation-name: bubble, scale;
    animation-duration: 3s, 0.35s;
    animation-timing-function: linear, ease;
    animation-fill-mode: forwards, none;
  }
}
</style>
