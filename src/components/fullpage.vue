<template>
  <swiper ref="mySwiper" :options="swiperOption" class="swiper-box">
    <swiper-slide class="swiper-item" v-for="i in 6" :key="i">
      <div class="content">
        <p>{{i}}</p>
        <a href="javascript:;" @click="prev">上一页</a>
        <a href="javascript:;" @click="next">下一页</a>
      </div>
    </swiper-slide>
  </swiper>
</template>
<script>
import "swiper/dist/css/swiper.css";
// require styles
import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
  data() {
    return {
      swiperOption: {
        direction: "vertical",
        speed: 1500,
        slidesPerGroup: 1,
        slidesPerView: 1,
        mousewheel: true
      }
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  methods: {
    next() {
      this.swiper.slideNext();
    },
    prev() {
      this.swiper.slidePrev();
    }
  },
  components: {
    swiper,
    swiperSlide
  }
};
</script>
<style lang="less">
html,
body {
  position: relative;
  height: 100%;
}
.swiper-box {
  width: 100%;
  height: 100vh;
  margin: 0 auto;
}
.swiper-item {
  width: 100%;
  height: 100%;
  .content {
    width: 100%;
    height: 100%;
    background-color: burlywood;
  }
}
</style>
