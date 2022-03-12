<template>
  <div class="container">
    <div
      class="grid overflow-hidden grid-cols-4 grid-rows-1 gap-1 text-xs xl:text-sm p-1 xl:p-0"
    >
      <div class="font-semibold">ลูกค้า</div>
      <div class="col-span-3">
        <vue3-simple-typeahead
          v-if="!approveStat"
          id="typeahead_id"
          :placeholder="options.placeholder"
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
        <p v-else>{{ this.showcus }}</p>
      </div>

      <div>
        <p class="font-semibold">ที่อยู่</p>
      </div>
      <div class="col-span-3 rounded">
        <p class="">{{ cusdata.ADDRS }}</p>
      </div>
      <div class="font-semibold">ชื่อผู้ติดต่อ</div>
      <div class="col-span-3">{{ cusdata.CONTACTNAME }}</div>
      <div class="font-semibold">เบอร์ติดต่อ</div>
      <div>{{ cusdata.TELNU }}</div>
      <div class="font-semibold">มือถือ</div>
      <div>{{ cusdata.MOBILE }}</div>
      <div class="font-semibold">โทรสาร</div>
      <div>{{ cusdata.FAXNU }}</div>
      <div class="font-semibold">อีเมลล์</div>
      <div>{{ cusdata.EMAIL }}</div>
    </div>
  </div>
</template>
<script>
import { cus } from "../state/cus";
import { debounce } from "lodash";
import { order } from "../state/order";

import CusService from "../services/CusService.js";
export default {
  props: ["customername", "statusApp"],
  data() {
    return {
      customers: [],
      showcus: "",
      cus,
      order,
      options: {
        placeholder: "Customer Name...",
        minInputLength: 1,
      },
      listFiltered: [],
      data: {
        input: "",
        selection: null,
      },
    };
  },
  created() {
    console.log(order.status);
  },
  computed: {
    cusdata() {
      return this.data.selection || "";
    },
    approveStat() {
      return this.statusApp;
    },
    c() {
      return cus.name;
    },
  },
  methods: {
    lookupUser: debounce(async function () {
      const result = await CusService.search({ cus_name: this.data.input });
      this.customers = result.data;
    }, 500),
    selectItem(item) {
      this.data.selection = item;
      CusService.select({ KUNNR: this.data.selection.KUNNR });
      this.showcus = this.data.selection.KUNNR + this.data.selection.CNAME;
      cus.name = this.showcus;
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
  font-size: 11px;
  width: 80%;
  border-radius: 5px;
  padding-top: 2px;
  padding-bottom: 2px;
}
</style>
