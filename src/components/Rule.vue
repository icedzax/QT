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
        <div class="w-4/5">
          <input
            type="text"
            name=""
            id=""
            v-model="rules.condition"
            :disabled="!isEnable"
            class="w-full h-6 text-xs mr-2 border-none"
            @input="changeUpdate(rules.condition, rules.item)"
          />
        </div>
        <div class="w-3/5 py-0.5 ml-4" v-show="isEnable">
          <select
            name=""
            id=""
            class="w-4/5 text-xs p-1 text-center h-6"
            v-model="rules.condition_t"
            @change="clickChoice(rules.condition_t, false, index + 1)"
          >
            <option
              v-for="(choice, index) in this.condition"
              :key="index"
              @click="c_option"
              :disabled="index == 0"
            >
              {{ choice }}
            </option>
          </select>
        </div>
        <div v-show="isEnable" class="w-1/5">
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
      <div v-show="isEnable" class="col-span-2 flex justify-inline">
        <div class="w-8 mr-2 py-0.5">
          <input
            type="text"
            class="h-6 text-xs w-full mr-2 p-2 border-none"
            :value="ruleX.length + 1"
            disabled
          />
        </div>
        <div class="w-4/5 py-0.5">
          <input
            type="text"
            class="bg-yellow-50 w-full h-6 text-xs mr-2"
            v-model="inputRules"
            @input="changeInputR(inputRules)"
          />
        </div>
        <div class="w-3/5 py-0.5 ml-4">
          <select
            name=""
            id=""
            class="w-4/5 text-xs p-1 text-center h-6"
            v-model="selectChoice"
            @change="clickChoice(selectChoice, true)"
          >
            <option
              v-for="(choice, index) in this.condition"
              :key="index"
              @click="c_option"
              :disabled="index == 0"
            >
              {{ choice }}
            </option>
          </select>
        </div>
        <div class="w-1/5 py-0.5">
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
    {{}}
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
      examchoice: [
        { id: 0, choice_name: "เลือกเงื่อนไข" },
        { id: 1, choice_name: "ตัวเลือกที่ 1" },
        { id: 2, choice_name: "ตัวเลือกที่ 2" },
        { id: 3, choice_name: "ตัวเลือกที่ 3" },
      ],
      condition: [
        "เลือกเงื่อนไข",
        "Y000 0 Day Credit",
        "Y001 1 Day Credit",
        "Y003 3 Day Credit",
        "Y007 7 Days Credit",
        "Y00C Cash",
        "Y010 10 Days Credit",
        "Y015 15 Days Credit",
        "Y030 30 Days Credit",
        "Y045 45 Days Credit",
        "Y060 60 Days Credit",
      ],
      selectChoice: "เลือกเงื่อนไข",
      check_repeat: false,
      RulesEmp: [],
    };
  },
  async create() {},
  computed: {
    sumweight() {
      const newsw = this.sw.toFixed(2);
      return newsw;
    },
    ruleX() {
      if (!this.check_repeat) {
        order.con.forEach((data) => {
          data.condition_t = data.condition;
        });

        this.condition.forEach((data) => {
          this.RulesEmp.push(data);
        });

        order.con.map((data) => {
          const B = this.RulesEmp.includes(data.condition);

          if (!B) {
            data.condition_t = "เลือกเงื่อนไข";
          }
        });
      }

      return order.con;
    },
    isEnable() {
      if (order.status == "TEMP" || order.status == "D") return true;
    },
  },
  methods: {
    async changeUpdate(con, ids) {
      this.check_repeat = false;
      order.con.filter((data, index) => {
        if (ids !== index + 1) {
          //จะไม่เช็กตัวเอง
          if (con == data.condition) {
            this.check_repeat = true;

            return false;
          }
        }
      });

      if (!this.check_repeat) {
        await OrderService.editCon({
          con: con,
          qt: auth.temp_qt,
          item: ids,
        });
      } else {
        alert("ตรวจสอบเงื่อนไขว่าซ้ำกับด้านบนหรือไม่");
        order.con.map((data, index) => {
          if (ids == index + 1) {
            data.condition = "";
            data.condition_t = "เลือกเงื่อนไข";
          }
        });
      }
    },
    changeInputR(a) {
      this.checkRULES(a);
    },
    async addRules() {
      this.inputRules = this.inputRules.trim();
      if (this.inputRules !== "") {
        if (this.check_repeat) {
          alert("ห้ามเลือกซ้ำกับเงื่อนไขก่อนหน้า");
        } else {
          await OrderService.myRule({ qt: auth.temp_qt, con: this.inputRules });

          const rules = await OrderService.Con(auth.temp_qt);
          order.con = rules.data;
          this.inputRules = "";
        }
      } else {
        alert("เลือกหรือกรอกเงื่อนไขก่อน");
      }
    },
    async delRules(index) {
      await OrderService.delcon({ qt: auth.temp_qt, item: index });
      const rules = await OrderService.Con(auth.temp_qt);
      order.con = rules.data;
    },
    async clickChoice(a, type, index = "") {
      if (type) {
        this.inputRules = a;
      }

      this.checkRULES(a, type, index);
    },
    checkRULES(rules, type, index = "") {
      this.check_repeat = false;
      rules = rules.trim();
      const a = order.con.filter((r) => r.condition == rules);
      if (!type) {
        if (a.length == 1) {
          this.check_repeat = true;
        } else {
          order.con.filter(async (data) => {
            if (data.item == index) {
              data.condition = rules;
              await OrderService.editCon({
                con: rules,
                qt: auth.temp_qt,
                item: data.item,
              });
            }
          });
        }

        if (this.check_repeat) {
          alert("ซ้ำไม่ได้นะ");
          order.con.filter((data) => {
            if (data.item == index) {
              data.condition_t = "เลือกเงื่อนไข";
              data.condition = "";
            }
          });
          console.log("หลังจิ้ม::", order.con);
        }
      } else {
        if (a.length == 1) {
          this.check_repeat = true;
        }
      }
    },
  },
};
</script>
<style>
.head {
  text-decoration-style: double;
}
</style>
