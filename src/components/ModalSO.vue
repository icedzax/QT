<template>
  <div
    id="defaultModal"
    tabindex="-1"
    aria-hidden="true"
    class="h-modal fixed top-0 right-0 left-0 z-50 mx-auto h-full w-full overflow-y-auto overflow-x-hidden bg-slate-400 bg-opacity-30 md:inset-0"
    v-show="value"
  >
    <div
      class="relative mx-auto flex h-full w-full justify-center p-4 md:h-auto"
    >
      <!-- Modal content -->
      <div class="relative w-2/3 rounded-lg bg-white shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div
          class="flex items-start justify-center rounded-t border-b p-4 dark:border-gray-600"
        >
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            รายการตรวจสอบใบสั่งขาย
          </h3>
        </div>
        <!-- Modal body -->
        <div class="w-full justify-center space-y-2 p-6">
          <table class="mx-auto w-full table-auto px-2 text-base">
            <thead>
              <tr class="bg-gray-100">
                <th class="text-left">QT</th>
                <th class="text-left">SO</th>
                <th class="text-left">ลูกค้า</th>
                <th>สถานะ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in list" :key="index" class="border-b">
                <td
                  @click="openPDF(item.qt)"
                  class="cursor-pointer py-1 text-left hover:text-blue-600 hover:underline"
                >
                  {{ item.qt }}
                </td>
                <td>{{ item.VBELN }}</td>
                <td>
                  {{ item.cname }}

                  <span
                    v-if="item.soCheckBy"
                    class="bg-gray-50 text-xs font-semibold text-green-600"
                    >{{ item.soCheckBy }} ✅
                  </span>
                </td>
                <td class="text-center">
                  <div class="flex items-center justify-center">
                    <span><PdfIcon @click="openPDF(item.qt)" /></span>
                    <div class="ml-1" v-if="item.soCheckBy == null">
                      <button
                        v-if="!item.loading"
                        @click="soCheck(item)"
                        class="rounded px-1 text-xs"
                        :class="
                          item.empcode == auth.user_id
                            ? 'disable cursor-not-allowed bg-slate-300 text-slate-500'
                            : ' bg-blue-600  text-white hover:bg-blue-700'
                        "
                      >
                        <span>ยืนยัน</span>
                      </button>
                      <LoadingSpinner v-else class="ml-3" />
                    </div>
                    <span v-else>✅</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- Modal footer -->
        <div
          class="flex justify-center space-x-2 rounded-b border-t border-gray-200 p-6 dark:border-gray-600"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import PdfIcon from "./PdfIcon.vue";
import LoadingSpinner from "./LoadingSpinner.vue";
import OrderService from "@/services/OrderService";
import { auth } from "../state/user";
export default {
  name: "ModalSO",
  data() {
    return { auth };
  },
  props: {
    value: {
      required: true,
    },
    list: {
      Type: Array,
    },
  },
  created() {},
  methods: {
    openPDF(qt = "") {
      window.open(
        `https://report.zubbsteel.com/tcpdf/pdf/ZORDER_A5.php?ref=` + qt
      );
    },
    async soCheck(item) {
      item.loading = true;
      const pay = { user: auth.user_id, qt: item.qt };
      const res = await OrderService.soCheck(pay);

      if (typeof res.data === "object") {
        alert("ถูกยืนยันแล้วโดย " + res.data[0].soCheckBy);
      }
      console.log("item", typeof res.data);

      await this.$emit("onCheck");
      // item.loading = await false;
      setInterval(() => {
        item.loading = false;
      }, 700);
    },
  },

  components: { PdfIcon, LoadingSpinner },
};
</script>

<style lang="css" scoped></style>
