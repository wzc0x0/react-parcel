<template>
  <div class="container">
    <div class="ipt-wrapper">
      <input
        ref="ipts"
        @input="input(i,$event)"
        type="tel"
        id="ipt"
        maxlength="1"
        v-for="i in num"
        :key="i"
      >
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    valueArr: []
  }),
  props: {
    num: {
      type: Number,
      default: 4
    }
  },
  created() {
    window.addEventListener("resize", function() {
      if (
        document.activeElement.tagName === "INPUT" ||
        document.activeElement.tagName === "TEXTAREA"
      ) {
        window.setTimeout(function() {
          if ("scrollIntoView" in document.activeElement) {
            document.activeElement.scrollIntoView();
          } else {
            document.activeElement.scrollIntoViewIfNeeded();
          }
        }, 0);
      }
    });
  },
  computed: {
    refsLen() {
      return this.$refs["ipts"].length;
    }
  },
  methods: {
    input(i, e) {
      let value = e.target.value,
        iptArr = this.$refs["ipts"],
        nextIpt = iptArr[i] || iptArr[this.refsLen - 1];

      this.valueArr[i - 1] = value;

      if (i === this.refsLen) {
        nextIpt.blur();
        this.$emit("input-complete", this.valueArr.join(""));
      } else nextIpt.focus();
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  height: 50px;
  width: 200px;
  margin: 100px auto;
  .ipt-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    #ipt {
      width: 100%;
      height: 100%;
      flex-basis: 20%;
      border: 1px solid #ccc;
      user-select: none;
      outline: none;
      text-align: center;
      -webkit-appearance: none;
    }
  }
}
</style>
