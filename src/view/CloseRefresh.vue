<template>
  <div></div>
</template>
<script>
const syncRequest = (url, data) => {
  let request = new XMLHttpRequest();
  request.open("POST", url, false);
  request.send(data);
};

export default {
  created() {
    window.onbeforeunload = e => "别跑";
    window.onbeforeunload = e => {
      navigator.sendBeacon(
        "http://localhost:3000/user/update",
        "别跑From onbeforeunload"
      );
      syncRequest(
        "http://localhost:3000/user/update",
        "别跑From onbeforeunload"
      );
    };
    window.onunload = e => {
      navigator.sendBeacon(
        "http://localhost:3000/user/update",
        "别跑From onunload"
      );
      syncRequest("http://localhost:3000/user/update", "别跑From onunload");
    };
  }
};
</script>
<style lang="less" scoped>
</style>
