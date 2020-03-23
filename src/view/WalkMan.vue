<template>
  <div class="box">
    <div class="walk"></div>
    <div class="road"></div>
  </div>
</template>
<style lang="less" scoped>
@keyframes walk {
  0% {
    background-position: 0px;
  }
  100% {
    background-position: -1455px;
  }
}
.box {
  width: 400px;
  height: 400px;
  margin: 20px auto;
  .walk {
    width: 170px;
    height: 318px;
    margin: 0 auto;
    background: url("../assets/img/ClipartKey_723196.png") no-repeat;
    animation: walk 1s steps(8) infinite;
  }
  .road {
    border: 5px dashed orange;
  }
}
</style>
