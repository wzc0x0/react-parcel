<template>
  <div>
    <button @click="download">download</button>
  </div>
</template>
<script>
const JSZip = require("jszip/dist/jszip.min");
const saveAs = require("jszip/vendor/FileSaver");
const downloader = url =>
  new Promise((resolve, reject) => {
    fetch(url).then(res => {
      res.status === 200 || res.status === 0
        ? resolve(res.blob())
        : reject(new Error(res.statusText));
    });
  });
export default {
  methods: {
    download() {
      let jszip = new JSZip(),
        url =
          "http://test001.pnlyy.com/linewechatclass/7bbc274da20563655d937ba8f0d1abef";
      jszip.file("11111sb", downloader(url), { binary: true });
      jszip
        .generateAsync({ type: "blob" }, metaData => {
          console.log(metaData.percent);
          console.log(metaData.currentFile);
        })
        .then(
          blob => {
            saveAs(blob, "111sb.zip");
          },
          err => {
            console.log(err);
          }
        );
    }
  }
};
</script>
<style lang="less" scoped>
</style>
