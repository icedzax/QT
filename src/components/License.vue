<template>
  <div class="container">
    <div
      class="grid overflow-hidden grid-cols-2 grid-rows-1 gap-0.5 text-xs lg:text-sm text-center"
    >
      <div class="row-start-1 col-span-1">ยืนยันการสั่งซื้อ (ลูกค้า)</div>
      <div class="row-start-1">ขอแสดงความนับถืออย่างสูง</div>
      <div class="">..........................................</div>
      <div class="">{{ this.user }}</div>
      <div class="">(.........................................)</div>
      <div class="">({{ this.user }})</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: "มานะ",
    };
  },
};
</script>
