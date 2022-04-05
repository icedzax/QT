<template>
  <div class="mx-2">
    <table class="table-fix w-full text-xs">
      <thead class="w-full">
        <tr class="w-full mb-4">
          <th class="no font-light border border-slate-200 text-xs md:text-sm">
            ลำดับ
          </th>
          <th
            class="font-light border border-slate-200 w-2/12 text-xs md:text-sm"
          >
            รหัสสินค้า
          </th>
          <th
            :class="approveStat ? 'w-3/12' : 'w-4/12'"
            class="font-light border border-slate-200 text-xs md:text-sm"
          >
            รายการสินค้า
          </th>
          <th
            class="font-light border border-slate-200 w-auto text-xs md:text-sm"
          >
            จำนวน
          </th>
          <th
            class="font-light border border-slate-200 w-1/12 text-xs md:text-sm"
          >
            ราคาเส้นต่อมัด
          </th>
          <th
            class="font-light border border-slate-200 w-auto text-xs md:text-sm"
          >
            น้ำหนักหน่วย +/-
          </th>
          <th
            class="font-light border border-slate-200 w-fit text-xs md:text-sm"
          >
            หน่วย
          </th>

          <th
            class="font-light border border-slate-200 w-fit text-xs md:text-sm"
          >
            ราคาต่อหน่วยก่อน VAT 7%
          </th>
          <th
            class="font-light border border-slate-200 w-auto text-xs md:text-sm"
          >
            จำนวนเงิน
          </th>
          <th v-if="approveStat" class="w-auto">
            <svg
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 128 128"
              @click="deleteAll"
              class="mx-1 w-5 h-5"
            >
              <title>x</title>
              <path
                class="cls-1"
                d="M17.66229,21.88486,63.3847,30.82574l45.72241,8.94088a1.559,1.559,0,0,0,1.82788-1.22994A10.15176,10.15176,0,0,0,102.9192,26.6239l-15.172-2.96684.79656-4.07352A11.10952,11.10952,0,0,0,79.7827,6.56318L57.33412,2.17343A11.1096,11.1096,0,0,0,44.31375,10.9345L43.51718,15.008l-15.172-2.96685A10.15176,10.15176,0,0,0,16.43235,20.057a1.559,1.559,0,0,0,1.22994,1.82788ZM60.0674,9.82374,74.369,12.62036a8.2641,8.2641,0,0,1,6.5245,9.69647h0l-15.2613-2.9843L50.37093,16.34825h0A8.2641,8.2641,0,0,1,60.0674,9.82374Z"
              />
              <path
                class="cls-2"
                d="M110.58839,47.36161H17.41161a1.559,1.559,0,0,0-1.55785,1.55785v5.90918c0,.85949,16.14275,61.05238,16.14275,61.05238a11.08149,11.08149,0,0,0,11.03938,10.153H84.96412A11.08149,11.08149,0,0,0,96.0035,115.881s16.14275-60.19289,16.14275-61.05238V48.91946A1.559,1.559,0,0,0,110.58839,47.36161Zm-61.934,64.2194a2.60793,2.60793,0,0,1-3.19666-1.84821c-4.44239-16.61345-8.95983-33.53068-11.91535-44.72956a2.61069,2.61069,0,1,1,5.04851-1.33243c2.95407,11.19159,7.47077,28.10409,11.911,44.71353A2.61043,2.61043,0,0,1,48.65435,111.581Zm17.95316-2.52243a2.61095,2.61095,0,0,1-5.22189,0V64.337a2.61095,2.61095,0,0,1,5.22189,0ZM94.45735,65.00325C91.3685,76.70879,86.46715,95.05644,82.542,109.73317a2.61073,2.61073,0,1,1-5.04414-1.34918c3.9237-14.67272,8.8236-33.01491,11.911-44.71316a2.61069,2.61069,0,1,1,5.04851,1.33243Z"
              />
            </svg>
          </th>
        </tr>
      </thead>
      <!-- Remove the nasty inline CSS fixed height on production and replace it with a CSS class — this is just for demonstration purposes! -->
      <tbody class="bg-grey-light w-full">
        <template v-for="(items, index) in List" :key="index" class="">
          <tr class="w-full">
            <td
              @click="toggle(items.id)"
              class="w-min text-center text-xs md:text-sm border border-slate-200"
            >
              <div class="flex items-center">
                <input
                  type="text"
                  :value="index + 1"
                  class="w-5/6 text-xs text-center border-none"
                  disabled
                />

                <div class="w-min mx-1">
                  <Toggle :arrow="!items.show ? 'down' : 'up'" />
                </div>
              </div>
            </td>
            <td
              class="py-1 w-2/12 text-center text-xs md:text-sm border border-slate-200"
            >
              <input
                type="text"
                v-model="items.rmd_mat"
                class="w-5/6 text-xs p-1 text-center border-none"
                :disabled="!approveStat"
                @input="changeUpdate(items.id)"
              />
            </td>
            <td
              class="py-1 w-2/12 text-left text-xs md:text-sm border border-slate-200"
            >
              <input
                type="text"
                v-model="items.rmd_size"
                class="w-full py-0.5 text-xs border-none text-center"
                :disabled="!approveStat"
                @input="changeUpdate(items.id)"
              />
            </td>
            <td
              class="py-1 w-1/12 text-center text-xs md:text-sm border border-slate-200"
            >
              <input
                type="text"
                v-model="items.amount"
                @keyup="
                  edit(
                    index,
                    items.amount,
                    items.price_unit,
                    true,
                    items.unit,
                    items.id
                  )
                "
                @keypress="NumbersOnly"
                class="w-5/6 text-xs p-1 text-center border-none"
                :disabled="!approveStat"
              />
            </td>
            <td class="py-1 w-fit text-xs md:text-sm border border-slate-200">
              <select
                :disabled="!approveStat"
                class="border-none text-xs"
                v-model="items.ptype"
                @change="
                  PriceType(items.unit, items.ptype, index, false, items.id)
                "
              >
                <option
                  v-for="sItem in type.Wholesale"
                  :key="sItem.t"
                  :value="sItem.t"
                >
                  {{ sItem.text }}
                </option>
              </select>

              <!-- <select
              v-model="items.ptype"
              @change="
                PriceType(items.unit, items.ptype, index, false, items.id)
              "
              class="text-xs p-1 mr-16 w-full border-none"
              :disabled="!approveStat"
            >
              <option
                v-for="i in type.Wholesale"
                :key="i.t"
                :value="items.ptype.slice(0, 2)"
              >
                {{ i.text }}
              </option>
            </select> -->
            </td>
            <td
              class="py-1 w-1/12 text-center text-xs md:text-sm border border-slate-200"
            >
              <div class="flex justify-inline text-xs border-b border-gray-300">
                <input
                  class="w-1/2 text-center text-red-500 p-1 focus:outline-none cursor-pointer"
                  v-model="items.min"
                  @click="
                    changeNG(items.min, true, items.unit, items.id, index)
                  "
                  readonly="readonly"
                  :disabled="!approveStat"
                />
                <input
                  class="w-1/2 text-center text-green-500 p-1 focus:outline-none cursor-pointer"
                  v-model="items.max"
                  @click="
                    changeNG(items.max, true, items.unit, items.id, index)
                  "
                  readonly="readonly"
                  :disabled="!approveStat"
                />
              </div>
              <input
                type="text"
                v-model="items.rmd_weight"
                class="w-4/6 text-xs p-1 text-center border-none focus:outline-none"
                :disabled="!approveStat"
                @input="
                  changeNG(items.rmd_weight, true, items.unit, items.id, index)
                "
              />
            </td>

            <td
              class="py-1 w-1/12 text-center text-xs md:text-sm border border-slate-200"
            >
              <select
                v-model="items.unit"
                @change="
                  PriceType(items.unit, items.ptype, index, false, items.id)
                "
                class="text-xs p-1 text-center w-5/6 border-none"
                :disabled="!approveStat"
              >
                <option v-for="(i, index) in this.type_unit" :key="index">
                  {{ i }}
                </option>
              </select>
            </td>

            <td class="py-1 text-center w-1/12 border border-slate-200">
              <input
                type="text"
                v-model="items.price_unit"
                @keyup="
                  edit(
                    index,
                    items.amount,
                    items.price_unit,
                    true,
                    items.unit,
                    items.id
                  )
                "
                class="w-5/6 p-1 text-sm text-center border-none"
                :disabled="!approveStat"
              />
            </td>
            <td class="py-1 w-1/12 text-center border border-slate-200">
              <v-num #="{ number }" :value="items.cal_price">
                {{ number }}
              </v-num>
            </td>
            <td class="py-1 w-1/12 text-center">
              <svg
                v-if="approveStat"
                id="Layer_1"
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                fill="red"
                @click="deletes(index, items.id)"
                class="mx-1 w-5 h-5"
                v-show="!items.loading"
              >
                <title>Remove</title>
                <path
                  d="M472.22,164.65A235.29,235.29,0,0,0,347.35,39.78a235.37,235.37,0,0,0-182.7,0A235.29,235.29,0,0,0,39.78,164.65a235.37,235.37,0,0,0,0,182.7A235.29,235.29,0,0,0,164.65,472.22a235.37,235.37,0,0,0,182.7,0A235.29,235.29,0,0,0,472.22,347.35a235.37,235.37,0,0,0,0-182.7Zm-39.3,166.08A192.7,192.7,0,1,1,448,256,191.39,191.39,0,0,1,432.92,330.73Z"
                />
                <path
                  d="M341.33,234.67H170.67a21.33,21.33,0,1,0,0,42.66H341.33a21.33,21.33,0,1,0,0-42.66Z"
                />
              </svg>
              <LoadingSpinner class="mx-1 w-5 h-5" v-show="items.loading" />
            </td>
            <!--  <InputItemText :data="items" /> -->
          </tr>
          <tr v-if="items.show" class="w-full">
            <td :colspan="9" class="border text-xs">
              <input
                placeholder="หมายเหตุ : .."
                type="text"
                class="w-full text-xs p-1 text-left border-none"
                v-model="items.REMARK"
                @input="changeUpdate(items.id)"
              />
            </td>
          </tr>
        </template>
      </tbody>

      <tbody class="bg-grey-light w-full" v-if="approveStat">
        <tr class="full">
          <td
            class="py-1 w-1/12 text-center text-xs md:text-sm border border-slate-200"
          >
            <input
              type="text"
              class="tdi w-5/6 text-xs p-1 text-center border-none"
              :value="this.order.list.length + 1"
              disabled
            />
          </td>
          <td
            class="py-1 w-2/12 text-center text-xs md:text-sm border border-slate-200"
            colspan="2"
          >
            <vue3-simple-typeahead
              ref="typeahead"
              id="typeahead_id"
              class="tdi"
              :placeholder="options.placeholder"
              :items="fg.items"
              @selectItem="selectItem"
              @onInput="onInput"
              @onBlur="onBlur"
              @input="lookupFG"
              :minInputLength="1"
              :itemProjection="
                (fg) => {
                  return fg.search;
                }
              "
            >
            </vue3-simple-typeahead>
          </td>
          <td
            class="py-1 w-1/12 text-center text-xs md:text-sm border border-slate-200"
          >
            <input
              type="text"
              class="tdi w-5/6 text-xs p-1 text-center border-none"
              v-model="inputField.amount"
              @keyup="
                edit(
                  index,
                  inputField.amount,
                  inputField.price_unit,
                  false,
                  inputField.selectedUnittype
                )
              "
            />
          </td>
          <td class="py-1 text-xs md:text-sm border border-slate-200">
            <select
              v-model="selectedType"
              @change="PriceType(selectedUnittype, selectedType, this.x, true)"
              class="border-none text-xs"
            >
              <option v-for="i in type.Wholesale" :key="i.t" :value="i.t">
                {{ i.text }}
              </option>
            </select>
          </td>
          <td
            class="py-1 w-1/12 text-center text-xs md:text-sm border border-slate-200"
          >
            <div class="flex justify-inline border-b border-gray-300">
              <input
                class="w-1/2 text-center text-xs p-1 focus:outline-none cursor-pointer text-red-500"
                v-model="inputField.min"
                readonly="readonly"
                @click="
                  changeNG(inputField.min, false, inputField.selectedUnittype)
                "
              />
              <input
                class="w-1/2 text-center text-xs p-1 focus:outline-none cursor-pointer text-green-500"
                v-model="inputField.max"
                readonly="readonly"
                @click="
                  changeNG(inputField.max, false, inputField.selectedUnittype)
                "
              />
            </div>
            <input
              type="text"
              class="tdi w-5/6 text-xs p-1 text-center border-none focus:outline-none"
              v-model="inputField.rmd_weight"
              @input="
                changeNG(
                  inputField.rmd_weight,
                  false,
                  inputField.selectedUnittype
                )
              "
            />
          </td>

          <td
            class="py-1 w-1/12 text-center text-xs md:text-sm border border-slate-200"
          >
            <select
              v-model="selectedUnittype"
              @change="PriceType(selectedUnittype, selectedType, this.x, true)"
              class="tdi text-xs p-1 text-center w-5/6 border-none"
            >
              <option v-for="(i, index) in this.type_unit" :key="index">
                {{ i }}
              </option>
            </select>
          </td>

          <td class="py-1 w-1/12 text-center border border-slate-200">
            <input
              type="text"
              class="tdi w-5/6 p-1 text-sm text-center border-none"
              v-model="inputField.price_unit"
              @keyup="
                edit(
                  index,
                  inputField.amount,
                  inputField.price_unit,
                  false,
                  inputField.selectedUnittype
                )
              "
            />
          </td>
          <td class="py-1 w-1/12 text-center border border-slate-200">
            <v-num
              #="{ number }"
              :value="inputField.cal_price"
              maximum-fraction-digits="2"
            >
              {{ number }}
            </v-num>
          </td>
          <td class="py-1 w-1/12">
            <svg
              version="1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              enable-background="new 0 0 48 48"
              class="mx-1 w-5 h-5"
              v-show="!sys.loading"
              v-if="(this.List.length == 0 || approveStat) && !chkrepeat"
              @click="enter"
            >
              <circle fill="#4CAF50" cx="24" cy="24" r="21" />
              <g fill="#fff">
                <rect x="21" y="14" width="6" height="20" />
                <rect x="14" y="21" width="20" height="6" />
              </g>
            </svg>
            <LoadingSpinner class="mx-1 w-5 h-5" v-show="sys.loading" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { fg } from "../state/fg";
