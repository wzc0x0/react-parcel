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
      if (res.status === 200 || res.status === 0) {
        res.headers.forEach((v, k) => {
          if (k.toString().toLowerCase() === "content-type")
            return resolve({
              blob: res.blob(),
              extension: v.split("/")[1]
            });
        });
      } else reject(new Error(res.statusText));
    });
  });

class DownloaderUpdateFile {
  constructor(JSZip) {
    this.jszipInstance = new JSZip();
  }

  downloader(url, fileName = DownloaderUpdateFile.generateRandomFileName()) {
    return new Promise(resolve => {
      fetch(url).then(res => {
        if (res.status === 200 || res.status === 0) {
          res.headers.forEach((v, k) => {
            if (k.toString().toLowerCase() === "content-type")
              this.jszipInstance.file(
                `${fileName}.${v.split("/")[1]}`,
                res.blob(),
                { binary: true }
              );
            return resolve();
          });
        } else {
          this.jszipInstance.file(
            `notFound/${fileName}.txt`,
            `url=${url}\n\r${res.statusText}`
          );
          resolve();
        }
      });
    });
  }

  static generateRandomFileName() {
    let random = Math.random()
        .toString(36)
        .slice(2),
      now = new Date(),
      time = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
    return random + "-" + time;
  }
}

export default {
  methods: {
    download() {
      let url =
        "https://tests001.pnlyy.com/linewechatclass/7bbc274da20563655d937ba8f0d1abef";
      let instance = new DownloaderUpdateFile(JSZip);
      let array = [url].map(item => instance.downloader(item));
      Promise.all([...array]).then(() => {
        instance.jszipInstance
          .generateAsync({ type: "blob" }, metaData => {
            console.log(metaData.percent);
            console.log(metaData.currentFile);
          })
          .then(
            blob => {
              saveAs(blob, "sb.zip");
            },
            err => {
              console.log(err);
            }
          );
      });
      /* let jszip = new JSZip(),
        url =
          "https://tests001.pnlyy.com/linewechatclass/7bbc274da20563655d937ba8f0d1abef";
      downloader(url).then(({ blob, extension }) => {
        jszip.file(`11111.${extension}`, blob, { binary: true });
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
      }); */
    }
  }
};
</script>
<style lang="less" scoped>
</style>
