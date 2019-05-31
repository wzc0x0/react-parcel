<template>
  <div
    class="container-simple"
    v-infinite-scroll="loadMore"
    infinite-scroll-disabled="busy"
    infinite-scroll-distance="2000"
  >
    <div class="wrapper" v-for="(item,i) in lists" :key="i">
      <div class="border md:flex">
        <div class="md:flex-shrink-0">
          <swiper :options="swiperOption">
            <swiper-slide>
              <a :href="item.alt">
                <img class="rounded-lg" :src="item.images.small">
              </a>
            </swiper-slide>
            <swiper-slide v-for="(cast,m) in item.casts" :key="m">
              <a :href="cast.alt">
                <img class="rounded-lg" :src="cast.avatars.small">
              </a>
            </swiper-slide>
          </swiper>
        </div>
        <div class="mt-4 md:mt-0 md:ml-6">
          <div
            class="uppercase tracking-wide text-indigo-600 font-bold"
          >{{item.title}}（{{item.original_title}}）- {{item.durations[0]}}</div>
          <div class="mt-2 text-orange-300 text-sm">
            <span
              v-for="(genre,j) in item.genres"
              :key="j"
            >{{genre}}{{item.genres.length - 1 > j ? '、' : ''}}</span>
          </div>
          <div class="mt-2 text-gray-600">
            <span>上映时间：</span>
            <span class="mr-2 leading-normal" v-for="(date,k) in item.pubdates" :key="k">{{date}}</span>
          </div>
          <p class="mt-2 text-gray-600">综合评分：{{item.rating.average}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import infiniteScroll from "vue-infinite-scroll";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";

Vue.use(infiniteScroll);
const randomArray = arr => {
  let count = 10;
  while (count--) {
    let a = ~~(Math.random() * arr.length),
      b = ~~(Math.random() * arr.length);
    [arr[a], arr[b]] = [arr[b], arr[a]];
  }
};

export default {
  data: () => ({
    lists: [],
    busy: false,
    swiperOption: {
      slidesPerView: 2,
      spaceBetween: 10,
      freeMode: true
    }
  }),

  components: {
    swiper,
    swiperSlide
  },

  methods: {
    renderInit() {
      return new Promise(resolve => {
        fetch("http://192.168.75.65:3000/douban/new-movies")
          .then(res => res.json())
          .then(({ data }) => {
            randomArray(data.subjects);
            this.lists = this.lists.concat(data.subjects);
            resolve();
          });
      });
    },

    loadMore() {
      this.busy = true;
      this.renderInit().then(res => {
        this.busy = false;
      });
    }
  },

  metaInfo: {
    title: "普通列表"
  }
};
</script>
<style lang="less" scoped>
.container-simple {
  padding: 10px 10px;
  .wrapper {
    padding-bottom: 10px;
    .border {
      border-radius: 10px;
      padding: 10px;
      border: 1px solid #e2e8f0;
    }
    .rounded-lg {
      height: 210px;
    }
  }
}
</style>
