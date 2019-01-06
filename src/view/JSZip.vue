<template>
  <div>
    <button @click="download">download</button>
    <h1>CPU Usage:{{cpuData}}%</h1>
  </div>
</template>
<script>
const JSZip = require("jszip/dist/jszip.min");
const saveAs = require("jszip/vendor/FileSaver");

const _ = require("lodash");
/* const downloader = url =>
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
  }); */

class DownloaderUpdateFile {
  constructor(JSZip) {
    this.jszipInstance = new JSZip();
  }

  downloader(url, fileName) {
    fileName = fileName || DownloaderUpdateFile.generateRandomFileName();
    return new Promise(resolve => {
      fetch(url).then(res => {
        if (res.status === 200 || res.status === 0) {
          res.headers.forEach((v, k) => {
            if (k.toString().toLowerCase() === "content-type")
              this.jszipInstance.file(
                `${fileName}.${v.match(/\/\w+/g)[0].slice(1)}`,
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
const detectUsageOfCPU = cb => {
  let data,
    t,
    pulse = () => {
      t && (data = Math.abs(Date.now() - t - 50));
      t = Date.now();
      setTimeout(pulse, 50);
      typeof cb === "function" && cb(data);
    };
  pulse();
};

export default {
  data() {
    return {
      cpuData: null,
      assets: [
        {
          url:
            "https://vips-static.pnlyy.com/wk_app_group/4b5b7b505731f06d62d445ea76b87d53",
          fileName: "1"
        },
        {
          url: "https://vips-static.pnlyy.com/lvF3h0zPHSDDKnee9r5lwFnAdxxp",
          fileName: "2"
        },
        {
          url:
            "https://tests001.pnlyy.com/linewechatclass/7bbc274da20563655d937ba8f0d1abef",
          fileName: "3"
        }
      ]
    };
  },
  methods: {
    download() {
      let instance = new DownloaderUpdateFile(JSZip);
      let promiseArray = this.assets.map(item =>
        instance.downloader(item.url, item.fileName)
      );
      Promise.all([...promiseArray]).then(() => {
        instance.jszipInstance
          .generateAsync(
            {
              type: "blob",
              compression: "DEFLATE",
              compressionOptions: {
                level: 9
              }
            },
            metaData => {
              console.log(metaData.percent);
              console.log(metaData.currentFile);
            }
          )
          .then(
            blob => {
              saveAs(blob, "sb.zip");
            },
            err => {
              console.log(err);
            }
          );
      });
    },
    showCPU(data) {
      this.cpuData = data;
    }
  },
  created() {
    detectUsageOfCPU(_.throttle(this.showCPU, 1000));
  }
};
</script>
<style lang="less" scoped>
</style>
