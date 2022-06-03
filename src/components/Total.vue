<template>
  <div class="mx-4">
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
  props: ["sp", "vat"],
  data() {
    return {
      transport: 0.0,
    };
  },
  created() {},
  computed: {
    sumprice() {
      let fixsp = this.sp.toFixed(2);
      let a = fixsp.toString();
      const afSP = this.addComma(a);

      return afSP;
    },
    sumprice_2() {
      let fixsp = this.sp.toFixed(2);
      let sum = fixsp + this.transport;

      let a = parseFloat(sum).toFixed(2).toString();
      const afSP = this.addComma(a);
      return afSP;
    },
    cal_vat() {
      const v = (this.sp * this.vat).toFixed(2);
      let a = v.toString();
      const afSP = this.addComma(a);
      return afSP;
    },
    total_price() {
      let sp2 = this.delcomma(this.sumprice_2);
      let cv = this.delcomma(this.cal_vat);
      const sum = parseFloat(sp2) + parseFloat(cv);
      let a = parseFloat(sum).toFixed(2).toString();
      const afSP = this.addComma(a);
      return afSP;
    },
  },
  methods: {
    addComma(a) {
      let x = a.split(".");
      let x1 = x[0];

      let x2 = x.length > 1 ? "." + x[1] : "";

      var rgx = /(\d+)(\d{3})/;

      while (rgx.test(x1)) {
        x1 = x1.replace(rgx, "$1" + "," + "$2");
      }
      let aa = x1 + x2;
      return aa;
    },
    delcomma(a) {
      let x = a.replace(",", "");
      return x;
    },
  },
};
</script>
