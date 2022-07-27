<template>
  <div class="mx-4 h-auto">
    <!-- <ModalSO :value="true" :list="waitlist" @onCheck="fecthSoList" /> -->
    <ModalRegion :value="true" />
    <div
      class="grid grid-cols-2 grid-rows-1 gap-0.5 overflow-hidden lg:grid-cols-3"
    >
      <div class="col-span-2 col-start-1 row-span-1 row-start-1 lg:col-span-5">
        <div class="grid grid-cols-5 grid-rows-1 gap-0.5 overflow-hidden">
          <div class="col-span-1 col-start-1 row-span-1 row-start-1 h-10">
            <img src="../img/ZUBBLOGO.jpg" alt="" class="mt-2 h-auto w-auto" />
          </div>
          <div
            class="col-span-3 col-start-2 row-span-1 row-start-1 mt-1 text-center text-base font-bold sm:text-2xl md:ml-20"
          >
            บริษัท เหล็กทรัพย์ จำกัด
          </div>
          <div class="col-span-1 row-span-2 row-start-1">
            <img src="../img/QR.png" alt="" class="h-auto w-auto md:h-20" />
          </div>
          <div class="justify-inline col-span-3 mt-4 flex items-center">
            <label class="mr-4">ขึ้นของที่ </label>
            <select
              :disabled="
                order.status == 'A' ||
                order.status == 'C' ||
                order.status == 'W'
              "
              v-model="Selectplant"
              @change="postPlant"
            >
              <option v-for="item in this.PLANT" :key="item.plant">
                {{ item.plant }} - {{ item.name }}
              </option>
            </select>
            <div hidden>{{ pplant }}</div>
            <div class="mx-2">
              <span class="relative inline-block cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span
                  v-if="waitCount"
                  class="absolute top-0 right-1 inline-flex translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full bg-red-600 px-2 py-1 text-xs font-bold leading-none text-red-100"
                  >{{ waitCount }}</span
                >
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import OrderService from "../services/OrderService.js";

import { auth } from "../state/user";
import { order } from "../state/order";
import ModalSO from "./ModalSO.vue";
import ModalRegion from "./ModalRegion.vue";

export default {
  data() {
    return {
      modalOpen: false,
      Selectplant: "",
      auth,
      order,
      waitlist: [],
      PLANT: [
        { plant: "1010", name: "ZUBB" },
        { plant: "1020", name: "OPS" },
        { plant: "2010", name: "OCP" },
        { plant: "1040", name: "SPS" },
        { plant: "1050", name: "WPN" },
        { plant: "3030", name: "MMT" },
      ],
    };
  },
  created() {
    this.pplant;
    this.fecthSoList();
  },
  computed: {
    wlist() {
      return this.waitlist.map((m) => m, { loading: false });
    },
    waitCount() {
      return this.waitlist.length;
    },
    pplant() {
      let showplant = "1010 - ZUBB";
      console.log("ODP:", order.plant);
      if (order.plant) {
        const p = this.PLANT.filter((x) => x.plant == order.plant);
        showplant = p[0].plant + " - " + p[0].name;
      }
      this.Selectplant = showplant;
      console.log("sss", this.Selectplant);
      return showplant;
    },
  },
  methods: {
    async fecthSoList() {
      const sl = await OrderService.getSoList({ empcode: auth.user_id });
      this.waitlist = sl.data;
      // this.waitlist = sl.data.map((m) => [...m, { loading: false }]);
    },
    async postPlant() {
      const data = this.Selectplant.split("-");
      let code_plant = data[0];
      order.plant = parseInt(code_plant);
      await OrderService.postplant({ plant: code_plant, qt: auth.temp_qt });
    },
  },
  components: { ModalSO, ModalRegion },
};
</script>
