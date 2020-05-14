<template>
  <div></div>
</template>
<script>
import * as XLSX from "xlsx";
export default {
  mounted() {
    const data = [["S", "h", "e", "e", "t", "J", "S"], [1, 2, 3, 4, 5]];
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.utils.book_append_sheet(wb, ws, "Sheet2");
    /* generate file and send to client */
    XLSX.writeFile(wb, `1.xlsx`);
  }
};
</script>
