<template>
  <div
    id="popup-modal"
    tabindex="-1"
    class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full bg-slate-400 bg-opacity-30"
    v-show="value"
  >
    <div class="relative mx-auto p-4 w-full max-w-md h-full md:h-auto">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <button
          @click="close(false)"
          type="button"
          class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
          data-modal-toggle="popup-modal"
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

        <div class="p-6 text-center">
          <svg
            class="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            {{
              alreadyRef
                ? "QT Ref เป็น SO แล้ว " + soData[0].VBELN
                : "เลือกเหตุผลที่ขอปลดล็อค/ถอยอนุมัติ"
            }}
          </h3>
          <div class="mb-4">
            <select
              v-show="!alreadyRef"
              v-model="selected"
              class="w-full"
              name=""
              id=""
            >
              <option v-for="item in remark" :key="item.id">
                {{ item }}
              </option>
            </select>
          </div>

          <button
            v-show="!alreadyRef"
            @click="postUnapp"
            :disabled="selected == null"
            data-modal-toggle="popup-modal"
            type="button"
            :class="
              selected == null
                ? 'cursor-not-allowed bg-gray-300'
                : ' hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 '
            "
            class="text-white bg-red-600 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
          >
            <span v-if="loading"><LoadingSpinner /></span>
            <span v-else>ตกลง</span>
          </button>
          <button
            @click="close(false)"
            data-modal-toggle="popup-modal"
            type="button"
            class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
          >
            {{ alreadyRef ? "ปิด" : "ยกเลิก" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoadingSpinner from "./LoadingSpinner.vue";
import OrderService from "../services/OrderService.js";
export default {
  data() {
    return {
      loading: false,
      alreadyRef: false,
      soData: null,
      selected: null,
      remark: ["แก้ราคา", "แก้จำนวน", "แก้น้ำหนัก", "เปลี่ยนไซส์"],
    };
  },
  props: {
    value: {
      required: true,
    },
    propsQt: null,
    propsEmp: null,
  },
  async created() {
    this.initFetch();
  },

  methods: {
    async initFetch() {
      this.loading = true;
      const isref = await OrderService.isRef({
        qt: this.propsQt ? this.propsQt.replaceAll("-", "") : this.propsQt,
      });
      this.soData = isref.data;
      this.alreadyRef = this.soData.length > 0 ? true : false;
      this.loading = false;
    },
    async postUnapp() {
      this.loading = true;
      this.initFetch();
      if (!this.alreadyRef) {
        await OrderService.unApp({
          qt: this.propsQt,
          remark: this.selected,
          emp_code: this.propsEmp,
        });

        this.close(true);
        console.log();
      }
      this.loading = false;
    },
    close(p) {
      if (p) {
        this.$emit("closeModal", !this.value);
      } else {
        this.$emit("closeX", !this.value);
      }
    },
  },

  components: { LoadingSpinner },
};
</script>

<style></style>
