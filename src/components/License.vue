<template>
  <div class="container">
    <div
      class="grid overflow-hidden grid-cols-2 grid-rows-1 gap-0.5 text-xs lg:text-sm text-center"
    >
      <div class="row-start-1 col-span-1">ยืนยันการสั่งซื้อ (ลูกค้า)</div>
      <div class="row-start-1">ขอแสดงความนับถืออย่างสูง</div>
      <div class="">..........................................</div>
      <div class="">
        <button
          v-if="!this.stat"
          @click="approve"
          class="ml-2 text-center rounded-full p-1 px-2 text-sm border-2 border-blue-400 text-black hover:text-blue-600 font-semibold shadow-lg ring-1 ring-blue-200 focus:outline-none"
        >
          อนุมัติ ✅
        </button>
        <p v-else>ลายเซ็นผู้อนุมัติ</p>
      </div>
      <div class="">(.........................................)</div>
      <div class="">({{ this.user }})</div>
    </div>
  </div>
</template>
<script>
import { order } from "../state/order";
export default {
  data() {
    return {
      user: "มานะ",
      stat: false,
    };
  },
  methods: {
    approve() {
      if (
        confirm(
          "กดบันทึกก่อน Approve ทุกครั้ง หาก Approve แล้วจะไม่สามารถแก้ไขข้อมูลได้ ต้องการ Approve ใช่หรือไม่?"
        )
      ) {
        alert("Approve เรียบร้อยแล้ว :)");
        order.status = true;
        this.stat = true;
      }
    },
  },
};
</script>
