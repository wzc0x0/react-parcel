<template>
  <div>
    <span>regular</span>
    <input type="text" @keyup="regularFn" />
    <br />
    <span>debounce</span>
    <input type="text" @keyup="debounceFn" />
    <br />
    <span>throttle</span>
    <input type="text" @keyup="throttleFn" />
    <br />
    <span>phoneNumber</span>
    <input type="tel" @keyup="formatFn" v-model="phoneNumber" maxlength="13" />
  </div>
</template>
<script>
import { debounce, throttle } from "lodash-es";
export default {
  data() {
    return {
      phoneNumber: ""
    };
  },
  methods: {
    regularFn() {
      console.log("regular");
    },
    // 1s内只能触发一次
    // 适用于按键
    debounceFn: debounce(
      function() {
        console.log("debounceFn");
      },
      1000,
      {
        leading: true,
        trailing: false
      }
    ),
    // 每隔1s内检查一次
    // 适用于滚动条
    throttleFn: throttle(function() {
      console.log("throttle");
    }, 1000),
    phoneNumberFormat: debounce(function() {
      this.formatFn();
    }, 300),
    formatFn() {
      this.phoneNumber = this.phoneNumber.substr(0, 13).replace(/\D/g, "");
      if (!this.phoneNumber) return;
      let arr = this.phoneNumber.split("");
      for (let k = 0; k < arr.length; k++) {
        if (k == 3 || k == 7) {
          arr[k] = " " + arr[k];
        }
      }
      this.phoneNumber = arr.join("");
      this.phoneNumber = this.phoneNumber.substr(0, 13);
    }
  }
};
</script>
<style scoped>
input {
  width: 300px;
  height: 38px;
  border: 1px solid #ccc;
  margin: 10px auto;
}
span {
  width: 120px;
  padding-left: 20px;
  display: inline-block;
}
</style>
