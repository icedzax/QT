<template>
  <div class="mx-4">
    <div
      class="grid grid-cols-3 grid-rows-1 gap-0.5 overflow-hidden text-right text-xs lg:text-sm xl:grid-cols-2"
    >
      <div
        class="col-span-1 col-start-2 row-start-1 font-semibold xl:col-start-1"
      >
        รวมมูลค่าสินค้า
      </div>
      <div class="col-start-3 row-start-1 xl:col-start-2">
        {{ Number(sumprice).toLocaleString() }}
      </div>
      <div
        class="col-span-1 col-start-2 row-start-2 font-semibold xl:col-start-1"
      >
        ค่าขนส่ง
      </div>
      <div class="col-start-3 row-start-2 xl:col-start-2">
        <v-num #="{ number }" :value="tranf">
          {{ number }}
        </v-num>
      </div>
      <div
        class="col-span-1 col-start-2 row-start-3 font-semibold xl:col-start-1"
      >
        มูลค่าทั้งสิ้น
      </div>
      <div class="col-start-3 row-start-3 xl:col-start-2">
        {{ Number(sumprice_2).toLocaleString() }}
      </div>
      <div
        class="col-span-1 col-start-2 row-start-4 font-semibold xl:col-start-1"
      >
        ภาษีมูลค่าเพิ่ม
      </div>
      <div class="col-start-3 row-start-4 xl:col-start-2">
        {{ Number(cal_vat).toLocaleString() }}
      </div>
      <div
        class="col-span-1 col-start-2 row-start-5 font-semibold xl:col-start-1"
      >
        รวมสุทธิ
      </div>
      <div class="col-start-3 row-start-5 xl:col-start-2">
        {{ Number(total_price).toLocaleString() }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["sp", "vat", "tf"],
  data() {
    return {
      transport: 0.0,
    };
  },
  created() {},
  computed: {
    tranf() {
      return parseFloat(this.tf).toFixed(2);
    },
    sumprice() {
      return parseFloat(this.sp).toFixed(2);
    },
    sumprice_2() {
      let fixsp = this.sp.toFixed(2);
      let sum = parseFloat(fixsp) + parseFloat(this.tranf);

      return parseFloat(sum).toFixed(2);
    },
    cal_vat() {
      const v = (parseFloat(this.sp) + parseFloat(this.tranf)) * this.vat;

      return parseFloat(v).toFixed(2);
    },
    total_price() {
      let fixsp = this.sp.toFixed(2);
      let sum = parseFloat(fixsp) + parseFloat(this.tranf);
      let v = (parseFloat(this.sp) + parseFloat(this.tranf)) * this.vat;
      return parseFloat(sum + v).toFixed(2);
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
