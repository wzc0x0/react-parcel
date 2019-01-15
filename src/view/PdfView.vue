<template>
  <div>
    <canvas id="pdf-canvas"></canvas>
    <!-- <img id="loading" v-else src="../assets/img/react.png" alt> -->
    <button @click="render(--pageNum)" v-if="pageNum > 1">上一页</button>
    <span>{{pageNum}}</span>
    <button @click="render(++pageNum)" v-if="pageNum <= totalPage">下一页</button>
  </div>
</template>
<script>
// const url =
//   "http://192.168.75.96:8081/%E5%89%8D%E7%AB%AF%E9%9D%A2%E8%AF%95%E9%A2%98%E6%95%B4%E7%90%86.pdf";

const url =
  "https://file.jinhui120.com/dev/selling/upload/20181030/feff157172b14cfc84346f3d05da8ba6/2018%202H%E5%B8%82%E5%9C%BA%E9%83%A8%E9%A1%B9%E7%9B%AE%E7%AD%96%E5%88%92%E6%96%B9%E6%A1%88_180702.pdf";

const PDFJS = require("pdfjs-dist/build/pdf.min");
PDFJS.GlobalWorkerOptions.workerSrc =
  "https://unpkg.com/pdfjs-dist@2.0.943/build/pdf.worker.js";

export default {
  data() {
    return {
      pdfDoc: null,
      totalPage: 1,
      pageNum: 1,
      isShow: true
    };
  },
  mounted() {
    this.render(this.pageNum);
  },
  methods: {
    render(i) {
      if (i >= this.totalPage) {
        this.pageNum = 1;
        i = 1;
      }
      // this.isShow = false;

      PDFJS.getDocument(url)
        .then(pdf => {
          this.pdfDoc = pdf;
          this.totalPage = pdf.numPages;
          return pdf.getPage(i);
        })
        .then(page => {
          var scale = window.devicePixelRatio;
          // 获取pdf尺寸
          var viewport = page.getViewport(scale);
          // 获取需要渲染的元素
          var canvas = document.getElementById("pdf-canvas");
          var context = canvas.getContext("2d");
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          var renderContext = {
            canvasContext: context,
            viewport: viewport
          };

          page.render(renderContext);
        });
    }
  }
};
</script>
<style lang="less">
#root {
  width: 100%;
  height: 100%;
}
#pdf-canvas {
  width: 100%;
  // height: 90vh;
}
#loading {
  width: auto;
  height: 38vh;
  margin: 0 auto;
  display: block;
}
</style>
