<template>
  <div class="container">
    <table class="table-fix w-full">
      <thead class="w-full">
        <tr class="w-full mb-4">
          <th
            class="font-light border border-slate-200 w-1/12 text-xs md:text-sm"
          >
            ลำดับ
          </th>
          <th
            class="font-light border border-slate-200 w-4/12 text-xs md:text-sm"
          >
            รายการสินค้า
          </th>
          <th
            class="font-light border border-slate-200 w-1/12 text-xs md:text-sm"
          >
            น้ำหนักหน่วย +/-
          </th>
          <th
            class="font-light border border-slate-200 w-1/12 text-xs md:text-sm"
          >
            จำนวนหน่วย
          </th>
          <th
            class="font-light border border-slate-200 w-2/12 text-xs md:text-sm"
          >
            ราคา
          </th>
          <th
            class="font-light border border-slate-200 w-1/12 text-xs md:text-sm"
          >
            ราคาต่อหน่วยก่อน VAT 7%
          </th>
          <th
            class="font-light border border-slate-200 w-1/12 text-xs md:text-sm"
          >
            จำนวนเงิน
          </th>
          <th class="w-1/12">
            <svg
              v-if="!approveStat"
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 128 128"
              @click="deleteAll"
              class="w-5 h-5"
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
        <tr v-for="(items, index) in List" :key="index" class="full mb-4">
          <td
            class="py-1 w-1/12 text-center text-xs md:text-sm border border-slate-200"
          >
            <input
              type="text"
              :value="index + 1"
              class="w-5/6 text-xs p-1 text-center border-none"
              disabled
            />
          </td>
          <td
            class="py-1 w-4/12 text-center text-xs md:text-sm border border-slate-200"
          >
            <input
              type="text"
              v-model="items.rmd_size"
              class="w-5/6 text-xs p-1 text-center border-none"
              :disabled="approveStat"
              @input="changeUpdate(items.id)"
            />
          </td>
          <td
            class="py-1 w-1/12 text-center text-xs md:text-sm border border-slate-200"
          >
            <input
              type="text"
              v-model="items.rmd_weight"
              class="w-5/6 text-xs p-1 text-center border-none focus:outline-none"
              :disabled="approveStat"
              @input="changeUpdate(items.id)"
            />
          </td>
          <td
            class="py-1 w-1/12 text-center text-xs md:text-sm border border-slate-200"
          >
            <input
              type="text"
              v-model="items.amount"
              @keyup="edit(index, items.amount, items.price_unit, true)"
              class="w-5/6 text-xs p-1 text-center border-none"
              :disabled="approveStat"
              @input="changeUpdate(items.id)"
            />
          </td>
          <td
            class="py-1 w-1/12 text-center text-xs md:text-sm border border-slate-200"
          >
            <select
              v-model="items.ptype"
              @change="PriceType(items.ptype, index, false)"
              class="text-xs p-1 text-center w-5/6 border-none"
              :disabled="approveStat"
              @input="changeUpdate(items.id)"
            >
              <option v-for="(i, index) in this.tprice" :key="index">
                {{ i }}
              </option>
            </select>
          </td>
          <td
            class="py-1 w-1/12 text-center text-xs md:text-sm border border-slate-200"
          >
            <input
              type="text"
              v-model="items.price_unit"
              @keyup="edit(index, items.amount, items.price_unit, true)"
              class="w-5/6 text-xs p-1 text-center border-none"
              :disabled="approveStat"
              @input="changeUpdate(items.id)"
            />
          </td>
          <td
            class="py-1 w-1/12 text-center text-xs md:text-sm border border-slate-200"
          >
            <input
              type="text"
              v-model="items.cal_price"
              class="w-5/6 text-xs p-1 text-center border-none"
              disabled
            />
          </td>
          <td class="py-1 w-1/12 text-center">
            <svg
              v-if="!approveStat"
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              fill="red"
              @click="deletes(index, items.id)"
              class="w-5 h-5"
            >
              <title>Remove</title>
              <path
                d="M472.22,164.65A235.29,235.29,0,0,0,347.35,39.78a235.37,235.37,0,0,0-182.7,0A235.29,235.29,0,0,0,39.78,164.65a235.37,235.37,0,0,0,0,182.7A235.29,235.29,0,0,0,164.65,472.22a235.37,235.37,0,0,0,182.7,0A235.29,235.29,0,0,0,472.22,347.35a235.37,235.37,0,0,0,0-182.7Zm-39.3,166.08A192.7,192.7,0,1,1,448,256,191.39,191.39,0,0,1,432.92,330.73Z"
              />
              <path
                d="M341.33,234.67H170.67a21.33,21.33,0,1,0,0,42.66H341.33a21.33,21.33,0,1,0,0-42.66Z"
              />
            </svg>
          </td>
        </tr>
      </tbody>
      <tbody class="bg-grey-light w-full" v-if="!approveStat">
        <tr class="full mb-4">
          <td class="py-1 w-1/12 text-center">
            <input
              type="text"
              class="w-5/6 text-xs p-1 text-center"
              :value="this.order.list.length + 1"
              disabled
            />
          </td>
          <td class="py-1 w-4/12 text-center">
            <vue3-simple-typeahead
              id="typeahead_id"
              :placeholder="options.placeholder"
              :items="fg.items"
              @selectItem="selectItem"
              @onInput="onInput"
              @onBlur="onBlur"
              :minInputLength="1"
              :itemProjection="
                (fg) => {
                  return fg.rmd_size + ' - ' + fg.rmd_mat;
                }
              "
            >
            </vue3-simple-typeahead>
          </td>
          <td class="py-1 w-1/12 text-center">
            <input
              type="text"
              class="w-5/6 text-xs p-1 text-center"
              v-model="inputField.rmd_weight"
            />
          </td>
          <td class="py-1 w-1/12 text-center text-xs md:text-sm">
            <input
              type="text"
              class="w-5/6 text-xs p-1 text-center"
              v-model="inputField.amount"
              @keyup="
                edit(index, inputField.amount, inputField.price_unit, false)
              "
            />
          </td>
          <td class="py-1 w-1/12 text-center">
            <select
              v-model="selectedType"
              @change="PriceType(selectedType, this.x, true)"
              class="text-xs p-1 text-center w-5/6"
            >
              <option v-for="(i, index) in this.tprice" :key="index">
                {{ i }}
              </option>
            </select>
          </td>
          <td class="py-1 w-1/12 text-center text-xs md:text-sm">
            <input
              type="text"
              class="w-5/6 text-xs p-1 text-center"
              v-model="inputField.price_unit"
              @keyup="
                edit(index, inputField.amount, inputField.price_unit, false)
              "
            />
          </td>
          <td class="py-1 w-1/12 text-center text-xs md:text-sm">
            <input
              type="text"
              class="w-5/6 text-xs p-1 text-center"
              v-model="inputField.cal_price"
              disabled
            />
          </td>
          <td class="py-1 w-1/12">
            <svg
              version="1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              enable-background="new 0 0 48 48"
              class="w-5 h-5"
              v-if="(this.List.length == 0 || !approveStat) && !chkrepeat"
              @click="enter"
            >
              <circle fill="#4CAF50" cx="24" cy="24" r="21" />
              <g fill="#fff">
                <rect x="21" y="14" width="6" height="20" />
                <rect x="14" y="21" width="20" height="6" />
              </g>
            </svg>
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
import UserService from "../services/UserService.js";
import FgService from "../services/FgService.js";
import OrderService from "../services/OrderService.js";

