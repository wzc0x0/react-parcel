<template>
  <div>
    <input-mask @input-complete="inputComplete" :key="value"></input-mask>
  </div>
</template>
<script>
import InputMask from "../components/InputMask";
export default {
  data() {
    return {
      value:''
    }
  },
  components:{
    InputMask
  },
  methods:{
    inputComplete(e) {
      console.log(e)
      // alert(e)
      // this.value = e;
    }
  }
}
</script>
<style lang="less" scoped>

</style>
