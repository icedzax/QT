<template>
  <div class="mx-4">
    <div
      class="grid overflow-y-visible grid-cols-6 grid-rows-1 gap-1 text-xs xl:text-sm p-1 xl:p-0"
    >
      <div class="font-semibold">ลูกค้า</div>
      <div class="col-span-4 flex justify-inline">
        <input
          type="checkbox"
          @click="checkvat"
          v-model="selectVat"
          :checked="cus.vat !== 0"
          class="mx-1"
        />
        <span class="text-xs"> VAT</span>
        <vue3-simple-typeahead
          class="text-black text-xl -mt-1 ml-1"
          v-if="approveStat || !cus.data.KUNNR"
          id="typeahead_id"
          :placeholder="place_holder"
          :items="customers"
          @selectItem="selectItem"
          @onInput="onInput"
          @onBlur="onBlur"
          @input="lookupUser"
          :minInputLength="1"
          :itemProjection="
            (customers) => {
              return `${customers.KUNNR} ${customers.CNAME}`;
            }
          "
        >
        </vue3-simple-typeahead>
        <p class="font-bold" v-else>{{ place_holder }}</p>
      </div>
      <div class="w-full">
        <div
          v-if="!this.statusE && approveStat"
          class="flex justify-center border-2 border-yellow-500 cursor-pointer rounded-md hover:text-yellow-500 hover:ring-1 hover:ring-yellow-300"
          @click="chg_edit"
        >
          <div class="text-xs pt-1 font-semibold">EDIT</div>
          <div class="py-0.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="w-5"
            >
              <defs></defs>
              <title>Comments, compose, edit, note, write</title>
              <g id="_01" data-name="01">
                <polygon
                  class="cls-1"
                  points="7 3 7 19 17 19 17 21 4 21 4 3 7 3"
                />
                <polygon
                  class="cls-1"
                  points="20 7 10 17 10.5 13.5 18 6 20 7"
                />
                <path
                  d="M17,22H4a1,1,0,0,1-1-1V3A1,1,0,0,1,4,2H17a1,1,0,0,1,1,1V7a1,1,0,0,1-2,0V4H5V20H16V13a1,1,0,0,1,2,0v8A1,1,0,0,1,17,22Z"
                />
                <path
                  d="M13,18H10a1,1,0,0,1-1-1V14a1,1,0,0,1,.29-.71l8.5-8.5a1,1,0,0,1,1.42,0l2.5,2.5a1,1,0,0,1-1.42,1.42L18.5,6.91,11,14.41V16h1.59l5.7-5.71a1,1,0,0,1,1.42,1.42l-6,6A1,1,0,0,1,13,18Z"
                />
                <path d="M10,8H7A1,1,0,0,1,7,6h3a1,1,0,0,1,0,2Z" />
                <path d="M9,11H7A1,1,0,0,1,7,9H9a1,1,0,0,1,0,2Z" />
              </g>
            </svg>
          </div>
        </div>
        <div
          v-else-if="approveStat"
          class="flex justify-center border-2 border-violet-500 rounded-md cursor-pointer hover:bg-violet-100 hover:text-violet-600 hover:ring-1 hover:ring-violet-300"
          @click="update_data"
        >
          <div class="text-xs font-semibold pr-1 pt-1">SAVE</div>
          <div class="py-0.5">
            <svg
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              class="w-5"
              viewBox="0 0 438.5 438.5"
              style="enable-background: new 0 0 438.5 438.5"
              xml:space="preserve"
            >
              <g>
                <linearGradient
                  id="SVGID_1_"
                  gradientUnits="userSpaceOnUse"
                  x1="2.999783e-03"
                  y1="219.267"
                  x2="438.531"
                  y2="219.267"
                >
                  <stop offset="0" style="stop-color: #1245c6" />
                  <stop offset="1" style="stop-color: #9909b7" />
                </linearGradient>
                <path
                  class="st0"
                  d="M432.8,121c-3.8-9.1-8.4-16.4-13.7-21.7l-79.9-79.9c-5.3-5.3-12.6-9.9-21.7-13.7C308.3,1.9,300,0,292.4,0H27.4
		C19.8,0,13.3,2.7,8,8c-5.3,5.3-8,11.8-8,19.4v383.7c0,7.6,2.7,14.1,8,19.4c5.3,5.3,11.8,8,19.4,8h383.7c7.6,0,14.1-2.7,19.4-8
		c5.3-5.3,8-11.8,8-19.4V146.2C438.5,138.6,436.6,130.2,432.8,121z M182.7,45.7c0-2.5,0.9-4.6,2.7-6.4c1.8-1.8,3.9-2.7,6.4-2.7h54.8
		c2.5,0,4.6,0.9,6.4,2.7c1.8,1.8,2.7,3.9,2.7,6.4V137c0,2.5-0.9,4.6-2.7,6.4c-1.8,1.8-3.9,2.7-6.4,2.7h-54.8c-2.5,0-4.6-0.9-6.4-2.7
		c-1.8-1.8-2.7-3.9-2.7-6.4L182.7,45.7L182.7,45.7z M328.9,402H109.6V292.4h219.3V402z M402,402h-36.6h0V283.2
		c0-7.6-2.7-14.1-8-19.4c-5.3-5.3-11.8-8-19.4-8H100.5c-7.6,0-14.1,2.7-19.4,8c-5.3,5.3-8,11.8-8,19.4V402H36.5V36.5h36.5v118.8
		c0,7.6,2.7,14.1,8,19.4c5.3,5.3,11.8,8,19.4,8H265c7.6,0,14.1-2.7,19.4-8c5.3-5.3,8-11.8,8-19.4V36.5c2.9,0,6.6,1,11.1,2.9
		c4.6,1.9,7.8,3.8,9.7,5.7l80.2,80.2c1.9,1.9,3.8,5.2,5.7,9.9c1.9,4.7,2.9,8.3,2.9,11L402,402L402,402z"
                />
              </g>
            </svg>
          </div>
        </div>
      </div>
      <div>
        <p class="font-semibold">ที่อยู่</p>
      </div>
      <div class="col-span-4 text-left">
        <textarea
          name=""
          id="typeahead_id1"
          class="text-xs"
          rows="2.5"
          v-model="cusdata.ADDRS"
          :disabled="!this.statusE"
        ></textarea>
      </div>
      <div>
        <div
          v-if="this.statusE"
          class="flex justify-center border-2 border-pink-500 rounded-md px-2 cursor-pointer hover:text-pink-500 hover:bg-pink-100 hover:ring-1 hover:ring-pink-300"
          @click="cancel_edit"
        >
          <div class="font-semibold text-xs pt-1">CANCEL</div>
          <div class="py-0.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 64 64"
              class="w-5"
            >
              <defs>
                <linearGradient
                  id="linear-gradient"
                  x1="2"
                  y1="32"
                  x2="62"
                  y2="32"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stop-color="#ffae46" />
                  <stop offset="0.19" stop-color="#ff9755" />
                  <stop offset="0.74" stop-color="#ff5a7d" />
                  <stop offset="1" stop-color="#ff428d" />
                </linearGradient>
              </defs>
              <g id="Layer_45" data-name="Layer 45">
                <path
                  class="cls-2"
                  d="M56.79,16.09A26.89,26.89,0,0,0,9,25.46L5.77,19.27a2,2,0,0,0-3.54,1.87L8.45,32.93l0,.06a2.88,2.88,0,0,0,.26.35l.05.06a1.76,1.76,0,0,0,.37.29.39.39,0,0,0,.11.06,2.07,2.07,0,0,0,.34.15l.12,0a2.52,2.52,0,0,0,.48.06h0a2.57,2.57,0,0,0,.4,0l.13,0a1.88,1.88,0,0,0,.3-.12l.07,0L23,27.55A2,2,0,0,0,21.08,24l-8.6,4.54A22.88,22.88,0,0,1,53.56,18.46,22.66,22.66,0,0,1,58,32,22.88,22.88,0,0,1,21.57,50.45a2,2,0,1,0-2.37,3.22,26.62,26.62,0,0,0,15.91,5.22,26.89,26.89,0,0,0,21.68-42.8Z"
                />
              </g>
            </svg>
          </div>
        </div>
      </div>
      <!-- ชื่อผู้ติดต่อ --->
      <div class="font-semibold">ชื่อผู้ติดต่อ</div>
      <input
        class="text-xs border-b border-gray-200 px-1 focus:outline-none col-span-5"
        v-model="cusdata.CONTACTNAME"
        :disabled="!this.statusE"
      />

      <!-- เบอร์ติดต่อ --->
    </div>

    <!-- ก้อนล่าง-->
    <div
      class="grid overflow-hidden grid-cols-6 grid-rows-1 gap-1 text-xs xl:text-sm p-1 xl:p-0"
    >
      <div class="font-semibold">เบอร์ติดต่อ</div>
      <div class="col-span-2 w-full">
        <input
          id="ip_text"
          class="text-xs w-full border-b border-gray-200 px-1 focus:outline-none"
          v-model="cusdata.TELNU"
          :disabled="!this.statusE"
        />
      </div>
      <!-- มือถือ --->
      <div class="font-semibold text-center">มือถือ</div>
      <div class="col-span-2 w-full">
        <input
          id="ip_text2"
          class="text-xs w-full border-b border-gray-200 px-1 focus:outline-none col-span-2"
          v-model="cusdata.MOBILE"
          :disabled="!this.statusE"
        />
      </div>
      <!-- โทรสาร --->
      <div class="font-semibold">โทรสาร</div>
      <div class="col-span-2">
        <input
          id="ip_text"
          class="text-xs border-b border-gray-200 px-1 focus:outline-none w-full"
          v-model="cusdata.FAXNU"
          :disabled="!this.statusE"
        />
      </div>

      <!-- อีเมล --->
      <div class="font-semibold text-center">อีเมลล์</div>
      <div class="col-span-2 w-full">
        <input
          id="ip_text2"
          class="text-xs w-full border-b border-gray-200 px-1 focus:outline-none"
          v-model="cusdata.EMAIL"
          :disabled="!this.statusE"
        />
      </div>
    </div>
    <!-- <p>{{this.list_qt}}</p> -->
  </div>
