<template>
  <div class="mx-2">
    <table class="table-fixed text-xxs sm:text-xs w-fit">
      <thead>
        <tr>
          <th class="w-12">ลำดับ</th>
          <th class="w-2/12">รหัสสินค้า</th>
          <th class="w-3/12">รายการสินค้า</th>
          <th class="w-11">จำนวนเส้น</th>
          <th class="w-11">เส้น/มัด</th>
          <th class="w-28">ราคา</th>
          <th class="w-1/12">น้ำหนัก</th>
          <th class="w-12">หน่วย</th>
          <th class="w-1/12">ราคาก่อน VAT7%</th>
          <th class="w-1/12">รวม นน.</th>
          <th class="w-1/12">จำนวนเงิน</th>
          <th v-if="approveStat">
            <svg
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 128 128"
              @click="deleteAll(this.auth.temp_qt)"
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
      <tbody>
        <template v-for="(items, index) in List" :key="index">
          <tr class="w-full">
            <td @click="toggle(items.id)">
              <div class="flex items-center">
                <span class="mx-1 text-xs">{{ index + 1 }}</span>

                <div class="mx-1">
                  <Toggle :arrow="!items.show ? 'down' : 'up'" />
                </div>
              </div>
            </td>
            <td class="py-1 text-center">
              <input
                type="text"
                v-model="items.rmd_mat"
                class="text-xs p-1 text-center border-none"
                :disabled="!approveStat"
                @input="itemChange(items)"
              />
            </td>
            <td>
              <input
                type="text"
                v-model="items.rmd_size"
                class="py-0.5 text-xs border-none text-center"
                :disabled="!approveStat"
                @input="itemChange(items)"
              />
            </td>
            <td>
              <input
                type="text"
                v-model="items.amount"
                @keypress="NumbersOnly"
                class="text-xs p-1 text-center border-none"
                :disabled="!approveStat || items.loading"
                @input="itemChange(items)"
              />
            </td>
            <td class="bg-gray-50 text-xs text-center bundle">
              <span
                >{{
                  items.bundle === 1 || items.bundle === 0 ? "" : items.bundle
                }}
              </span>
            </td>
            <td class="">
              <select
                :disabled="!approveStat"
                class="border-none text-xs"
                v-model="items.ptype"
                @change="itemChange(items, true), (items.loading = true)"
              >
                <option
                  v-for="sItem in saleType"
                  :key="sItem.t"
                  :value="sItem.t"
                >
                  {{ sItem.text }}
                </option>
              </select>
            </td>
            <td>
              <div class="flex items-center">
                <span class="text-right text-xs w-3/6 mx-auto" v-if="items.min"
                  >{{ items.min }} -
                </span>
                <input
                  type="text"
                  v-model="items.rmd_weight"
                  @change="itemChange(items)"
                  class="text-xs p-1 text-center border-none focus:outline-none"
                  :disabled="!approveStat"
                />
              </div>
            </td>

            <td>
              <select
                v-model="items.unit"
                class="w-full text-xs p-1 border-none"
                :disabled="!approveStat"
                @change="itemChange(items, true), (items.loading = true)"
              >
                <option v-for="(i, index) in items.typeunit" :key="index">
                  {{ i }}
                </option>
              </select>
            </td>

            <td>
              <input
                type="text"
                v-model="items.price_unit"
                @change="itemChange(items)"
                class="p-1 text-sm border-none text-center"
                :disabled="!approveStat"
              />
            </td>
            <td class="bg-gray-50 text-center">
              <v-num #="{ number }" :value="items.rmd_weight * items.amount">
                {{ number }}
              </v-num>
            </td>
            <td class="bg-gray-50 text-center">
              <v-num #="{ number }" :value="items.cal_price">
                {{ number }}
              </v-num>
            </td>
            <td>
              <svg
                v-if="approveStat"
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
          </tr>
          <tr v-if="items.show" class="">
            <td :colspan="12" class="border text-xs">
              <input
                placeholder="หมายเหตุ : .."
                type="text"
                class="w-full text-xs p-1 text-left border-none"
                v-model="items.REMARK"
                @input="itemChange(items)"
              />
            </td>
          </tr>
        </template>
        <!-- INPUT AREA -->
        <tr class="w-full">
          <td colspan="3">
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
          <td>
            <input
              type="text"
              v-model="inputField.amount"
              @keypress="NumbersOnly"
              class="text-xs p-1 text-center border-none"
              :disabled="!approveStat || sys.loading"
              @change="itemChange(inputField)"
            />
          </td>
          <td>
            <input
              type="text"
              v-model="inputField.bundle"
              @keypress="NumbersOnly"
              class="text-xs p-1 text-center border-none"
              disabled
              @input="itemChange(inputField)"
            />
          </td>
          <td class="">
            <select
              :disabled="!approveStat"
              class="border-none text-xs"
              v-model="inputField.ptype"
              @change="itemChange(inputField, true)"
            >
              <option v-for="sItem in saleType" :key="sItem.t" :value="sItem.t">
                {{ sItem.text }}
              </option>
            </select>
          </td>
          <td>
            <div class="flex items-center">
              <input
                class="text-right text-xs w-4/6 mx-auto border-none focus:outline-none"
                v-if="inputField.min"
                :value="inputField.min + '  -'"
                readonly="readonly"
              />
              <input
                type="text"
                v-model="inputField.rmd_weight"
                @change="itemChange(inputField)"
                class="text-xs p-1 text-center border-none focus:outline-none"
                :disabled="!approveStat"
              />
            </div>
          </td>

          <td>
            <select
              v-model="inputField.unit"
              class="w-full text-xs p-1 border-none"
              :disabled="!approveStat"
              @change="itemChange(inputField, true)"
            >
              <option v-for="(i, index) in inputField.typeunit" :key="index">
                {{ i }}
              </option>
            </select>
          </td>

          <td>
            <input
              type="text"
              v-model="inputField.price_unit"
              @change="itemChange(inputField)"
              class="p-1 text-sm border-none text-center"
              :disabled="!approveStat"
            />
          </td>
          <td class="bg-gray-50 text-center">
            <v-num
              #="{ number }"
              :value="inputField.rmd_weight * inputField.amount || 0"
            >
              {{ number }}
            </v-num>
          </td>
          <td class="bg-gray-50 text-center">
            <v-num #="{ number }" :value="inputField.cal_price || 0">
              {{ number }}
            </v-num>
          </td>
          <td>
            <svg
              version="1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              enable-background="new 0 0 48 48"
              class="mx-1 w-5 h-5"
              v-show="!sys.loading"
              v-if="this.List.length == 0 || approveStat"
              @click="addFG(inputField)"
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

        <!-- INPUT AREA -->
      </tbody>
      <!-- <InputItem  /> -->
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
import InputItem from "./InputItem.vue";
import LoadingSpinner from "./LoadingSpinner.vue";
import Toggle from "./Toggle.vue";

