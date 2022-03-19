<template>
  <div class="container">
    <div
      class="grid overflow-hidden grid-cols-2 grid-rows-1 gap-0.5 text-xs lg:text-sm"
    >
      <div class="head col-span-1 underline text-center">
        เงื่อนไขการชำระเงินและการจัดส่งสินค้า
      </div>
      <div class="text-right">
        น้ำหนักรวม +/- :
        <v-num #="{ number }" :value="sumweight">
          {{ number }}
        </v-num>
        Kg.
      </div>

      <div
        v-for="(rules, index) in ruleX"
        :key="index"
        class="col-span-2 flex justify-inline"
      >
        <div class="w-8 mr-2">
          <input
            type="text"
            :value="index + 1"
            class="w-full h-6 text-xs mr-2 p-2 border-none"
            disabled
          />
        </div>
        <div class="w-3/5">
          <input
            type="text"
            name=""
            id=""
            v-model="rules.condition"
            class="w-4/5 h-6 text-xs mr-2 border-none"
            @input="changeUpdate(rules.condition, rules.item)"
          />
        </div>
        <div class="w-2/5">
          <svg
            id="Layer_1"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            fill="red"
            @click="delRules(rules.item)"
            class="w-5 h-5 font-bold text-red-600 text-xl"
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
      <div class="col-span-2 flex justify-inline">
        <div class="w-8 mr-2 py-0.5">
          <input
            type="text"
            class="h-6 text-xs w-full mr-2 p-2 border-none"
            :value="ruleX.length + 1"
            disabled
          />
        </div>
        <div class="w-3/5 py-0.5">
          <input
            type="text"
            class="bg-yellow-50 w-4/5 h-6 text-xs mr-2"
            v-model="inputRules"
          />
        </div>
        <div class="w-2/5 py-0.5">
          <svg
            version="1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            enable-background="new 0 0 48 48"
            class="w-5 h-5 text-green-600 text-xl"
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
</template>
<script>
import { order } from "../state/order";
import { auth } from "../state/user";
import { debounce } from "lodash";

import OrderService from "../services/OrderService.js";

export default {
  props: ["sw"],
  data() {
    return {
      fixsw: "",
      inputRules: "",
      ruleAll: [],
    };
  },
  async create() {},
  computed: {
    sumweight() {
      const newsw = this.sw.toFixed(2);
      return newsw;
    },
    ruleX() {
      return order.con;
    },
  },
  methods: {
    changeUpdate: debounce(async function (con, ids) {
      await OrderService.editCon({
        con: con,
        qt: auth.temp_qt,
        item: ids,
      });
    }, 800),
    async addRules() {
      await OrderService.myRule({ qt: auth.temp_qt, con: this.inputRules });
      const rules = await OrderService.Con(auth.temp_qt);
      order.con = rules.data;
    },
    async delRules(index) {
      await OrderService.delcon({ qt: auth.temp_qt, item: index });
      const rules = await OrderService.Con(auth.temp_qt);
      order.con = rules.data;
    },
  },
};
</script>
<style>
.head {
  text-decoration-style: double;
}
</style>
