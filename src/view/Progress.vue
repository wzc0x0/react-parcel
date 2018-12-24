<template>
  <div class="progress-container">
    <span v-for="i in 20" :key="i" class="span-blue"></span>
    <span v-for="k in 10" :key="k" class="span-red"></span>
    <span v-for="j in 7" :key="j" class="span-yellow"></span>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less">
.progress-container {
  width: 150px;
  height: 22px;
  margin: 100px auto;
  font-size: 0;
  border: 1px solid #000;
  span {
    display: inline-block;
    width: 2px;
    height: 20px;
    line-height: 40px;
    margin: 0 2px;
  }
  .span-blue {
    background-color: blue;
    margin-right: 0;
  }
  .span-red {
    background-color: red;
    margin-right: 0;
  }
  .span-yellow {
    background-color: yellow;
    margin-right: 0;
  }
}
</style>
