<template>
  <div class="container">
    <div
      class="grid overflow-hidden grid-cols-2 grid-rows-1 gap-0.5 text-xs lg:text-sm text-center"
    >
      <div class="row-start-1 col-span-1">ยืนยันการสั่งซื้อ (ลูกค้า)</div>
      <div class="row-start-1 flex mx-auto">
        <span> ขอแสดงความนับถืออย่างสูง</span>
        <div
          v-if="
            order.status === 'A' || order.status === 'C' || order.status === 'W'
          "
          class="w-5 h-5 ml-1 hover:text-red-600 border rounded-md border-red-200"
        >
          <svg
            @click="unApp"
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="{2}"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
            />
          </svg>
        </div>
        <unapp-list
          @closeModal="cModal"
          @closeX="cModalX"
          :value="isModalUnapp"
          :propsQt="auth.temp_qt"
          :propsEmp="auth.user_id"
        />
      </div>
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
      <div class="mx-auto hover:text-blue-700" @click="Pricepdf">
        <div class="mx-auto w-10 h-10" @click="Pricepdf">
          <printer />
        </div>
        <span class="cursor-pointer">ใบขอราคา</span>
      </div>

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
import UnappList from "./UnappModal.vue";
import Printer from "./Printer.vue";

export default {
  components: { LoadingButton, UnappList, Printer },
  data() {
    return {
      sys,
      auth,
      order,
      cus,
      isModalUnapp: false,
    };
  },

  computed: {
    sd() {
      return auth.data_sale;
    },
  },
  async created() {},
  methods: {
    Pricepdf() {
      window.open(
        "https://report.zubbsteel.com/tcpdf/pdf/ZRQ_PRICE.php?ref=" +
          auth.temp_qt
      );
    },
    unApp() {
      this.isModalUnapp = !this.isModalUnapp;
    },
    cModal() {
      this.isModalUnapp = false;
      this.$router.go();
    },
    cModalX() {
      this.isModalUnapp = false;
    },
    approve() {
      if (order.kunnr) {
        if (order.list.length > 0) {
          if (confirm("ยืนยันการขออนุมัติใบเสนอราคาหรือไม่")) {
            this.appQT();
          }
        } else {
          alert("บันทึกอย่างน้อย 1 รายการ");
        }
      } else {
        alert("ใส่ชื่อลูกค้าก่อนขออนุมัติ");
      }
    },
    async appQT() {
      sys.loading = true;

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
