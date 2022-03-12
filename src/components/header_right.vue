<template>
  <div>
    <div
      class="row-start-1 row-span-1 col-start-3 col-span-1 text-center text-xs md:text-sm"
    >
      <div class="mt-2">
        <p class="text-base md:text-2xl text-center lg:text-left">
          ใบเสนอราคา (สำนักงานใหญ่)
        </p>
      </div>
      <div
        class="grid overflow-hidden grid-cols-3 grid-rows-2 gap-1 mx-16 lg:mx-0 text-left mt-1"
      >
        <div class="row-start-1 row-span-1 col-start-1 col-span-1 p-1">
          เลขที่ใบเสนอราคา
        </div>
        <div
          class="row-start-1 row-span-1 col-start-2 col-span-2 text-left p-1"
        >
          {{ this.docID }}
        </div>
        <button
          class="text-center rounded-full px-2 w-16 text-sm border-2 border-green-500 text-black hover:text-green-600 font-semibold shadow-lg ring-1 ring-green-200"
        >
          บันทึก
        </button>
        <div class="row-start-2 row-span-1 col-start-1 col-span-1 p-1">
          วันที่เสนอราคา
        </div>
        <div class="row-start-2 row-span-1 col-start-2 col-span-1 p-1">
          11/05/2020
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { auth } from "../state/user";

export default {
  data() {
    return {
      docID: auth.qt_temp,
    };
  },
};
</script>
<style></style>
