<template>
  <div
    id="defaultModal"
    tabindex="-1"
    aria-hidden="true"
    class="overflow-y-auto overflow-x-hidden fixed mx-auto top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal h-full bg-slate-400 bg-opacity-30"
    v-show="value"
  >
    <div class="relative p-4 w-full max-w-2xl h-full md:h-auto mx-auto">
      <!-- Modal content -->
      <div class="w-fit relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div
          class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600"
        >
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            เลือกพนักงานขายเพื่อสร้าง QT ใหม่
          </h3>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-toggle="defaultModal"
            @click="close()"
          >
            <svg
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <!-- Modal body -->
        <div class="p-6 space-y-2">
          <div
            class="grid font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <button
              v-for="(item, index) in this.sale_list"
              :key="index"
              type="button"
              class="text-left px-4 py-2 font-medium border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
              @click="updateSale(item.sale_name, item.emp_code, item.sale_code)"
            >
              {{ item.sale_team }} - {{ item.sale_code }} - {{ item.sale_name }}
            </button>
          </div>
        </div>
        <!-- Modal footer -->
        <div
          class="flex justify-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600"
        >
          <button
            @click="this.checksale ? submit() : ''"
            data-modal-toggle="defaultModal"
            type="button"
            :class="
              this.checksale
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
import UserService from "@/services/UserService";
import { auth } from "../state/user";

export default {
  name: "Modal",
  data() {
    return {
      auth,
      sale_list: [],
      newQT: "XX-XXX-XXXXXX",
      newSale: "",
      empnow: "",
      codenow: "",
      checksale: false,
    };
  },
  props: {
    value: {
      required: true,
    },
  },
  created() {
    this.getSale();
  },
  methods: {
    close() {
      this.checksale = false;
      this.$emit("closeModal", !this.value);
    },
    async getSale() {
      const sale = await UserService.showSale({ emp_code: auth.user_id });
      this.sale_list = sale.data;
    },

    async updateSale(salename, emp, salecode) {
      this.checksale = true;
      const empsale = await UserService.getEMP({
        sale_name: salename,
      });
      this.empnow = empsale.data[0].PRS_NO;
      this.codenow = salecode;
      this.newSale = salename;

      // const data_cus = await CusService.postCus({ KUNNR: order.kunnr });
    },
    async submit() {
      //หาข้อมูลเซลล์คนใหม่ที่เลือก
      const new_sale = await UserService.sale(this.empnow);
      auth.data_sale = new_sale.data;

      await UserService.activeAd({
        emp_code: auth.user_id,
        sale_code: auth.data_sale.sale_code,
      });

      await UserService.newQT_ad({
        empcode: auth.user_id,
      });

      const upsale = await UserService.selectSale({
        sale_code: this.codenow,
        emp_code: this.empnow,
      });

      this.newQT = upsale.data[0].qt;

      //หาข้อมูลเซลล์คนใหม่ที่เลือก
      // const new_sale = await UserService.sale(this.empnow);
      // auth.data_sale = new_sale.data;
      auth.temp_qt = this.newQT;
      localStorage.setItem("tempqt", auth.temp_qt);

      this.close();
      this.$emit("newQ");
    },
    async setQT() {
      const new_sale = await UserService.sale(this.empnow);
      auth.temp_qt = this.newQT;
      auth.data_sale = new_sale.data;
      localStorage.setItem("tempqt", auth.temp_qt);
    },
  },
};
</script>

<style lang="css" scoped></style>