export default {
  data() {
    return {
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
        retail: ["R1:ราคาสดรับเอง", "R2:ราคาสดส่ง", "R3:ราคาเงินเชื่อ"],
        Wholesale: [
          "T1:100 ตัน",
          "W0:ราคายกรถ",
          "W1:ราคาคละไซด์",
          "W2:ราคายกมัด",
          "W3:ราคาปลีก",
        ],
      },
      tprice: [],
      inputField: {
        rmd_mat: null,
        rmd_size: null,
        rmd_weight: null,
        cal_price: 0,
        amount: 1,
        price_unit: 1,
      },

      chkrepeat: false,

      selectedType: null,
    };
  },
  props: ["statusApp", "mat"],
  computed: {
    approveStat() {
      return this.statusApp;
    },
    // validateSave() {
    //   if (this.approveStat) return;
    // },
    validateAdd() {
      if (this.approveStat && order.list.length < 1) return;
    },
    List() {
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
      console.log("pushMat");
      return this.fg.items.filter((f) => {
        return f.rmd_mat == this.mat;
      });
    },
  },

  async created() {
    let result = await UserService.fgList();

    fg.items = result.data;

    if (this.mat) {
      const prepush = await this.pushMat[0];
      console.log(prepush);
      const payload = {
        VKORG: 1000,
        MATNR: this.mat,
        KONDA: "R1",
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
        rmd_mat: prepush.rmd_mat,
        rmd_size: prepush.rmd_size,
        rmd_weight: prepush.rmd_stdweight,
        ptype: "R1:ราคาสดรับเอง",
        amount: pre_amount,
        unit: "PC",
        price_unit: pre_priceunit,
        cal_price: pre_calprice,
        qt: auth.temp_qt,
      };
      // console.log(order.list);

      //หorder.list.push(stock_payload);

      order.list = this.List;

      FgService.insert(stock_payload);
      const testii = await FgService.items(auth.temp_qt);
      order.list = testii.data;
      this.$router.replace({});
    }

    if ((auth.saleOrg = 1000)) {
      this.tprice = this.type.retail;
      this.selectedType = this.type.retail[1];
    } else if ((state.user.saleOrg = 2000)) {
      this.tprice = this.type.Wholesale;
      this.selectedType = this.type.Wholesale[0];
    }

    this.tprice.map((x) => {
      order.list.map((y) => {
        const t_type = x.includes(y.ptype);
        if (t_type) {
          y.ptype = x;
        }
      });
    });
  },
  mounted() {
    // if (this.mat) {
    //   console.log(this.pushMat);
    // }
  },
  methods: {
    changeUpdate: debounce(async function (ids) {
      const payload = order.list.filter((data) => data.id == ids);
      let send_ptype = payload[0].ptype.split(":");

      const data_payload = {
        id: payload[0].id,
        rmd_mat: payload[0].rmd_mat,
        rmd_size: payload[0].rmd_size,
        rmd_weight: payload[0].rmd_weight,
        ptype: send_ptype[0],
        amount: payload[0].amount,
        unit: payload[0].unit,
        price_unit: this.delcomma(payload[0].price_unit),
        cal_price: this.delcomma(payload[0].cal_price),
      };
      const updateitem = await OrderService.update(data_payload);
    }, 800),

    async PriceType(type, i, isInput) {
      // console.log("isInput", isInput, "mat", this.data.selection.rmd_mat);
      let typ = type.split(":");

      let new_matnr = "";
      if (
        (isInput && order.list.length !== 0 && i !== "input") ||
        (order.list.length !== 0 && i !== "input")
      ) {
        new_matnr = order.list[i].rmd_mat;
      } else {
        // console.log(i);
        new_matnr = this.data.selection.rmd_mat;
      }
      const payload = {
        VKORG: 1000,
        MATNR: new_matnr,
        KONDA: typ[0],
        KMEIN: "PC",
      };
      console.log(payload);
      const price = await FgService.getPrice(payload);

      if (price.data[0]) {
        if (isInput) {
          this.inputField.price_unit = price.data[0].KBETR;
          this.inputField.price_unit = this.addComma(
            this.inputField.price_unit
          );
          this.inputField.cal_price = parseFloat(
            this.inputField.amount * price.data[0].KBETR
          ).toFixed(2);
          this.inputField.cal_price = this.addComma(this.inputField.cal_price);
        } else {
          order.list[i].price_unit = await price.data[0].KBETR;
          order.list[i].price_unit = this.addComma(order.list[i].price_unit);
          order.list[i].cal_price = parseFloat(
            order.list[i].amount * price.data[0].KBETR
          ).toFixed(2);
          order.list[i].cal_price = this.addComma(order.list[i].cal_price);
        }
      } else {
        console.log(false);
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
        KMEIN: this.data.selection.MEINS,
      };
      console.log(payload);
      const price = await FgService.getPrice(payload);

      this.inputField.rmd_mat = item.rmd_mat;
      this.inputField.rmd_weight = this.data.selection.rmd_stdweight;
      this.inputField.rmd_size = this.data.selection.rmd_size;
      this.inputField.amount = 1;
      if (price.data[0]) {
        this.inputField.price_unit = this.addComma(price.data[0].KBETR);
        let a = parseFloat(
          this.inputField.amount * price.data[0].KBETR
        ).toFixed(2);
        this.inputField.cal_price = this.addComma(a);
      } else {
        this.inputField.price_unit = 1;
        this.inputField.cal_price = 1;
      }
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
          unit: "PC",
        });

        const stock_payload = {
          rmd_mat: this.inputField.rmd_mat,
          rmd_size: this.inputField.rmd_size,
          rmd_weight: this.inputField.rmd_weight,
          ptype: this.selectedType,
          amount: this.inputField.amount,
          unit: "PC",
          price_unit: this.delcomma(this.inputField.price_unit) || 1,
          cal_price: this.delcomma(this.inputField.cal_price) || 1,
          qt: auth.temp_qt,
        };

        await FgService.insert(stock_payload);
        const new_order = await FgService.items(auth.temp_qt);

        order.list = new_order.data;
        this.manage_type();
        if (this.order.list.length !== 0) {
          this.table_showlist = "Y";
        }

        this.data.input = {};
        this.inputField = {};
      } else {
        alert("กรุณาเลือกสินค้า");
      }
    },
    edit(index, unit, vat, inputE) {
      if (vat.length > 3) {
        vat = this.delcomma(vat);
      }

      if (this.order.list.length > 0 && inputE) {
        this.order.list.filter((data, i) => {
          if (i == index) {
            if (vat.length > 3) {
              data.price_unit = this.addComma(vat);
            }

            data.cal_price = parseFloat(unit * vat).toFixed(2);
            data.cal_price = this.addComma(data.cal_price);
          }
        });
      } else {
        this.inputField.cal_price = parseFloat(unit * vat).toFixed(2);
        this.inputField.cal_price = this.addComma(this.inputField.cal_price);
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
    manage_type() {
      this.tprice.map((x) => {
        order.list.map((y) => {
          const t_type = x.includes(y.ptype);
          if (t_type) {
            y.ptype = x;
          }
          y.cal_price = y.cal_price.toString();
          y.price_unit = y.price_unit.toString();
          if (y.cal_price.length > 3) {
            y.cal_price = this.addComma(y.cal_price);
          }
          if (y.price_unit.length > 3) {
            y.price_unit = this.addComma(y.price_unit);
          }
        });
      });
    },
  },
};
</script>
<style>
#typeahead_id {
  font-size: 11px;
  width: 80%;
  padding-top: 2px;
  padding-bottom: 2px;
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
