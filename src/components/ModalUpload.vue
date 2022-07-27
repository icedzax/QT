<template>
  <div
    id="defaultModal"
    tabindex="-1"
    aria-hidden="true"
    class="overflow-y-auto overflow-x-hidden fixed mx-auto top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal h-full bg-slate-400 bg-opacity-30"
    v-show="value"
  >
    <div class="relative p-4 w-full max-w-2xl h-full md:h-auto mx-auto mt-4">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div
          class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600"
        >
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            File Upload : {{ this.QT }}
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
        <div class="p-6 space-y-2 tab">
          <table class="mx-auto w-full table-auto px-2 text-base">
            <thead>
              <th>ลำดับ</th>
              <th>ชื่อไฟล์แนบ</th>
              <th>อื่นๆ</th>
            </thead>
            <tbody>
              <tr v-show="this.filelist.length == 0">
                <td colspan="3" class="text-red-500 text-center">
                  ยังไม่มีไฟล์แนบ
                </td>
              </tr>
              <tr
                v-for="(item, index) in this.Fileorder"
                :key="index"
                class="text-center hover:bg-gray-200"
              >
                <td>{{ index + 1 }}</td>
                <td
                  class="text-left cursor-pointer hover:underline hover:text-blue-500"
                  @click="download(1, item)"
                >
                  {{ item }}
                </td>
                <td class="flex justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 64 58.67"
                    class="w-4 mt-1"
                    @click="del(item)"
                  >
                    <defs></defs>
                    <title>delete file</title>
                    <g id="Layer_2" data-name="Layer 2">
                      <g id="Layer_1-2" data-name="Layer 1">
                        <path
                          class="cls-2"
                          d="M61.33,5.33H48V2.67A2.66,2.66,0,0,0,45.33,0H18.67A2.66,2.66,0,0,0,16,2.67V5.33H2.67a2.67,2.67,0,0,0,0,5.34H8v40a8,8,0,0,0,8,8H48a8,8,0,0,0,8-8v-40h5.33a2.67,2.67,0,1,0,0-5.34ZM50.67,50.67A2.67,2.67,0,0,1,48,53.33H16a2.67,2.67,0,0,1-2.67-2.66v-40H50.67Z"
                          id="id_101"
                          style="fill: rgb(252, 3, 3)"
                        ></path>
                        <path
                          class="cls-2"
                          d="M24,45.33a2.67,2.67,0,0,0,2.67-2.66V21.33a2.67,2.67,0,0,0-5.34,0V42.67A2.67,2.67,0,0,0,24,45.33Z"
                          id="id_102"
                          style="fill: rgb(3, 3, 3)"
                        ></path>
                        <path
                          class="cls-2"
                          d="M40,45.33a2.67,2.67,0,0,0,2.67-2.66V21.33a2.67,2.67,0,0,0-5.34,0V42.67A2.67,2.67,0,0,0,40,45.33Z"
                          id="id_103"
                          style="fill: rgb(3, 3, 3)"
                        ></path>
                      </g>
                    </g>
                  </svg>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- Modal footer -->
        <div
          class="mb-4 flex justify-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600"
        >
          <input
            type="file"
            id="upload"
            ref="file"
            name=""
            @change="onChangeFileUpload"
            hidden
          />
          <span class="mr-2">เพิ่มไฟล์แนบ</span>
          <label for="upload"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 44.44"
              class="w-10 transition ease-in-out duration-700 hover:-translate-y-1 hover:scale-125"
            >
              <defs></defs>
              <title>Attach File</title>
              <g id="Layer_2" data-name="Layer 2">
                <g id="Layer_1-2" data-name="Layer 1">
                  <path
                    class="cls-1"
                    d="M50.72,10.28a22.19,22.19,0,0,0-39.8,5,14.86,14.86,0,0,0,4,29.19H46.67a17.32,17.32,0,0,0,4-34.16ZM29.33,39.11H14.89a9.52,9.52,0,0,1-1.46-18.94l1.76-.27.43-1.73A16.86,16.86,0,0,1,46.71,14l.63,1.12,1.27.21A11.91,11.91,0,0,1,58.67,27.11a12.1,12.1,0,0,1-1,4.8,12,12,0,0,1-11,7.2h-12V26.86l3,3a2.67,2.67,0,0,0,3.77,0,2.68,2.68,0,0,0,0-3.78l-7.54-7.54a2.76,2.76,0,0,0-3.78,0l-7.54,7.54a2.67,2.67,0,1,0,3.77,3.78l3-3V39.11"
                    id="id_101"
                    style="fill: rgb(79, 93, 219)"
                  ></path>
                </g>
              </g>
            </svg>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OrderService from "@/services/OrderService";
import { auth } from "../state/user";
import axios from "axios";
const urlapi_upload = "https://hook.zubbsteel.com/line-ci/QT/api.php";

export default {
  name: "Modal",
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
      allFile: this.filelist,
    };
  },
  // props: {
  //   value: {
  //     required: true,
  //   },
  // },
  props: ["QT", "value", "filelist"],
  async created() {},
  computed: {
    Fileorder() {
      return this.filelist;
    },
  },
  methods: {
    close() {
      this.$emit("closeModal", !this.value);
    },

    downloadx() {
      const url =
        "https://hook.zubbsteel.com/line-ci/QT/QT-C06-2207051/QT-C06-2207051_Pic_26.jpg";
      window.location.href = url;
    },
    download(url, title) {
      url = "https://hook.zubbsteel.com/line-ci/QT/" + this.QT + "/" + title;
      axios({
        method: "get",
        url,
        responseType: "arraybuffer",
      })
        .then((response) => {
          this.forceFileDownload(response, title);
        })
        .catch(() => console.log("error occured"));
    },
    forceFileDownload(response, title) {
      console.log(title);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", title);
      document.body.appendChild(link);
      link.click();
    },
    onChangeFileUpload(e) {
      const file = e.target.files[0];
      this.file = file;
      this.filename = file.name;
      this.item.fileUrl = URL.createObjectURL(file);

      this.uploadfile();
    },
    async uploadfile() {
      let formData = new FormData();
      let type = this.filename;
      type = type.split(".");
      let nametype = type.length - 1;
      let name = this.QT + "_" + type[0];
      if (this.file.size > 10000000) {
        alert("ไฟล์ใหญ่เกินไป แนบได้ไม่เกิน 10 MB");
      } else {
        formData.append("file", this.file, name + "." + type[nametype]);
        console.log(formData);

        axios.post(urlapi_upload, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        alert("Upload Success :)");
      }
      this.$emit("fetchList", this.QT);
    },
    async del(item) {
      if (confirm("ต้องการลบไฟล์แนบชื่อ " + item + " ใช่หรือไม่?")) {
        await OrderService.del({ filename: item, QT: this.QT });

        this.$emit("fetchList", this.QT);
        alert("Delete file success");
      }
    },
  },
};
</script>

<style lang="css" scoped>
.cls-1 {
  fill: #35353d;
}

.cls-2 {
  fill: #35353d;
}

.tab {
  overflow: auto;
  height: 200px;
}
</style>