</template>
<script>
import { cus } from "../state/cus";
import { auth } from "../state/user";

import { debounce } from "lodash";
import { order } from "../state/order";

import CusService from "../services/CusService.js";

export default {
  props: ["customername", "statusApp"],
  data() {
    return {
      examdefault: "exammm ....",
      customers: [],
      showcus: "",
      cus,
      order,
      options: {
        minInputLength: 1,
      },
      listFiltered: [],
      data: {
        input: "",
        selection: null,
      },
      statusE: false,
      list_qt: this.$route.params.list_qt,
      selectVat: false,
      vat: null,
    };
  },
  created() {},
  computed: {
    place_holder() {
      return cus.data.KUNNR
        ? `${cus.data.KUNNR} ${cus.data.CNAME || ""}`
        : "รหัส / ชื่อลูกค้า";
    },
    cusdata() {
      return this.data.selection || order.cust;
    },
    approveStat() {
      if (order.status == "TEMP" || order.status == "D") return true;
    },
  },
  methods: {
    lookupUser: debounce(async function () {
      const result = await CusService.search({ cus_name: this.data.input });
      this.customers = result.data;
    }, 500),
    async checkvat() {
      this.selectVat == false
        ? (this.selectVat = true)
        : (this.selectVat = false);

      if (this.selectVat) {
        this.vat = 1;
        cus.vat = 0.07;
      } else {
        this.vat = null;
        cus.vat = 0;
      }
      await CusService.updateVAT({ vat: this.vat, qt: auth.temp_qt });
    },
    async selectItem(item) {
      this.data.selection = item;
      const Data_cus = await CusService.select({
        cus_name: this.data.selection.KUNNR,
      });
      this.showcus =
        this.data.selection.KUNNR + " " + this.data.selection.CNAME;
      const send_update = await CusService.setCus({
        KUNNR: this.data.selection.KUNNR,
        LAND1: Data_cus.data[0].LAND1,
        CNAME: Data_cus.data[0].CNAME,
        TELNU: Data_cus.data[0].TELNU,
        TELFX: Data_cus.data[0].TELFX,
        FAXNU: Data_cus.data[0].FAXNU,
        TAXNO: Data_cus.data[0].TAXNO,
        EMAIL: Data_cus.data[0].EMAIL,
        ADDRS: Data_cus.data[0].ADDRS,
        MOBILE: Data_cus.data[0].MOBILE,
        CONTACTNAME: Data_cus.data[0].CONTACTNAME,
        qt: auth.temp_qt,
        vat: this.vat,
      });
      const data_cus = await CusService.postCus({
        KUNNR: this.data.selection.KUNNR,
      });
      cus.data = data_cus.data[0];
      if (data_cus.status == 200) {
        order.kunnr = this.data.selection.KUNNR;
      }
    },
    async update_data() {
      const send_update = await CusService.setCus({
        KUNNR: cus.data.KUNNR,
        LAND1: cus.data.LAND1,
        CNAME: cus.data.CNAME,
        TELNU: this.cusdata.TELNU,
        TELFX: cus.data.TELFX,
        FAXNU: this.cusdata.FAXNU,
        TAXNO: cus.data.TAXNO,
        EMAIL: this.cusdata.EMAIL,
        ADDRS: this.cusdata.ADDRS,
        MOBILE: this.cusdata.MOBILE,
        CONTACTNAME: this.cusdata.CONTACTNAME,
        qt: auth.temp_qt,
      });
      alert("Update ข้อมูลแล้ว");
      this.statusE = false;
    },
    async cancel_edit() {
      const data_cus = await CusService.postCus({
        KUNNR: cus.data.KUNNR,
      });
      cus.data = data_cus.data[0];
      this.statusE = false;
    },
    chg_edit() {
      this.statusE = true;
    },
    onInput(event) {
      this.data.selection = null;
      this.data.input = event.input;
      this.listFiltered = event.items;
    },
    onBlur(event) {
      this.data.input = event.input;
      this.listFiltered = event.items;
    },
  },
};
</script>
<style scoped>
#typeahead_id1 {
  width: 98%;
  padding-top: 2px;
  padding-bottom: 2px;
}
.st0 {
  fill: url(#SVGID_1_);
}
.cls-1 {
  fill: #e49b0f;
}
.cls-2 {
  fill: url(#linear-gradient);
}
</style>
