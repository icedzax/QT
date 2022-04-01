<template>
  <div class="px-2">
    <div
      class="row-start-1 row-span-1 col-start-3 col-span-1 text-center text-xs md:text-sm"
    >
      <div class="flex">
        <div class="text-base md:text-xl text-center lg:text-left">
          ใบเสนอราคา (สำนักงานใหญ่)
        </div>
        <div class="mx-2 h-10 w-10" @click="goto_pdf">
          <svg
            version="1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            enable-background="new 0 0 48 48"
          >
            <rect x="9" y="11" fill="#424242" width="30" height="3" />
            <path
              fill="#616161"
              d="M4,25h40v-7c0-2.2-1.8-4-4-4H8c-2.2,0-4,1.8-4,4V25z"
            />
            <path
              fill="#424242"
              d="M8,36h32c2.2,0,4-1.8,4-4v-8H4v8C4,34.2,5.8,36,8,36z"
            />
            <circle fill="#00E676" cx="40" cy="18" r="1" />
            <rect x="11" y="4" fill="#90CAF9" width="26" height="10" />
            <path
              fill="#242424"
              d="M37.5,31h-27C9.7,31,9,30.3,9,29.5v0c0-0.8,0.7-1.5,1.5-1.5h27c0.8,0,1.5,0.7,1.5,1.5v0 C39,30.3,38.3,31,37.5,31z"
            />
            <rect x="11" y="31" fill="#90CAF9" width="26" height="11" />
            <rect x="11" y="29" fill="#42A5F5" width="26" height="2" />
            <g fill="#1976D2">
              <rect x="16" y="33" width="17" height="2" />
              <rect x="16" y="37" width="13" height="2" />
            </g>
          </svg>
        </div>
      </div>
      <!-- <div
        class="grid overflow-hidden grid-cols-3 grid-rows-2 gap-1 mx-16 lg:mx-0 text-left mt-1"
      >
        <div
          class="row-start-1 row-span-1 col-start-1 col-span-1 p-1 text-xs mt-1"
        >
          เลขที่ใบเสนอราคา
        </div>
        <div class="row-start-1 row-span-1 col-start-2 col-span-2 p-1 text-xs">
          {{ auth.temp_qt }}
          <button
            class="text-center rounded-full px-2 text-sm border-2 border-green-500 text-black hover:text-green-600 font-semibold shadow-lg ring-1 ring-green-200"
          >
            สร้างใหม่
          </button>
        </div>
        <div class="row-start-2 row-span-1 col-start-1 col-span-1 p-1 text-xs">
          วันที่เสนอราคา
        </div>
        <div class="row-start-2 row-span-1 col-start-2 col-span-1 p-1 text-xs">
          {{ order.date }}
        </div>
      </div> -->
      <div class="flex justify-start">
        <div class="w-32 text-left">เลขที่ใบเสนอราคา</div>
        <div class="w-32 text-left">
          {{ auth.temp_qt }}
        </div>
        <div
          @click="newQT"
          class="cursor-pointer rounded-md px-2 text-sm border-2 border-green-500 text-black hover:text-green-600 font-semibold shadow-lg ring-1 ring-green-200"
        >
          สร้างใหม่
        </div>
      </div>
      <div class="flex justify-start">
        <div class="w-32 text-left">วันที่เสนอราคา</div>
        <div>
          {{ order.date }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { auth } from "../state/user";
import { order } from "../state/order";
import UserService from "../services/UserService";

import { sys } from "../state/system";
export default {
  data() {
    return {
      auth,
      order,
      sys,
    };
  },
  created() {},
  methods: {
    goto_pdf() {
      window.open(
        "https://report.zubbsteel.com/tcpdf/pdf/ZQT.php?ref=" + auth.temp_qt
      );
    },
    async newQT() {
      console.log({
        qt: auth.temp_qt,
        emp_code: auth.user_id,
      });
      if (confirm("ยืนยันสร้างใบเสนอราคาใหม่ ?")) {
        sys.loading = true;
        const nqt = await UserService.newQT({
          qt: auth.temp_qt,
          emp_code: auth.user_id,
        });
        sys.loading = await false;
        await console.log("NQT", nqt.data);
        await localStorage.setItem("tempqt", nqt.data);
        await this.$router.go();
      }
    },
  },
};
</script>
