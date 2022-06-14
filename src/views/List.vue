<template>
  <div class="container">
    <span class="flex justify-center text-xl mt-2">รายการใบนำเสนอราคา</span>
    <!-- <div class="p-4">
      <label for="table-search" class="sr-only">Search</label>
      <div class="relative mt-1">
        <div
          class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
        >
          <svg
            class="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
        <input
          type="text"
          id="table-search"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="ค้นหาลูกค้า ..."
        />
      </div>
    </div>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs text-gray-700 uppercase bg-indigo-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">ลูกค้า</th>
            <th scope="col" class="px-6 py-3">ใบเสนอราคาเลขที่</th>
            <th scope="col" class="px-6 py-3">สร้างเมื่อ</th>
            <th scope="col" class="px-6 py-3" colspan="2">สถานะ</th>
            <th scope="col" class="px-6 py-3">
              <span class="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(i, index) in this.AllList"
            :key="index"
            class="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700"
          >
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
            >
              {{ i.CNAME }}
            </th>
            <td class="px-6 py-4">
              <div class="flex justify-start">
                <span
                  @click="goto_qt(i.QT)"
                  class="hover:underline cursor-pointer mr-2"
                >
                  {{ i.QT }}
                </span>
                <svg
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  class="w-5"
                  viewBox="0 0 56 56"
                  style="enable-background: new 0 0 56 56"
                  xml:space="preserve"
                  @click="goto_pdf(i.QT)"
                >
                  <g>
                    <path
                      style="fill: #e9e9e0"
                      d="M36.985,0H7.963C7.155,0,6.5,0.655,6.5,1.926V55c0,0.345,0.655,1,1.463,1h40.074
		c0.808,0,1.463-0.655,1.463-1V12.978c0-0.696-0.093-0.92-0.257-1.085L37.607,0.257C37.442,0.093,37.218,0,36.985,0z"
                    />
                    <polygon
                      style="fill: #d9d7ca"
                      points="37.5,0.151 37.5,12 49.349,12 	"
                    />
                    <path
                      style="fill: #cc4b4c"
                      d="M19.514,33.324L19.514,33.324c-0.348,0-0.682-0.113-0.967-0.326
		c-1.041-0.781-1.181-1.65-1.115-2.242c0.182-1.628,2.195-3.332,5.985-5.068c1.504-3.296,2.935-7.357,3.788-10.75
		c-0.998-2.172-1.968-4.99-1.261-6.643c0.248-0.579,0.557-1.023,1.134-1.215c0.228-0.076,0.804-0.172,1.016-0.172
		c0.504,0,0.947,0.649,1.261,1.049c0.295,0.376,0.964,1.173-0.373,6.802c1.348,2.784,3.258,5.62,5.088,7.562
		c1.311-0.237,2.439-0.358,3.358-0.358c1.566,0,2.515,0.365,2.902,1.117c0.32,0.622,0.189,1.349-0.39,2.16
		c-0.557,0.779-1.325,1.191-2.22,1.191c-1.216,0-2.632-0.768-4.211-2.285c-2.837,0.593-6.15,1.651-8.828,2.822
		c-0.836,1.774-1.637,3.203-2.383,4.251C21.273,32.654,20.389,33.324,19.514,33.324z M22.176,28.198
		c-2.137,1.201-3.008,2.188-3.071,2.744c-0.01,0.092-0.037,0.334,0.431,0.692C19.685,31.587,20.555,31.19,22.176,28.198z
		 M35.813,23.756c0.815,0.627,1.014,0.944,1.547,0.944c0.234,0,0.901-0.01,1.21-0.441c0.149-0.209,0.207-0.343,0.23-0.415
		c-0.123-0.065-0.286-0.197-1.175-0.197C37.12,23.648,36.485,23.67,35.813,23.756z M28.343,17.174
		c-0.715,2.474-1.659,5.145-2.674,7.564c2.09-0.811,4.362-1.519,6.496-2.02C30.815,21.15,29.466,19.192,28.343,17.174z
		 M27.736,8.712c-0.098,0.033-1.33,1.757,0.096,3.216C28.781,9.813,27.779,8.698,27.736,8.712z"
                    />
                    <path
                      style="fill: #cc4b4c"
                      d="M48.037,56H7.963C7.155,56,6.5,55.345,6.5,54.537V39h43v15.537C49.5,55.345,48.845,56,48.037,56z"
                    />
                    <g>
                      <path
                        style="fill: #ffffff"
                        d="M17.385,53h-1.641V42.924h2.898c0.428,0,0.852,0.068,1.271,0.205
			c0.419,0.137,0.795,0.342,1.128,0.615c0.333,0.273,0.602,0.604,0.807,0.991s0.308,0.822,0.308,1.306
			c0,0.511-0.087,0.973-0.26,1.388c-0.173,0.415-0.415,0.764-0.725,1.046c-0.31,0.282-0.684,0.501-1.121,0.656
			s-0.921,0.232-1.449,0.232h-1.217V53z M17.385,44.168v3.992h1.504c0.2,0,0.398-0.034,0.595-0.103
			c0.196-0.068,0.376-0.18,0.54-0.335c0.164-0.155,0.296-0.371,0.396-0.649c0.1-0.278,0.15-0.622,0.15-1.032
			c0-0.164-0.023-0.354-0.068-0.567c-0.046-0.214-0.139-0.419-0.28-0.615c-0.142-0.196-0.34-0.36-0.595-0.492
			c-0.255-0.132-0.593-0.198-1.012-0.198H17.385z"
                      />
                      <path
                        style="fill: #ffffff"
                        d="M32.219,47.682c0,0.829-0.089,1.538-0.267,2.126s-0.403,1.08-0.677,1.477s-0.581,0.709-0.923,0.937
			s-0.672,0.398-0.991,0.513c-0.319,0.114-0.611,0.187-0.875,0.219C28.222,52.984,28.026,53,27.898,53h-3.814V42.924h3.035
			c0.848,0,1.593,0.135,2.235,0.403s1.176,0.627,1.6,1.073s0.74,0.955,0.95,1.524C32.114,46.494,32.219,47.08,32.219,47.682z
			 M27.352,51.797c1.112,0,1.914-0.355,2.406-1.066s0.738-1.741,0.738-3.09c0-0.419-0.05-0.834-0.15-1.244
			c-0.101-0.41-0.294-0.781-0.581-1.114s-0.677-0.602-1.169-0.807s-1.13-0.308-1.914-0.308h-0.957v7.629H27.352z"
                      />
                      <path
                        style="fill: #ffffff"
                        d="M36.266,44.168v3.172h4.211v1.121h-4.211V53h-1.668V42.924H40.9v1.244H36.266z"
                      />
                    </g>
                  </g>
                </svg>
              </div>
            </td>
            <td class="px-6 py-4">{{ i.created_at }}</td>
            <td class="px-6 py-4" colspan="2">
              <span :class="i.classi">
                {{ i.status }}
              </span>
              <span :class="i.classi" v-show="i.comfirm_cus !== ''">
                {{ i.comfirm_cus }}
              </span>
            </td>

            <td class="px-6 py-4 text-right">
              <a
                href="#"
                class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >Edit</a
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div> -->
    <div>
      <label for="table-search" class="sr-only">Search</label>
      <div class="relative mt-1 mb-2">
        <div
          class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
        >
          <svg
            class="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
        <input
          type="text"
          id="table-search"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="ค้นหาลูกค้า ..."
          v-model="searchCus"
          @input="searchcus_input(searchCus)"
        />
      </div>

      <table-lite
        v-show="this.list_au.length > 0"
        :is-loading="table.isLoading"
        :columns="table.columns"
        :rows="table.rows"
        :total="table.totalRecordCount"
        :sortable="table.sortable"
        :messages="table.messages"
        @do-search="doSearch"
        @is-finished="table.isLoading = false"
      ></table-lite>
    </div>
  </div>
