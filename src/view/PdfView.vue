<template>
  <div>
    <canvas id="pdf-canvas"></canvas>
    <button @click="render(--pageNum)" v-if="pageNum > 1">上一页</button>
    <span>{{pageNum}}</span>
    <button @click="render(++pageNum)" v-if="pageNum <= totalPage + 1">下一页</button>
  </div>
</template>
<script>
// const url =
//   "http://192.168.75.96:8081/%E5%89%8D%E7%AB%AF%E9%9D%A2%E8%AF%95%E9%A2%98%E6%95%B4%E7%90%86.pdf";

const url =
  "http://test001.pnlyy.com/user/contract/fb86e08a27c52bf759ac4b2ac993fb5e.pdf";
import PDFJS from "pdfjs-dist";
PDFJS.GlobalWorkerOptions.workerSrc =
  "http://192.168.43.169:8081/pdf.worker.js";
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
    // this.render(this.pageNum);
    PDFJS.getDocument(url).then(pdf => {
      this.pdfDoc = pdf;
      this.totalPage = pdf.numPages;
      this.render(1);
    });
  },
  methods: {
    render(i) {
      if (i >= this.totalPage + 1) {
        this.pageNum = 1;
        i = 1;
      }
      this.pdfDoc.getPage(i).then(page => {
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
  width: 100vw;
  height: 90vh;
}
#loading {
  width: auto;
  height: 38vh;
  margin: 0 auto;
  display: block;
}
</style>