export default {
  components: { InputItemText, LoadingSpinner, Toggle, InputItem },
  data() {
    return {
      sys,
      auth,
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
        retail: [
          { t: "R1", text: "R1:สดรับเอง" },
          { t: "R2", text: "R2:สดส่ง" },
          { t: "R3", text: "R3:เงินเชื่อ" },
        ],
        Wholesale: [
          { t: "T1", text: "T1:100 ตัน" },
          { t: "W0", text: "W0:ยกรถ" },
          { t: "W1", text: "W1:คละไซด์" },
          { t: "W2", text: "W2:ยกมัด" },
          { t: "W3", text: "W3:ปลีก" },
        ],
      },
      type_unit: ["PC", "KG", "TRP"],
      tprice: [],
      inputField: {},
    };
  },
  props: ["statusApp", "mat"],

  computed: {
    saleType() {
      const scode = localStorage.getItem("tempqt").substring(3, 4);
      if (["X", "L", "R"].includes(scode)) {
        // console.log(this.type.retail);
        return this.type.retail;
      }
      // console.log(this.type.Wholesale);
      return this.type.Wholesale;
    },
    approveStat() {
      // console.log(order.status);
      if (order.status == "TEMP" || order.status == "D") return true;
    },

    validateAdd() {
      if (this.approveStat && order.list.length < 1) return;
    },
    List() {
      this.order.list.map(async (item) => {
        item.typeunit = ["PC", "KG", "EA", "LE", "ROL"];
        item.loading = false;
        if (item.REMARK) {
          item.show = true;
        }

        if (item.min == null || item.min == 0) {
          item.min = "";
        }

        const payloadi = {
          VKORG: 1000,
          MATNR: item.rmd_mat,
          KONDA: item.ptype,
        };
        // const alluom = await FgService.getUOM(payloadi);
        // let List_UOM = [];
        // if (alluom.data[0]) {
        //   alluom.data.map((x) => {
        //     List_UOM.push(x.KMEIN);
        //   });
        //   item.typeunit = List_UOM;
        // }
      });
      // console.log("DATA ORDER::", this.order.list);
      return this.order.list;
    },
  },

  async created() {
    const SaleCharacter = localStorage.getItem("tempqt").substring(3, 4);
    let pickQT = "";
    if (this.mat) {
      const lqt = await OrderService.getLastQT(auth.user_id);
      // console.log("lqt", lqt.data);
      if (lqt.data[0]) {
        pickQT = await lqt.data[0].qt;
      } else {
        pickQT = await auth.temp_qt;
      }

      let st = "T1";
      const rlx = ["X", "L", "R"];
      if (rlx.includes(SaleCharacter)) {
        st = "R1";
      }

      const prepush = await FgService.get(this.mat);
      // console.log("prepush", prepush);
      const payload = {
        VKORG: 1000,
        MATNR: this.mat,
        KONDA: st,
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
        ptype: st,
        amount: pre_amount,
        unit: "PC",
        price_unit: pre_priceunit,
        cal_price: pre_calprice,
        qt: pickQT,
        bundle: prepush.data[0].bundle,
      };
      // console.log(stock_payload);
      await FgService.insert(stock_payload);
      const testii = await FgService.items(pickQT);
      order.list = await testii.data;

      this.$router.replace({});
    }
  },

  methods: {
    async selectItem(item) {
      this.setLoading(true);
      const r_price = ["X", "R", "L"];
      const saleChannel = r_price.includes(
        localStorage.getItem("tempqt").substring(3, 4)
      )
        ? "R1"
        : "T1";
      document.getElementsByClassName(
        "simple-typeahead-list"
      )[0].style.visibility = "hidden";
      // console.log(item);
      this.data.selection = item;
      item.rmd_weight = item.max > 0 ? item.max : item.stdweight;
      item.min = item.min == 0.0 ? 0 : item.min;
      item.amount = 1;
      item.ptype = saleChannel;
      item.unit = "PC";
      item.typeunit = ["PC", "KG", "EA", "LE", "ROL"];
      const payloadi = {
        VKORG: 1000,
        MATNR: item.rmd_mat,
        KONDA: item.ptype,
      };
      const alluom = await FgService.getUOM(payloadi);
      let UOM_LIST = [];
      if (alluom.data[0]) {
        alluom.data.map((x) => {
          UOM_LIST.push(x.KMEIN);
        });

        item.typeunit = UOM_LIST;
      }
      item = await this.getPriceMaster(item);
      // console.log("ITEM", item);
      this.inputField = await this.calItem(item);

      this.setLoading(false);
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
    toggle(id) {
      this.order.list.map((x) => {
        if (x.id == id) {
          x.show = !x.show;
        }
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

    itemChange: debounce(async function (items, isUnit) {
      //ถ้าไม่มี mat ให้ใส่ข้อมูลนี้
      this.setLoading(true);
      if (!items.rmd_mat) {
        items.rmd_mat = " ";
        if (this.data.selection == null && !items.created_at) {
          //ในช่อง input ล่างสุด
        }
      }
      const checktype = {
        VKORG: 1000,
        MATNR: items.rmd_mat,
        KONDA: items.ptype,
      };

      //เลือกเอา
      // if (this.data.selection !== null) {
      items.loading = await true;
      // if (this.data.selection !== null){}
      const alluom = await FgService.getUOM(checktype);
      let UOM_LIST = [];
      if (alluom.data[0]) {
        alluom.data.map((x) => {
          UOM_LIST.push(x.KMEIN);
        });

        items.typeunit = UOM_LIST;
      } else {
        items.typeunit = this.type_unit;
        // items.unit = "PC";
      }

      if (isUnit) {
        items = await this.getPriceMaster(items);
      }
      items = await this.calItem(items);

      await this.setOrder(items);
      await this.setLoading(false);
      items.loading = await false;
    }, 800),
    async calItem(items) {
      if (items.unit === "KG") {
        items.cal_price = items.price_unit * (items.amount * items.rmd_weight);
      } else {
        items.cal_price = items.price_unit * items.amount;
      }
      // console.log("cal price::", items.cal_price);
      return await items;
    },
    async setOrder(item) {
      this.order.list.map((x) => {
        if (x.id == item.id) {
          x = item;
        }
      });
      if (item.rmd_mat == " ") {
        item.rmd_mat = null;
      }
      // console.log("updated : ", item);
      await OrderService.update(item);
    },
    async getPriceMaster(items) {
      const payload = {
        VKORG: 1000,
        MATNR: items.rmd_mat,
        KONDA: items.ptype,
        KMEIN: items.unit,
      };

      const price = await FgService.getPrice(payload);

      if (price.data[0]) {
        items.price_unit = price.data[0].KBETR;
      } else {
        items.price_unit = 1;
      }

      return items;
    },
    async addFG(items) {
      if (items.rmd_mat == null) {
        items.rmd_size = this.data.input;
      }
      (items.qt = auth.temp_qt), await FgService.insert(items);
      const new_order = await FgService.items(auth.temp_qt);

      this.order.list = await new_order.data;

      if (this.order.list.length !== 0) {
        this.table_showlist = "Y";
      }

      this.data.input = {};
      this.inputField = {};

      this.$refs["typeahead"].$data.input = "";
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
    async deleteAll(qt) {
      if (confirm("Clear ข้อมูลทั้งหมดใช่หรือไม่?")) {
        const delall = await OrderService.delall({ qt: qt });
        if (delall.status == 200) {
          this.order.list = [];
        }
      }
    },

    setLoading(load) {
      this.sys.loading = load;
    },
    setiLoading(load) {
      this.sys.itemLoading = load;
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

<style scoped>
select {
  padding-right: 25%;
  word-wrap: inherit;
}

input {
  @apply w-full;
}
th {
  @apply font-light border border-slate-200 text-xs md:text-sm;
}
td {
  @apply w-1/12 text-xs md:text-sm border border-slate-200;
}
.bundle {
  font-size: 0.75rem;
}
</style>