</template>
<script>
import UserService from "@/services/UserService";
import { auth } from "@/state/user";
import { reactive } from "vue";
import TableLite from "../components/TableLite.vue";

const sampleData1 = (offst, limit) => {
  let data = [];
  auth.list.forEach((element) => {
    element.status_cus = "";
    if (element.status == "D" || element.status == "TEMP") {
      element.classi =
        "bg-gray-100 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300";
    } else if (element.status == "W") {
      element.classi =
        "bg-yellow-100 text-yellow-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-900";
    } else if (element.status == "A" || element.status == "C") {
      element.classi =
        "bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900";
      if (element.status == "C") {
        element.status_cus = "ลูกค้า";
      }
    }
  });

  for (let i = offst; i < limit; i++) {
    if (i < auth.list.length) {
      data.push({
        CNAME: auth.list[i].CNAME,
        QT: auth.list[i].QT,
        created_at: auth.list[i].created_at.substring(0, 16),
        status: auth.list[i].status,
        classi: auth.list[i].classi,
        status_cus: auth.list[i].status_cus,
        other: "Edit",
      });
    }
  }
  return data;
};
const sampleData2 = (offst, limit) => {
  auth.list.forEach((element) => {
    element.status_cus = "";

    if (element.status == "D" || element.status == "TEMP") {
      element.classi =
        "bg-gray-100 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300";
    } else if (element.status == "W") {
      element.classi =
        "bg-yellow-100 text-yellow-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-900";
    } else if (element.status == "A" || element.status == "C") {
      element.classi =
        "bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900";
      if (element.status == "C") {
        element.status_cus = "ลูกค้า";
      }
    }
  });
  let data = [];
  for (let i = limit - 1; i >= offst; i--) {
    if (i < auth.list.length) {
      data.push({
        CNAME: auth.list[i].CNAME,
        QT: auth.list[i].QT,
        created_at: auth.list[i].created_at.substring(0, 16),
        status: auth.list[i].status,
        status_cus: auth.list[i].status_cus,
        classi: auth.list[i].classi,
        other: "Edit",
      });
    }
  }
  return data;
};
export default {
  data() {
    return {
      list_au: [],
      searchCus: "",
    };
  },

  setup() {
    // Table config
    const table = reactive({
      isLoading: false,
      columns: [
        {
          label: "ลูกค้า",
          field: "CNAME",
          width: "20%",
          sortable: true,
          isKey: true,
        },
        {
          label: "ใบเสนอราคาเลขที่",
          field: "QT",
          width: "8%",
          sortable: true,
        },
        {
          label: "สร้างเมื่อ",
          field: "created_at",
          width: "6%",
          sortable: true,
        },
        {
          label: "สถานะ",
          field: "status_show",
          width: "5%",
          sortable: true,
        },
        {
          field: "other",
          width: "3%",
        },
      ],
      rows: [],
      totalRecordCount: 0,
      sortable: {
        order: "id",
        sort: "asc",
      },
    });
    /**
     * Search Event
     */
    const doSearch = async (offset, limit, order, sort) => {
      table.isLoading = true;
      setTimeout(() => {
        table.isReSearch = offset == undefined ? true : false;
        if (offset >= 10 || limit >= 20) {
          limit = auth.list.length;
        }
        if (sort == "asc") {
          table.rows = sampleData1(offset, limit);
        } else {
          table.rows = sampleData2(offset, limit);
        }
        table.totalRecordCount = 20;
        table.sortable.order = order;
        table.sortable.sort = sort;
      }, 300);
    };

    // First get data
    doSearch(0, 10, "id", "asc");
    return {
      table,
      doSearch,
    };
  },
  components: { TableLite },
  computed: {
    AllList() {
      return this.list_au;
    },
  },
  async created() {
    console.log("### USER_ID ###", auth.user_id);
    const data_list = await UserService.list({ emp_code: auth.user_id });
    this.list_au = data_list.data;
    auth.list = data_list.data;

    // this.list_au.map((data) => {
    //   data.comfirm_cus = "";
    //   if (data.status == "TEMP" || data.status == "D") {
    //     data.status = "แบบร่าง";
    //     data.classi =
    //       "bg-gray-100 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300";
    //   } else if (data.status == "A" || data.status == "C") {
    //     if (data.status == "C") {
    //       data.comfirm_cus = "ลูกค้า";
    //     }
    //     data.status = "อนุมัติแล้ว";
    //     data.classi =
    //       "bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900";
    //   } else if (data.status == "W") {
    //     data.status = "รออนุมัติ";
    //     data.classi =
    //       "bg-yellow-100 text-yellow-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-900";
    //   }
    //   data.created_at = data.created_at.substring(0, 16);
    // });
  },
  methods: {
    async goto_qt(qt) {
      console.log("VAT:", cus.vat);
      localStorage.setItem("tempqt", qt);
      // this.$router.push({
      //   name: "Home",
      //   params: { list_qt: qt },
      // });
    },
    goto_pdf(qt) {
      window.open("https://report.zubbsteel.com/tcpdf/pdf/ZQT.php?ref=" + qt);
    },
    async searchcus_input(input) {
      input = input.trim();
      if (input == "") {
        const data_list = await UserService.list({ emp_code: auth.user_id });
        this.list_au = data_list.data;
        this.table.rows = this.list_au;
        auth.list = this.table.rows;
        this.doSearch(0, 10, "id", "asc");
      } else {
        const R = [];
        for (let i = 0; i < this.list_au.length; i++) {
          if (this.list_au[i].CNAME !== null) {
            R.push(this.list_au[i].CNAME.toUpperCase());
          }
        }

        const result = R.filter((word) => word.includes(input.toUpperCase())); //ข้อมูลที่ฟิลเตอร์เจอจริงๆ

        const A = Object.values(this.list_au); //ดาต้าจริงก้อนใหญ่

        const res = result.map((item) => {
          return A.find((i) => i.CNAME.toUpperCase() == item);
        });

        this.table.rows = res;
        auth.list = res;
      }
    },
  },
};
</script>
<style type="text/css">
.st0 {
  /* fill: #da70d6; */
  stroke: #da70d6;
}
.fivv {
  color: pink;
}
</style>
