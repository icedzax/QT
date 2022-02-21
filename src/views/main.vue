<template>
  <div class="container">
    <!--  ก้อน Header  -->
    <div
      class="box grid overflow-hidden grid-cols-2 xl:grid-cols-3 grid-rows-2 gap-2 flex flex-wrap mt-1"
    >
      <div
        class="row-start-1 row-span-2 col-start-1 col-span-2 h-32 sm:h-28 md:h-24"
      >
        <Header></Header>
      </div>
      <div
        class="xl:row-start-1 xl:row-span-2 xl:col-start-3 xl:col-span-1 xl:h-24 xl:h-24 invisible xl:visible"
      >
        <Header_r></Header_r>
      </div>
    </div>

    <div class="h-24 flex justify-center xl:hidden -mt-60 md:-mt-36 lg:-mt-28">
      <Header_r></Header_r>
    </div>
    <!--  ก้อนผู้เสนอราคาและลูกค้า  -->
    <div
      class="box grid overflow-hidden grid-cols-2 grid-rows-2 gap-2 flex flex-wrap mt-1"
    >
      <div
        class="h-32 row-start-1 row-span-5 col-start-1 col-span-2 md:col-span-1 md:h-36"
      >
        <Sale></Sale>
      </div>
      <div
        class="h-32 row-span-5 col-start-1 col-span-2 md:col-start-2 md:col-span-1 md:h-36"
      >
        <Customer></Customer>
      </div>
    </div>
    <!--  ก้อนรายการสินค้า  -->
    <div
      class="box grid overflow-hidden grid-cols-1 grid-rows-1 gap-1 flex flex-wrap mt-1"
    >
      <div class="h-48 row-start-1 row-span-5 col-start-1 col-span-2">
        <Order></Order>
      </div>
    </div>
    <!--  ก้อนเงื่อนไขและสรุปรายการ  -->
    <div
      class="box grid overflow-hidden grid-cols-2 xl:grid-cols-3 grid-rows-2 gap-2 flex flex-wrap mt-1"
    >
      <div
        class="row-start-1 row-span-5 col-start-1 col-span-2 xl:col-span-2 h-auto"
      >
        <Rule></Rule>
      </div>
      <div class="row-span-5 col-start-1 col-span-2 xl:col-start-3 h-auto">
        <Total></Total>
      </div>
    </div>
    <!--  ก้อนลายเซนต์  -->
    <div
      class="box grid overflow-hidden grid-cols-1 grid-rows-1 gap-1 flex flex-wrap mt-1 mb-1"
    >
      <div class="row-start-1 row-span-5 col-start-1 col-span-2 h-auto">
        <License></License>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "../components/header.vue";
import Header_r from "../components/header_right.vue";
import Sale from "../components/Sales.vue";
import Customer from "../components/Customer.vue";
import Order from "../components/Order.vue";
import Rule from "../components/Rule.vue";
import Total from "../components/Total.vue";
import License from "../components/License.vue";
export default {
  components: { Header, Sale, Customer, Order, Rule, Total, License, Header_r },
};
</script>
<style>
.box {
  @apply bg-white
  p-2
  min-w-full
  shadow

  min-h-full
  rounded;
}
</style>
