<template>
  <div
    id="defaultModal"
    tabindex="-1"
    aria-hidden="true"
    class="overflow-y-auto overflow-x-hidden fixed mx-auto top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal h-full bg-slate-400 bg-opacity-30"
    v-show="value"
  >
    <div
      class="relative p-4 w-full max-w-2xl h-full md:h-auto mx-auto flex justify-center"
    >
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 w-2/3">
        <!-- Modal header -->
        <div
          class="flex justify-center items-start p-4 rounded-t border-b dark:border-gray-600"
        >
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            ใส่รหัสลูกค้าตั้งใหม่
          </h3>
        </div>
        <!-- Modal body -->
        <div class="p-6 space-y-2 flex justify-center">
          <div
            class="w-2/3 grid font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <input type="text" v-model="ip_code" />
          </div>
        </div>
        <!-- Modal footer -->
        <div
          class="flex justify-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600"
        >
          <button
            @click="this.ip_code ? submit() : ''"
            data-modal-toggle="defaultModal"
            type="button"
            :class="
              this.ip_code !== ''
                ? 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                : 'cursor-default text-white bg-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800'
            "
          >
            ยืนยัน
          </button>
          <button
            @click="close"
            data-modal-toggle="defaultModal"
            type="button"
            class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
          >
            ยกเลิก
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CusService from "@/services/CusService";
import { auth } from "../state/user";
import { cus } from "../state/cus";

export default {
  name: "Modal2",
  data() {
    return {
      auth,
      cus,
      ip_code: "",
    };
  },
  props: {
    value: {
      required: true,
    },
  },
  created() {},

  methods: {
    close() {
      this.ip_code = "";
      this.$emit("closeModal", !this.value);
    },
    async submit() {
      await CusService.searchCUSbycode({ kunnr: this.ip_code });
      const result = await CusService.search({ cus_name: this.ip_code });
      if (result.data[0]) {
        let vat_value = 0;
        if (cus.vat == "0.07") {
          vat_value = 1;
        }
        await CusService.setCus({
          KUNNR: result.data[0].KUNNR,
          LAND1: result.data[0].LAND1,
          CNAME: result.data[0].CNAME,
          TELNU: result.data[0].TELNU,
          TELFX: result.data[0].TELFX,
          FAXNU: result.data[0].FAXNU,
          TAXNO: result.data[0].TAXNO,
          EMAIL: result.data[0].EMAIL,
          ADDRS: result.data[0].ADDRS,
          MOBILE: result.data[0].MOBILE,
          CONTACTNAME: result.data[0].CONTACTNAME,
          qt: auth.temp_qt,
          vat: vat_value,
        });
        this.close();
        this.$router.go();
      } else {
        alert("ไม่พบลูกค้ารหัสนี้");
      }
      //cus.data = result.data;
    },
  },
};
</script>

<style lang="css" scoped></style>
