<template>
  <div>
    <transition name="fade">
      <div v-show="!isHidden">
        <h1>CPU Usage:{{cpuData}}%</h1>
        <h1>Current WebPage Memory Usage:{{memoryData}}M</h1>
      </div>
    </transition>
    <button @click="download">download</button>
  </div>
</template>
<script>
const JSZip = require("jszip/dist/jszip.min");
const saveAs = require("jszip/vendor/FileSaver");
const streamSaver = require("streamsaver");
console.log(streamSaver);
import { throttle } from "lodash-es";
import "screw-filereader";
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
      add = value => (value.toString()[1] ? value : "0" + value),
      time = `${now.getFullYear()}-${add(now.getMonth() + 1)}-${add(
        now.getDate()
      )}`;
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
      isHidden: false,
      cpuData: null,
      memoryData: null,
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
              // saveAs(blob, "sb.zip");
              let fileStream = streamSaver.createWriteStream("sb.zip");
              blob.stream().pipeTo(fileStream);
            },
            err => {
              console.log(err);
            }
          );
      });
    },
    showCPU(data) {
      this.cpuData = data;
    },
    detectPageShow() {
      this.isHidden = document.hidden;
    }
  },
  created() {
    detectUsageOfCPU(throttle(this.showCPU, 1000));
    if ("memory" in performance) {
      setInterval(() => {
        let { usedJSHeapSize } = performance.memory;
        this.memoryData = (usedJSHeapSize / (1024 * 1024)).toFixed(1);
      }, 1000);
    }
    document.addEventListener("visibilitychange", this.detectPageShow);
  },
  destroyed() {
    document.removeEventListener("visibilitychange", this.detectPageShow);
    //TODO
  }
};
</script>
<style lang="less" scoped>
@keyframes fade {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.fade-enter-active {
  animation: fade 1s;
  animation-fill-mode: forwards;
}
</style>
