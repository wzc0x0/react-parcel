<template>
  <div>
    <h1>hello vue!</h1>
    <input
      type="file"
      @change="upload"
      accept="video/* | image/*"
      capture="camera"
    />
    <input
      type="text"
      placeholder="请输入"
      v-input-enter:{a:1,b:2}.json="abort"
    />
    <button @click="abort(3)">stop</button>
  </div>
</template>
<script>
import Vue from "vue";
import directive from "../js/directive.js";
Vue.use(directive);
const qiniu = require("qiniu-js");
const SparkMD5 = require("spark-md5");

document.body.addEventListener("focusin", function() {
  //软键盘弹起事件
  var node = document.activeElement; // 当前focus的dom元素
  console.log(node);
  setTimeout(function() {
    if (node) {
      if (node.nodeName == "TEXTAREA" || node.nodeName == "INPUT") {
        //如果是input或textarea
        if (node.style.textShadow === "") {
          //随便 更改个 无关紧要的样式， 让页面重绘。
          node.style.textShadow = "rgba(0,0,0,0) 0 0 0"; //改变某个不可见样式，触发dom重绘
        } else {
          node.style.textShadow = "";
        }
      }
    }
  }, 1000);
});

const getFileHash = file =>
  new Promise((resolve, reject) => {
    let blobSlice =
        File.prototype.slice ||
        File.prototype.mozSlice ||
        File.prototype.webkitSlice,
      chunkSize = 2097152, // Read in chunks of 2MB
      chunks = Math.ceil(file.size / chunkSize),
      currentChunk = 0,
      spark = new SparkMD5.ArrayBuffer(),
      filereader = new FileReader();

    filereader.onload = e => {
      spark.append(e.target.result); // Append array buffer
      currentChunk++;

      currentChunk < chunks ? loadNext() : resolve(spark.end());
    };

    const loadNext = () => {
      let start = currentChunk * chunkSize,
        end = start + chunkSize >= file.size ? file.size : start + chunkSize;
      filereader.readAsArrayBuffer(blobSlice.call(file, start, end));
    };
    loadNext();

    filereader.onerror = reject;
  });

export default {
  data() {
    return {
      subscription: ""
    };
  },
  methods: {
    upload(e) {
      let input = e.target || e.srcElement,
        file = input.files[0],
        config = { useCdnDomain: true },
        key = null,
        putExtra = { fname: file.name, params: {}, mimeType: null },
        token =
          "tM193uNBWVubyf1od06tTI50euAd31tOOg3GXsA4:Un6QHl4ib8KO7m1PtP9MP6CZE9E=:eyJzY29wZSI6InRlc3QwMDEiLCJkZWFkbGluZSI6MTU0NDAwNTI2Nn0=",
        observable = qiniu.upload(file, key, token, putExtra, config);
      console.log(file);
      return;

      this.subscription = observable.subscribe({
        next({ total }) {
          console.log(total.percent);
        },
        error(err) {
          console.log(err);
        },
        complete(res) {
          console.log(res);
        }
      });
    },
    abort(i) {
      console.log(i);
      console.log(2);
      // this.subscription.unsubscribe();
    }
  }
};
</script>
<style scoped></style>
