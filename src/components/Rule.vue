<template>
  <div class="container">
    <!-- <div
      class="grid overflow-hidden grid-cols-3 grid-rows-1 gap-0.5 text-xs lg:text-sm"
    >
      <div class="head col-span-1 underline">
        เงื่อนไขการชำระเงินและการจัดส่งสินค้า
      </div>
      <div class="underline ml-10 lg:ml-32 xl:ml-20 2xl:ml-28">
        น้ำหนักรวม +/-
      </div>
      <div class="">{{ this.sumweight }} Kg.</div>
      <div class="row-start-2 col-span-2">1.เงินสด/โอนเงินก่อนรับสินค้า</div>
      <div class="row-start-3 col-span-2">2.ลูกค้ารับสินค้าเอง</div>
      <div class="row-start-4 col-span-2">
        3.รอสินค้า 3-5 วันหลังจากชำระเงิน
      </div>
      <div class="row-start-5 col-span-2">
        4.ราคาและจำนวนสินค้าไม่ยืน กรุณาเช็กราคาและจำนวนสินค้าก่อนชำระเงิน
      </div>
    </div> -->
    <div
      class="grid overflow-hidden grid-cols-2 grid-rows-1 gap-0.5 text-xs lg:text-sm"
    >
      <div class="head col-span-1 underline text-center">
        เงื่อนไขการชำระเงินและการจัดส่งสินค้า
      </div>
      <div class="text-right">
        น้ำหนักรวม +/- :
        {{ sumweight }} Kg.
      </div>

      <div class="row-start-2 col-span-2">1.เงินสด/โอนเงินก่อนรับสินค้า</div>
      <div class="row-start-3 col-span-2">2.ลูกค้ารับสินค้าเอง</div>
      <div class="row-start-4 col-span-2">
        3.รอสินค้า 3-5 วันหลังจากชำระเงิน
      </div>
      <div class="row-start-5 col-span-2">
        4.ราคาและจำนวนสินค้าไม่ยืน กรุณาเช็กราคาและจำนวนสินค้าก่อนชำระเงิน
      </div>
    </div>
  </div>
</template>
<script>
//import { order } from "../state/order";
export default {
  props: ["sw"],
  data() {
    return {
      fixsw: "",
    };
  },
  create() {},
  computed: {
    sumweight() {
      const newsw = this.sw.toFixed(2);
      return newsw;
    },
  },
};
</script>
<style>
.head {
  text-decoration-style: double;
}
</style>
