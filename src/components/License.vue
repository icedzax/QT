<template>
  <div class="container">
    <div
      class="grid overflow-hidden grid-cols-2 grid-rows-1 gap-0.5 text-xs lg:text-sm text-center"
    >
      <div class="row-start-1 col-span-1">ยืนยันการสั่งซื้อ (ลูกค้า)</div>
      <div class="row-start-1">ขอแสดงความนับถืออย่างสูง</div>
      <div class="" v-if="order.status === 'A'">
        <button
          @click="appC"
          class="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
        >
          ลูกค้ายืนยันแล้ว ✅
        </button>
      </div>
      <div class="" v-else-if="order.status === 'C'">
        <span> {{ cus.data.CNAME }} ✅ </span>
      </div>
      <div class="" v-else>
        <span> .......................................... </span>
      </div>

      <div v-if="order.kunnr && order.list.length >= 1">
        <div v-if="order.status == 'W'">รอการอนุมัติ</div>
        <div
          v-else-if="order.status == 'A' || order.status == 'C'"
          class="h-full"
        >
          {{ auth.data_sale.sale_name }} ✅
        </div>
        <div class="" v-else>
          <button
            v-if="!sys.loading"
            @click="approve"
            type="button"
            class="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
          >
            ขออนุมัติ ✅
          </button>
          <loading-button v-else> </loading-button>
        </div>
      </div>
      <div v-else></div>
      <div class=""></div>
      <!-- <div class="">(.........................................)</div> -->
      <!-- <div class="">({{ sd.sale_name }})</div> -->
    </div>
  </div>
</template>
<script>
import { order } from "../state/order";
import { sys } from "../state/system";
import { auth } from "../state/user";
import { cus } from "../state/cus";
import LoadingButton from "./LoadingButton.vue";
import OrderService from "../services/OrderService.js";

export default {
  components: { LoadingButton },
  data() {
    return {
      sys,
      auth,
      order,
      cus,
    };
  },

  computed: {
    sd() {
      return auth.data_sale;
    },
  },
  methods: {
    approve() {
      if (order.kunnr) {
        if (order.list.length > 0) {
          if (confirm("ยืนยันการขออนุมัติใบเสนอราคาหรือไม่")) {
            this.appQT();
          }
        } else {
          alert("บันทึกอย่างน้อย 1 รายการ :)");
        }
      } else {
        alert("ใส่ชื่อลูกค้าก่อนขออนุมัติ");
      }
    },
    async appQT() {
      sys.loading = true;

      // const ordPayload = order.list.map((o) => {
      //   return {
      //     MATNR: o.rmd_mat,
      //     VKORG: "1000",
      //     KONDA: o.ptype.slice(0, 2),
      //     KMEIN: o.unit,
      //   };
      // });
      // console.log("payloadXX", ordPayload);
      const ordPayload = {
        qt: auth.temp_qt,
      };
      const valid = await OrderService.priceValid(ordPayload);
      if (valid.data) {
        order.status = valid.data[0];
      }
      sys.loading = await false;
    },
    appC() {
      OrderService.appC({ qt: auth.temp_qt });
      order.status = "C";
    },
  },
};
</script>
