<template>
  <div>
    {{msg}}
  </div>
</template>
<script>
const worker = new Worker("../js/work.js");

export default {
  data: () => ({
    msg: ""
  }),
  created() {
    worker.onmessage = e => {
      let { data } = e,
        { a, stop } = data;
      if (a > 10) worker.terminate();
      this.msg = a;
    };
    worker.onerror = e => {
      worker.terminate();
      console.log(e);
    };
  }
};
</script>
<style lang="less" scoped>
</style>
