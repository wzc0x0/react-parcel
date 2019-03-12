<template>
  <div
    ref="parentElement"
    class="container"
  >
    <ul @scroll="inspectViewport">
      <li
        v-for="i in lists"
        :key="i"
        ref="childrenElement"
      >
        <h1>hello world:{{i}}</h1>
      </li>
    </ul>
  </div>
</template>
<script>
let arr = new Array();
export default {
  data: () => ({
    lists: []
  }),
  created() {
    for (let index = 0; index < 100; index++) {
      this.lists[index] = index;
    }
  },
  mounted() {
    let parentDomPos = this.$refs["parentElement"].getBoundingClientRect(),
      parentDomTop = parentDomPos.top,
      parentDomBottom = parentDomPos.bottom,
      viewportHeight = parseInt(parentDomBottom - parentDomTop);

    this.$refs["childrenElement"].forEach(dom => {
      let domPos = dom.getBoundingClientRect();
      console.log(domPos.top, domPos.bottom);
    });
  },
  methods: {
    inspectViewport() {
      console.log(1);
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  width: 300px;
  height: 300px;
  overflow-y: auto;
  margin: 0 auto;
  border: 1px solid #ccc;
  h1 {
    text-align: center;
  }
}
</style>
