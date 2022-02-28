<template>
  <div class="container">
    <div
      class="grid overflow-hidden grid-cols-3 xl:grid-cols-2 grid-rows-1 gap-0.5 text-xs lg:text-sm text-right"
    >
      <div
        class="row-start-1 col-start-2 xl:col-start-1 col-span-1 font-semibold"
      >
        รวมมูลค่าสินค้า
      </div>
      <div class="row-start-1 col-start-3 xl:col-start-2">{{ sumprice }}</div>
      <div
        class="row-start-2 col-start-2 xl:col-start-1 col-span-1 font-semibold"
      >
        ค่าขนส่ง
      </div>
      <div class="row-start-2 col-start-3 xl:col-start-2">
        {{ this.transport }}
      </div>
      <div
        class="row-start-3 col-start-2 xl:col-start-1 col-span-1 font-semibold"
      >
        มูลค่าทั้งสิ้น
      </div>
      <div class="row-start-3 col-start-3 xl:col-start-2">{{ sumprice_2 }}</div>
      <div
        class="row-start-4 col-start-2 xl:col-start-1 col-span-1 font-semibold"
      >
        ภาษีมูลค่าเพิ่ม
      </div>
      <div class="row-start-4 col-start-3 xl:col-start-2">{{ cal_vat }}</div>
      <div
        class="row-start-5 col-start-2 xl:col-start-1 col-span-1 font-semibold"
      >
        รวมสุทธิ
      </div>
      <div class="row-start-5 col-start-3 xl:col-start-2">
        {{ total_price }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["sp"],
  data() {
    return {
      transport: 0.0,
    };
  },
  created() {},
  computed: {
    sumprice() {
      return this.sp;
    },
    sumprice_2() {
      return this.sp + this.transport;
    },
    cal_vat() {
      const v = (this.sp * 0.07).toFixed(2);
      return v;
    },
    total_price() {
      const sum = parseFloat(this.sumprice_2) + parseFloat(this.cal_vat);
      return sum.toFixed(2);
    },
  },
};
</script>
