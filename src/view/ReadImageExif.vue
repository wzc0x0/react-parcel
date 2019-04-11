<template>
  <div class="container">
    <a href="javascript:;" class="upload">
      点击
      <input type="file" accept="image/jpg" @change="uploadImage">
    </a>
    <div class="preview" v-show="imgUrl">
      <img :src="imgUrl" :key="imgUrl" id="exif" @load="readExif">
    </div>
    <ul class="exifInfo" v-if="exifInfo">
      <li>制造商：{{exifInfo.Make}}</li>
      <li>型号：{{exifInfo.Model}}</li>
      <li>系统版本：{{exifInfo.Software}}</li>
      <li>拍摄时间：{{exifInfo.DateTime}}</li>
      <li>拍摄地点：{{position}}</li>
      <li>海拔：{{exifInfo.GPSAltitude ? ~~exifInfo.GPSAltitude + "m": "未开启GPS"}}</li>
      <li>图片尺寸：{{exifInfo.PixelXDimension + "x" + exifInfo.PixelYDimension}}</li>
      <li v-if="!exifInfo">无exif数据</li>
    </ul>
  </div>
</template>
<script>
import exifJs from "exif-js";
export default {
  data: () => ({
    imgUrl: "",
    exifInfo: null
  }),
  computed: {
    position() {
      let { GPSLatitude, GPSLongitude } = this.exifInfo;

      if (GPSLatitude || GPSLongitude) {
        return (
          this.exifInfo.GPSLatitudeRef +
          " " +
          `${GPSLatitude[0]}度${GPSLatitude[1]}分${GPSLatitude[2]}秒` +
          " " +
          this.exifInfo.GPSLongitudeRef +
          " " +
          `${GPSLongitude[0]}度${GPSLongitude[1]}分${GPSLongitude[2]}秒`
        );
      } else {
        return "未开启GPS";
      }
    }
  },
  methods: {
    uploadImage(e) {
      let dom = e.target || e.srcElement;
      let file = dom.files[0];
      let reader = new FileReader();
      let that = this;
      reader.onload = function() {
        that.imgUrl = this.result;
        e.value = null;
      };
      reader.readAsDataURL(file);
    },
    readExif(e) {
      let dom = e.target || e.srcElement;
      let that = this;
      exifJs.getData(dom, function() {
        that.exifInfo = exifJs.getAllTags(this);
        Object.keys(that.exifInfo).length === 0 && (that.exifInfo = null);
      });
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  width: 1000px;
  margin-top: 60px;
  margin-left: auto;
  margin-right: auto;
  .upload {
    width: 60px;
    height: 40px;
    display: block;
    position: relative;
    background-color: rgb(233, 104, 107);
    color: #fff;
    line-height: 40px;
    text-align: center;
    cursor: pointer;
    input[type="file"] {
      width: 60px;
      height: 40px;
      opacity: 0;
      position: absolute;
      left: 0;
      top: 0;
    }
  }
  .preview {
    width: 500px;
    height: auto;
    border: 1px dashed #ccc;
    margin-top: 20px;
    img {
      width: 500px;
      height: auto;
      display: block;
    }
  }
  .exifInfo {
    margin-top: 20px;
    li {
      padding: 10px 0;
    }
  }
}
</style>
