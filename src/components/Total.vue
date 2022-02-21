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
      <div class="row-start-1 col-start-3 xl:col-start-2">{{ this.All1 }}</div>
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
      <div class="row-start-3 col-start-3 xl:col-start-2">{{ this.All2 }}</div>
      <div
        class="row-start-4 col-start-2 xl:col-start-1 col-span-1 font-semibold"
      >
        ภาษีมูลค่าเพิ่ม
      </div>
      <div class="row-start-4 col-start-3 xl:col-start-2">{{ this.VAT }}</div>
      <div
        class="row-start-5 col-start-2 xl:col-start-1 col-span-1 font-semibold"
      >
        รวมสุทธิ
      </div>
      <div class="row-start-5 col-start-3 xl:col-start-2">
        {{ this.sumtotal }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      All1: "10742.00",
      transport: "0.00",
      All2: "10742.00",
      VAT: "751.94",
      Total: "",
    };
  },
  created() {
    this.sumtotal();
  },
  methods: {
    sumtotal() {
      this.sumtotal = parseFloat(this.All2) + parseFloat(this.VAT);
    },
  },
};
</script>
