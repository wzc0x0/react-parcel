<template>
  <div>
    <input-mask @input-complete="inputComplete" :key="value"></input-mask>
    <p class="tips">Welcome to TDX!</p>
  </div>
</template>
<script>
import InputMask from "../components/InputMask";
export default {
  data() {
    return {
      value: ""
    };
  },
  components: {
    InputMask
  },
  methods: {
    inputComplete(e) {
      console.log(e);
      // alert(e)
      // this.value = e;
    }
  }
};
</script>
<style lang="less" scoped>
.tips {
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  bottom: 100px;
  text-align: center;
}
</style>
