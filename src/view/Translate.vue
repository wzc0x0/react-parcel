<template>
  <div class="wrapper">
    <img
      @click="add"
      class="image"
      :class="{animate:isShow}"
      src="../assets/img/react.png"
      alt=""
    >
  </div>
</template>
<script>
export default {
  data() {
    return {
      isShow: false
    };
  },
  methods: {
    add() {
      this.isShow = true;
      setTimeout(() => {
        this.isShow = false;
      }, 1000);
    }
  }
};
</script>
<style lang="less" scoped>
@keyframes rotate-scale-fade-out {
  0% {
    transform: rotateY(180deg);
  }
  50% {
    transform: scale(10);
  }
  100% {
    opacity: 0;
  }
}

.animate {
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  animation: rotate-scale-fade-out 1s ease-out;
}

.wrapper {
  width: 100%;
  height: 100vh;
  position: relative;
  img {
    display: block;
  }
}
</style>

