<template>
  <div>
    <input type="file" @change="e => onChange(e)" />
  </div>
</template>
<script>
// https://github.com/naptha/tesseract.js/blob/master/docs/api.md#create-worker
import { createWorker } from "tesseract.js";
const worker = createWorker({
  logger: m => console.log(m)
});
export default {
  methods: {
    async onChange(e) {
      let { files } = e.target;
      let file = files[0];
      console.log(file);
      await worker.load();
      await worker.loadLanguage("eng+chi_sim");
      await worker.initialize("eng+chi_sim");
      const { data } = await worker.recognize(file);
      console.log(data);
    }
  }
};
</script>
<style lang="less" scoped></style>