import { order } from "../state/order";
import { auth } from "../state/user";
import { debounce } from "lodash";
import { sys } from "../state/system";
import FgService from "../services/FgService.js";
import OrderService from "../services/OrderService.js";
import InputItemText from "./InputItemText.vue";
import LoadingSpinner from "./LoadingSpinner.vue";
import Toggle from "./Toggle.vue";

export default {
  components: { InputItemText, LoadingSpinner, Toggle },
  data() {
    return {
      sys,
      auth,
      x: "input",
      num: "",
      fg,
      options: {
        placeholder: "Matcode,Description,Size...",
        minInputLength: 1,
      },
      order,
      listFiltered: [],
      data: {
        input: "",
        selection: null,
      },
      type: {
        // retail: ["R1:สดรับเอง", "R2:สดส่ง", "R3:เงินเชื่อ"],
        Wholesale: [
          { t: "T1", text: "T1:100 ตัน" },
          { t: "W0", text: "W0:ยกรถ" },
          { t: "W1", text: "W1:คละไซด์" },
          { t: "W2", text: "W2:ยกมัด" },
          { t: "W3", text: "W3:ปลีก" },
        ],
      },
      type_unit: ["PC", "KG"],
      tprice: [],
      inputField: {
        rmd_mat: null,
        rmd_size: null,
        rmd_weight: null,
        cal_price: 0,
        amount: 1,
        price_unit: 1,
        min: null,
        max: null,
      },

      chkrepeat: false,

      selectedType: null,
      selectedUnittype: null,
    };
  },
  props: ["statusApp", "mat"],
  computed: {
    approveStat() {
      console.log(order.status);
      if (order.status == "TEMP" || order.status == "D") return true;
      //return order.status != "TEMP" ? true : false;
    },
    // validateSave() {
    //   if (this.approveStat) return;
    // },
    validateAdd() {
      if (this.approveStat && order.list.length < 1) return;
    },
    List() {
      this.order.list.map((item) => {
        item.loading = false;
        if (item.REMARK) {
          item.show = true;
        }

        if (item.min == null || item.min == 0) {
          item.min = "";
        }
      });
      console.log("DATA ORDER::", this.order.list);
      return this.order.list;
    },
    fgSearchList() {
      return this.fg.items.map((f) => {
        return f.rmd_size + " - " + f.rmd_mat;
      });
    },
    calPrice() {
      return this.inputField.amount * this.inputField.price_unit || null;
    },

    pushMat() {
      // console.log("pushMat");
      return this.fg.items.filter((f) => {
        return f.rmd_mat == this.mat;
      });
    },
  },

  async created() {
    // let result = await UserService.fgList();

    // fg.items = result.data;
    let pickQT = "";
    if (this.mat) {
      const lqt = await OrderService.getLastQT(auth.user_id);
      console.log("lqt", lqt.data);
      if (lqt.data[0]) {
        pickQT = await lqt.data[0].qt;
      } else {
        pickQT = await auth.temp_qt;
      }
      const prepush = await FgService.get(this.mat);
      console.log("prepush", prepush);
      const payload = {
        VKORG: 1000,
        MATNR: this.mat,
        KONDA: "T1",
        KMEIN: "PC",
      };
      const price = await FgService.getPrice(payload);

      let pre_priceunit = 1;
      let pre_calprice = 1;
      let pre_amount = 1;

      if (price.data[0]) {
        pre_priceunit = price.data[0].KBETR;
        pre_calprice = pre_amount * pre_priceunit;
      }
      const stock_payload = {
        rmd_mat: prepush.data[0].rmd_mat,
        rmd_size: prepush.data[0].rmd_size,
        rmd_weight: prepush.data[0].NTGEW,
        ptype: "T1",
        amount: pre_amount,
        unit: "PC",
        price_unit: pre_priceunit,
        cal_price: pre_calprice,
        qt: pickQT,
      };
      console.log(stock_payload);
      await FgService.insert(stock_payload);
      const testii = await FgService.items(pickQT);
      order.list = await testii.data;

      this.$router.replace({});
    }
    this.tprice = this.type.Wholesale.map((t) => {
      return t.text;
    });
    this.selectedType = "T1";

    this.selectedUnittype = "PC";
  },
  mounted() {},
  methods: {
    toggle(id) {
      this.order.list.map((x) => {
        if (x.id == id) {
          x.show = !x.show;
        }
        // console.log(x);
      });
    },

    lookupFG: debounce(async function () {
      const result = await FgService.search({ input: this.data.input });

      this.fg.items = result.data;
    }, 500),
    NumbersOnly(evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },

    changeUpdate: debounce(async function (ids) {
      const payload = order.list.filter((data) => data.id == ids);

      const data_payload = {
        id: payload[0].id,
        rmd_mat: payload[0].rmd_mat,
        rmd_size: payload[0].rmd_size,
        rmd_weight: payload[0].rmd_weight,
        ptype: payload[0].ptype.slice(0, 2),
        amount: payload[0].amount,
        unit: payload[0].unit,
        price_unit: payload[0].price_unit,
        cal_price: payload[0].cal_price,
        remark: payload[0].REMARK,
      };
      console.log("PA", data_payload);
      console.log("updated");
      await OrderService.update(data_payload);
    }, 800),

    async PriceType(unit, type, i, isInput, ids = "") {
      console.log("PriceType", unit, type, i, isInput, ids);
      if (isInput) {
        if (unit == "KG") {
          this.inputField.selectedUnittype = "KG";
        } else {
          this.inputField.selectedUnittype = "PC";
        }
      }

      let typ = type;
      let new_matnr = "";
      if (
        (isInput && order.list.length !== 0 && i !== "input") ||
        (order.list.length !== 0 && i !== "input")
      ) {
        new_matnr = order.list[i].rmd_mat;
      } else {
        if (this.data.selection) {
          new_matnr = this.data.selection.rmd_mat;
        }
      }

      const payload = {
        VKORG: 1000,
        MATNR: new_matnr,
        KONDA: typ,
        KMEIN: unit,
      };
      if (isInput) {
        sys.loading = true;
      } else {
        order.list[i].loading = true;
      }
      const price = await FgService.getPrice(payload);
      console.log("price==", price);
      console.log("UNIT:", unit);
      if (price.data[0]) {
        if (isInput) {
          console.log("มีราคามาบน");
          this.inputField.price_unit = price.data[0].KBETR;
          if (unit == "KG") {
            this.inputField.cal_price = parseFloat(
              this.inputField.amount * this.inputField.rmd_weight
            ).toFixed(2);
          } else {
            this.inputField.cal_price = parseFloat(
              this.inputField.amount * price.data[0].KBETR
            ).toFixed(2);
          }
        } else {
          console.log("มีราคามาล่าง");
          order.list[i].price_unit = await price.data[0].KBETR;
          order.list[i].cal_price = parseFloat(
            order.list[i].amount * price.data[0].KBETR
          );
        }
      } else {
        if (isInput) {
          console.log("ไม่มีราคามาบน");
          this.inputField.price_unit = 1;
          if (unit == "KG") {
            this.inputField.cal_price = parseFloat(
              this.inputField.amount * this.inputField.rmd_weight
            ).toFixed(2);
          } else {
            this.inputField.cal_price = parseFloat(
              this.inputField.amount * this.inputField.price_unit
            ).toFixed(2);
          }
        } else {
          console.log("ไม่มีราคามาล่าง");
          order.list[i].price_unit = 1;
          if (unit == "KG") {
            order.list[i].cal_price = parseFloat(
              order.list[i].amount * order.list[i].rmd_weight
            ).toFixed(2);
          } else {
            order.list[i].cal_price = parseFloat(
              order.list[i].amount * order.list[i].price_unit
            ).toFixed(2);
          }
        }
        console.log(false);
      }
      if (isInput) {
        sys.loading = false;
      } else {
        order.list[i].loading = false;
      }
      if (!isInput) {
        // order.list[ids].ptype = typ;
        this.changeUpdate(ids);
      }
    },
    async selectItem(item) {
      this.data.selection = item;
      document.getElementsByClassName(
        "simple-typeahead-list"
      )[0].style.visibility = "hidden";

      let typ = this.selectedType.split(":");
      console.log(item.rmd_mat);
      const payload = {
        VKORG: 1000,
        MATNR: this.data.selection.rmd_mat,
        KONDA: typ[0],
        KMEIN: this.data.selection.MEINS || "PC",
      };

      sys.loading = true;
      console.log("loading", sys.loading);

      const price = await FgService.getPrice(payload);
      sys.loading = false;
      console.log("loading", sys.loading);
      this.inputField.rmd_mat = item.rmd_mat;
      this.inputField.rmd_weight = parseFloat(
        this.data.selection.NTGEW
      ).toFixed(2);
      this.inputField.rmd_size = this.data.selection.rmd_size;
      this.inputField.amount = 1;
      //min
      if (this.data.selection.minweight !== null) {
        if (this.data.selection.minweight == ".000") {
          this.data.selection.minweight = 0;
        } else {
          this.data.selection.minweight = parseFloat(
            this.data.selection.minweight
          ).toFixed(2);
        }
      } else {
        this.data.selection.minweight = 0;
      }
      //max
      if (
        this.data.selection.maxweight == ".000" ||
        this.data.selection.maxweight == null
      ) {
        this.data.selection.maxweight = parseFloat(
          this.data.selection.stdweight
        ).toFixed(2);
      }

      //fixed
      if (this.data.selection.minweight == 0) {
        this.data.selection.minweight = "";
      }
      this.inputField.min = this.data.selection.minweight;
      this.inputField.max = this.data.selection.maxweight;

      if (price.data[0]) {
        this.inputField.price_unit = price.data[0].KBETR;
        let a = parseFloat(this.inputField.amount * price.data[0].KBETR);
        this.inputField.cal_price = a;
      } else {
        this.inputField.price_unit = 1;
        this.inputField.cal_price = 1;
      }
      // const getType = await OrderService.pmat({
      //   MATNR: item.rmd_mat,
      //   VKORG: 1000,
      // });
      // console.log(
      //   "### PM ###",
      //   groupBy(getType.data, function (n) {
      //     return n.KONDA;
      //   })
      // );
      // this.selectedType;
    },
    onInput(event) {
      this.data.selection = null;
      this.data.input = event.input;
      this.listFiltered = event.items;
      this.inputField.rmd_size = this.data.input;
    },
    onBlur(event) {
      this.data.input = event.input;
      this.listFiltered = event.items;
    },

    async deletes(no, idsent) {
      let num = parseInt(no) + 1;
      if (confirm("นำรายการที่ " + num + " ออกใช่หรือไม่?")) {
        const delitem = await OrderService.del({ id: idsent });
        if (delitem.status == 200) {
          order.list.splice(no, 1);
        }
      }
    },
    deleteAll() {
      if (confirm("Clear ข้อมูลทั้งหมดใช่หรือไม่?")) {
        this.order.list = [];
      }
    },
    async enter() {
      if (this.data.input) {
        this.order.list.push({
          rmd_mat: this.inputField.rmd_mat,
          rmd_size: this.inputField.rmd_size,
          rmd_weight: this.inputField.rmd_weight,
          amount: this.inputField.amount,
          price_unit: this.inputField.price_unit || 1,
          cal_price: this.inputField.cal_price || 1,
          ptype: this.selectedType,
          unit: this.selectedUnittype,
        });
        console.log("min", this.inputField.min);
        const stock_payload = {
          rmd_mat: this.inputField.rmd_mat,
          rmd_size: this.inputField.rmd_size,
          rmd_weight: this.inputField.rmd_weight,
          ptype: this.selectedType,
          amount: this.inputField.amount,
          unit: this.selectedUnittype,
          price_unit: this.inputField.price_unit || 1,
          cal_price: this.inputField.cal_price || 1,
          qt: auth.temp_qt,
          min: this.inputField.min,
          max: this.inputField.max,
        };

        await FgService.insert(stock_payload);
        const new_order = await FgService.items(auth.temp_qt);

        order.list = new_order.data;
        // this.manage_type();
        if (this.order.list.length !== 0) {
          this.table_showlist = "Y";
        }

        this.data.input = {};
        this.inputField = {};
        this.inputField.cal_price = 0;

        this.$refs["typeahead"].$data.input = await "";
        delete this.data.input;
        delete this.data.selection;
      } else {
        alert("กรุณาเลือกสินค้า");
      }
    },
    edit(index, unit, vat, inputE, unittype, ids = "") {
      console.log("EDIT::", index, unit, vat, unittype, ids);

      if (this.order.list.length > 0 && inputE) {
        this.order.list.filter((data, i) => {
          if (i == index) {
            if (vat.length > 3) {
              data.price_unit = vat;
            }

            if (unittype == "KG") {
              if (vat == "0") {
                data.price_unit = unit;
                data.cal_price = parseFloat(unit * data.amount).toFixed(2);
              } else {
                data.cal_price = parseFloat(unit * data.rmd_weight).toFixed(2);
              }
              console.log("ส่งมา", unit);
              console.log("จำนวน", data.amount);
            } else {
              data.cal_price = parseFloat(unit * vat).toFixed(2);
            }
          }
        });
      } else {
        if (unittype == "KG") {
          if (vat == "0") {
            this.inputField.cal_price = parseFloat(
              unit * this.inputField.amount
            ).toFixed(2);
          } else {
            this.inputField.cal_price = parseFloat(
              unit * this.inputField.rmd_weight
            ).toFixed(2);
          }
        } else {
          this.inputField.cal_price = parseFloat(unit * vat).toFixed(2);
        }
      }
      if (inputE) {
        this.changeUpdate(ids);
      }
    },
    changeNG(item, input, unit, id, i = "") {
      console.log(item);
      //พิมพ์มาใน input
      if (item !== "") {
        if (!input) {
          this.inputField.rmd_weight = item;
        } else {
          order.list[i].rmd_weight = item;
        }

        let vat = 0;
        if (input && unit == "KG") {
          this.edit(i, item, vat, true, unit, id);
        } else if (!input && unit == "KG") {
          this.edit(i, item, vat, false, unit, id);
        }
      }
    },
    addComma(a) {
      let x = a.split(".");
      let x1 = x[0];

      let x2 = x.length > 1 ? "." + x[1] : "";

      var rgx = /(\d+)(\d{3})/;

      while (rgx.test(x1)) {
        x1 = x1.replace(rgx, "$1" + "," + "$2");
      }
      let aa = x1 + x2;
      return aa;
    },
    delcomma(a) {
      if (a.length > 3) {
        let x = a.replace(",", "");
        return x;
      } else {
        return a;
      }
    },
    changePrice(e, i) {
      console.log(e.target.value, i);

      this.changeUpdate(i);
    },
    manage_type() {
      this.tprice.map((x) => {
        order.list.map((y) => {
          const t_type = x.includes(y.ptype);
          if (t_type) {
            y.ptype = x;
          }
          y.cal_price = y.cal_price.toString();
          y.price_unit = y.price_unit.toString();
        });
      });
    },
  },
};
</script>
<style>
#typeahead_id {
  width: 95%;
  font-size: 0.75rem;
  line-height: 0.96rem;
  padding: 0.25rem;
  text-align: center;
  border-style: none;
}

div.simple-typeahead-list {
  height: 130px;
  font-size: 12px;
}
.cls-1 {
  fill: #2e79bd;
}
.cls-2 {
  fill: #2d3e50;
}
svg {
  cursor: pointer;
}
</style>
