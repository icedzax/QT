<template>
  <ModalUpload
    :value="modalOpen"
    :QT="this.clickQT"
    :filelist="this.datalist"
    @closeModal="closey"
    @fetchList="loadFile"
  />

  <div
    id="defaultModal"
    tabindex="-1"
    aria-hidden="true"
    class="h-modal fixed top-0 right-0 left-0 z-40 mx-auto h-full w-full overflow-y-auto overflow-x-hidden bg-slate-400 bg-opacity-30 md:inset-0"
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
          <button
            type="button"
            class="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-toggle="defaultModal"
            @click="close()"
          >
            <svg
              class="h-5 w-5"
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
        <div class="tab mt-2 w-full justify-center space-y-2 px-6">
          <table class="fixedHeader mx-auto w-full table-auto px-2 text-base">
            <thead>
              <tr class="bg-gray-100">
                <th class="text-left">QT</th>
                <!-- <th class="text-left">SO</th> -->
                <th class="text-left">ลูกค้า</th>
                <th>สถานะ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-show="list.length == 0">
                <td colspan="4" class="text-center">
                  <LoadingSpinner />
                </td>
              </tr>

              <tr
                v-for="(item, index) in list"
                :key="index"
                class="border-b"
                v-show="list.length !== 0"
              >
                <td class="justify-inline flex py-1 text-left">
                  <div
                    @click="openPDF(item.qt)"
                    class="w-2/3 cursor-pointer hover:text-blue-600 hover:underline"
                  >
                    {{ item.qt }}
                  </div>
                  <div>
                    <svg
                      id="Layer_1"
                      data-name="Layer 1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      class="w-5"
                      @click="minimodalOpen(item.qt)"
                    >
                      <title>attach file</title>
                      <path
                        d="M12.76,19.94A5.49,5.49,0,0,1,5,12.18l8.76-8.75A3.72,3.72,0,0,1,20.1,6.06,3.68,3.68,0,0,1,19,8.68L10.67,17A1.36,1.36,0,0,1,8.75,15.1l8.34-8.34L15.67,5.35,7.33,13.69a3.36,3.36,0,0,0,4.75,4.75l8.35-8.34A5.72,5.72,0,0,0,12.34,2L3.58,10.77A7.49,7.49,0,0,0,14.17,21.36l7.92-7.93L20.68,12Z"
                        id="id_101"
                        style="fill: rgb(19, 109, 115)"
                      ></path>
                    </svg>
                  </div>
                </td>
                <!-- <td>{{ item.VBELN }}</td> -->
                <td>
                  {{ item.cname }}

                  <span
                    v-if="item.soCheckBy"
                    class="bg-green-50 text-xs font-semibold text-green-600"
                    >{{ item.soCheckBy }} ✅
                  </span>
                  <span
                    v-if="item.soApproveBy"
                    class="bg-blue-50 text-xs font-semibold text-blue-600"
                    >{{ item.soApproveBy }} ✅
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
                        :disabled="item.emp_code == auth.user_id"
                        :class="
                          item.emp_code == auth.user_id
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
import ModalUpload from "./ModalUpload.vue";
import { auth } from "../state/user";
import axios from "axios";
const urlapi_upload = "https://hook.zubbsteel.com/line-ci/QT/api.php";

export default {
  name: "ModalSO",
  data() {
    return {
      auth,
      file: "",
      filename: "",
      item: {
        image: null,
        imageUrl: null,
        fileUrl: null,
      },
      clickQT: "",
      modalOpen: false,
      datalist: [],
    };
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
    async minimodalOpen(QT) {
      this.clickQT = QT;
      this.modalOpen = true;
      const dataFile = await OrderService.loadFile({ QT: this.clickQT });
      this.datalist = dataFile.data;
    },
    openPDF(qt = "") {
      window.open(
        `https://report.zubbsteel.com/tcpdf/pdf/ZORDER_A5.php?ref=` + qt
      );
    },
    closey() {
      this.modalOpen = !this.modalOpen;
    },
    close() {
      this.$emit("close", !this.value);
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

    onChangeFileUpload(e) {
      const file = e.target.files[0];
      this.image = file;
      this.filename = file.name;
      this.item.fileUrl = URL.createObjectURL(file);
      this.file = this.$refs.file[0].files;

      // this.fnChangename();
      // let type = this.file.name;
      // type = type.split(".");
      // let nametype = type.length - 1;
      // this.arrayFile.push({
      //   name: this.file.name,
      //   sname: this.nowIMG,
      //   type: type[nametype],
      // });
      this.uploadfile();
    },
    async uploadfile() {
      let formData = new FormData();
      let type = this.file[0].name;
      type = type.split(".");
      let nametype = type.length - 1;
      let name = this.clickQT + "_" + type[0];
      if (this.file.size > 10000000) {
        alert("ไฟล์ใหญ่เกินไป แนบได้ไม่เกิน 10 MB");
      } else {
        formData.append("file", this.file[0], name + "." + type[nametype]);
        console.log(formData);

        axios.post(urlapi_upload, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        // alert("Upload Success :)");
      }
    },
    async loadFile(QT) {
      await this.minimodalOpen(QT);
    },
  },

  components: { PdfIcon, LoadingSpinner, ModalUpload },
};
</script>

<style lang="css" scoped>
.tab {
  overflow: auto;
  height: 400px;
}
th {
  top: 0;
  position: sticky;
  background-color: white;
}
</style>
