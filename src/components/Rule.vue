<template>
  <div class="mx-4 py-1">
    <div
      class="grid overflow-hidden grid-cols-2 grid-rows-1 gap-0.5 text-xs lg:text-sm"
    >
      <div class="head col-span-1 underline text-start">
        เงื่อนไขการชำระเงินและการจัดส่งสินค้า
      </div>
      <div class="text-right">
        น้ำหนักรวม +/- :
        <v-num #="{ number }" :value="sumweight">
          {{ number }}
        </v-num>
        Kg.
      </div>
    </div>
    <div
      class="grid overflow-hidden items-center grid-cols-5 grid-rows-2 gap-0 mt-2"
    >
      <div class="text-xs">เงื่อนไขชำระเงิน</div>
      <div class="col-start-2 col-span-4">
        <select
          class="text-xs p-1 px-5 text-left h-6 rounded border border-gray-300"
          v-model="pterm"
          @change="termChange($event)"
          :disabled="!isEnable"
        >
          <option v-for="term in terms" :key="term.y" :value="term.y">
            {{ term.text }}
          </option>
        </select>
      </div>
      <div class="text-xs">วิธีการจัดส่ง</div>
      <div class="col-start-2 mt-0.5">
        <select
          class="text-xs p-1 px-5 text-left h-6 rounded border border-gray-300"
          v-model="pship"
          @change="shipChange($event)"
          :disabled="!isEnable"
        >
          <option v-for="ship in ships" :key="ship.y" :value="ship.y">
            {{ ship.text }}
          </option>
        </select>
      </div>
    </div>
    <div class="w-4/5 rounded border p-1 mt-1 items-center">
      <div class="text-sm underline">หมายเหตุ</div>
      <div class="col-start-2">
        <div v-for="(con, index) in conlist" :key="index" class="col flex">
          <div class="border-b border-gray-200 w-full">
            <input
              type="text"
              name=""
              v-model="con.condition"
              :disabled="!isEnable"
              class="w-full rounded h-6 text-xs border-none"
              @input="changeUpdate(con.condition, con.item)"
            />
          </div>

          <div v-show="isEnable">
            <svg
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              fill="red"
              @click="delRules(con.item)"
              class="w-5 h-5 mt-1 font-bold text-red-600 text-xl"
            >
              <title>Remove</title>
              <path
                d="M472.22,164.65A235.29,235.29,0,0,0,347.35,39.78a235.37,235.37,0,0,0-182.7,0A235.29,235.29,0,0,0,39.78,164.65a235.37,235.37,0,0,0,0,182.7A235.29,235.29,0,0,0,164.65,472.22a235.37,235.37,0,0,0,182.7,0A235.29,235.29,0,0,0,472.22,347.35a235.37,235.37,0,0,0,0-182.7Zm-39.3,166.08A192.7,192.7,0,1,1,448,256,191.39,191.39,0,0,1,432.92,330.73Z"
              />
              <path
                d="M341.33,234.67H170.67a21.33,21.33,0,1,0,0,42.66H341.33a21.33,21.33,0,1,0,0-42.66Z"
              />
            </svg>
          </div>
        </div>
        <div v-show="isEnable" class="col flex">
          <div class="w-full mt-1 py-0.5">
            <input
              type="text"
              class="bg-yellow-50 w-full h-6 text-xs mr-2 rounded"
              v-model="inputRules"
            />
          </div>

          <div class="py-0.5">
            <svg
              version="1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              enable-background="new 0 0 48 48"
              class="w-5 h-5 mt-1.5 text-green-600 text-xl"
              @click="addRules()"
            >
              <circle fill="#4CAF50" cx="24" cy="24" r="21" />
              <g fill="#fff">
                <rect x="21" y="14" width="6" height="20" />
                <rect x="14" y="21" width="20" height="6" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { order } from "../state/order";
import { auth } from "../state/user";
import { debounce } from "lodash";

import OrderService from "../services/OrderService.js";

export default {
  props: ["sw", "pterm", "pship"],
  data() {
    return {
      order,
      selectedTerm: "",
      selectedShip: "",
      fixsw: "",
      inputRules: "",
      ruleAll: [],

      terms: [
        { y: "Y000", text: "Y000 0 Day Credit" },
        { y: "Y001", text: "Y001 1 Day Credit" },
        { y: "Y005", text: "Y005 5 Day Credit" },
        { y: "Y003", text: "Y003 3 Day Credit" },
        { y: "Y007", text: "Y007 7 Days Credit" },
        { y: "Y00C", text: "Cash" },
        { y: "Y010", text: "Y010 10 Days Credit" },
        { y: "Y015", text: "Y015 15 Days Credit" },
        { y: "Y030", text: "Y030 30 Days Credit" },
        { y: "Y040", text: "Y040 40 Days Credit" },
        { y: "Y045", text: "Y045 45 Days Credit" },
        { y: "Y060", text: "Y060 60 Days Credit" },
        { y: "Y090", text: "Y090 90 Days Credit" },
        { y: "Y120", text: "Y120 120 Days Credit" },
        { y: "Y150", text: "Y150 150 Days Credit" },
      ],
      ships: [
        { y: "90", text: "จัดส่ง" },
        { y: "91", text: "รับเอง" },
      ],

      check_repeat: false,
      RulesEmp: [],
    };
  },
  async create() {
    this.selectedTerm = this.pterm;
    this.selectedShip = this.pship;
  },
  computed: {
    cTerm() {
      return order.term;
    },
    cShip() {
      return order.ship;
    },
    conlist() {
      return order.con;
    },
    sumweight() {
      return this.sw.toFixed(2);
    },
    isEnable() {
      if (order.status == "TEMP" || order.status == "D") return true;
    },
  },
  methods: {
    async termChange(event) {
      const payload = {
        qt: auth.temp_qt,
        attr: "term",
        value: event.target.value,
      };

      await OrderService.term(payload);
    },
    async shipChange(event) {
      const payload = {
        qt: auth.temp_qt,
        attr: "ship",
        value: event.target.value,
      };

      await OrderService.ship(payload);
    },
    changeUpdate: debounce(async function () {
      await OrderService.editCon({
        con: con,
        qt: auth.temp_qt,
        item: ids,
      });
    }, 500),

    async addRules() {
      this.inputRules = this.inputRules.trim();
      console.log(this.inputRules);
      await OrderService.myRule({ qt: auth.temp_qt, con: this.inputRules });
      const rules = await OrderService.Con(auth.temp_qt);
      order.con = rules.data;
      this.inputRules = "";
    },
    async delRules(index) {
      console.log("DEL", { qt: auth.temp_qt, item: index });
      await OrderService.delcon({ qt: auth.temp_qt, item: index });
      const rules = await OrderService.Con(auth.temp_qt);
      order.con = rules.data;
    },
  },
};
</script>
<style scoped>
input {
  @apply ml-0;
}
.head {
  text-decoration-style: double;
}
</style>
