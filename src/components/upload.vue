<template>
  <div>
    <h1>hello vue!</h1>
    <input type="file" name id @change="upload">
    <button @click="abort">stop</button>
  </div>
</template>
<script>
const qiniu = require("qiniu-js");
const SparkMD5 = require("spark-md5");

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
    async upload(e) {
      let input = e.target || e.srcElement,
        file = input.files[0],
        config = { useCdnDomain: true },
        key = null,
        putExtra = { fname: file.name, params: {}, mimeType: null },
        token =
          "tM193uNBWVubyf1od06tTI50euAd31tOOg3GXsA4:Un6QHl4ib8KO7m1PtP9MP6CZE9E=:eyJzY29wZSI6InRlc3QwMDEiLCJkZWFkbGluZSI6MTU0NDAwNTI2Nn0=",
        observable = qiniu.upload(file, key, token, putExtra, config);
        console.time('start')

      let a = await getFileHash(file)

      console.log(a)
      console.timeEnd('start')
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
    abort() {
      // this.subscription.unsubscribe();
    }
  }
};
</script>
<style scoped>
</style>
