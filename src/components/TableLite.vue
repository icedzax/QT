<template>
  <div class="vtl vtl-card">
    <div class="vtl-card-title" v-if="title">{{ title }}</div>
    <div class="vtl-card-body">
      <div class="vtl-row">
        <div class="col-sm-12">
          <div v-if="isLoading" class="vtl-loading-mask">
            <div class="vtl-loading-content">
              <span style="color: white">Loading...</span>
            </div>
          </div>
          <table
            class="vtl-table vtl-table-hover vtl-table-bordered vtl-table-responsive vtl-table-responsive-sm"
            ref="localTable"
          >
            <thead class="vtl-thead">
              <tr class="vtl-thead-tr">
                <th v-if="hasCheckbox" class="vtl-thead-th vtl-checkbox-th">
                  <div>
                    <input
                      type="checkbox"
                      class="vtl-thead-checkbox"
                      v-model="setting.isCheckAll"
                    />
                  </div>
                </th>
                <th
                  v-for="(col, index) in columns"
                  class="vtl-thead-th"
                  :class="col.headerClasses"
                  :key="index"
                  :style="
                    Object.assign(
                      { width: col.width ? col.width : 'auto' },
                      col.headerStyles
                    )
                  "
                >
                  <div
                    class="vtl-thead-column"
                    :class="{
                      'vtl-sortable': col.sortable,
                      'vtl-both': col.sortable,
                      'vtl-asc':
                        setting.order === col.field && setting.sort === 'asc',
                      'vtl-desc ':
                        setting.order === col.field && setting.sort === 'desc',
                    }"
                    @click="col.sortable ? doSort(col.field) : false"
                  >
                    {{ col.label }}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody v-if="rows.length > 0" class="vtl-tbody">
              <template v-if="isStaticMode">
                <tr v-for="(row, i) in localRows" :key="i" class="vtl-tbody-tr">
                  <td v-if="hasCheckbox" class="vtl-tbody-td">
                    <div>
                      <input
                        type="checkbox"
                        class="vtl-tbody-checkbox"
                        :ref="
                          (el) => {
                            rowCheckbox[i] = el;
                          }
                        "
                        :value="row[setting.keyColumn]"
                        @click="checked"
                      />
                    </div>
                  </td>
                  <td
                    v-for="(col, j) in columns"
                    :key="j"
                    class="vtl-tbody-td"
                    :class="col.columnClasses"
                    :style="col.columnStyles"
                  >
                    <div v-if="col.display" v-html="col.display(row)"></div>
                    <template v-else>
                      <div v-if="setting.isSlotMode && slots[col.field]">
                        <slot :name="col.field" :value="row"></slot>
                      </div>
                      <span v-else>{{ row[col.field] }}</span>
                    </template>
                  </td>
                </tr>
              </template>
              <template v-else>
                <tr v-for="(row, i) in rows" :key="i" class="vtl-tbody-tr">
                  <td v-if="hasCheckbox" class="vtl-tbody-td">
                    <div>
                      <input
                        type="checkbox"
                        class="vtl-tbody-checkbox"
                        :ref="
                          (el) => {
                            rowCheckbox[i] = el;
                          }
                        "
                        :value="row[setting.keyColumn]"
                        @click="checked"
                      />
                    </div>
                  </td>
                  <td
                    v-for="(col, j) in columns"
                    :key="j"
                    class="vtl-tbody-td"
                    :class="col.columnClasses"
                    :style="col.columnStyles"
                    :id="col.field"
                  >
                    <div v-if="col.display" v-html="col.display(row)"></div>
                    <div v-else class="">
                      <div v-if="setting.isSlotMode && slots[col.field]">
                        <slot :name="col.field" :value="row"></slot>
                      </div>
                      <div
                        v-else-if="col.field == 'QT'"
                        class="flex justify-start"
                      >
                        <span
                          class="hover:underline cursor-pointer mr-3 text-gray-500"
                          @click="goto_qt(row[col.field])"
                          >{{ row[col.field] }}</span
                        >
                        <svg
                          version="1.1"
                          id="Capa_1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          class="w-5"
                          viewBox="0 0 56 56"
                          style="enable-background: new 0 0 56 56"
                          xml:space="preserve"
                          @click="goto_pdf(row.QT)"
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
                      <div
                        v-else-if="col.field == 'status_show'"
                        class="text-green-500"
                      >
                        <span :class="row.classi"> {{ row[col.field] }}</span>
                        <span
                          v-if="row.status_cus == '??????????????????'"
                          :class="row.classi"
                        >
                          {{ row.status_cus }}</span
                        >
                      </div>
                      <div
                        v-else-if="col.field == 'other'"
                        class="flex justify-center"
                      >
                        <!-- <a
                          href="#"
                          class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          >{{ row[col.field] }}</a
                        > -->
                        <svg
                          version="1.1"
                          id="Layer_1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          class="w-5 cursor-pointer"
                          viewBox="0 0 63 80.5"
                          enable-background="new 0 0 63 80.5"
                          xml:space="preserve"
                          @click="goto_delete(row.QT, i)"
                        >
                          <g>
                            <path
                              fill="#DC2F0A"
                              d="M1.3,19.3L1.3,19.3L4.6,22v52.2c0,2.6,2.1,4.6,4.6,4.6h44.1c2.6,0,4.6-2.1,4.6-4.6V22l3.3-2.8h0v-4.6H1.3
		V19.3z M41.8,26.5h5.6v44.9h-5.6V26.5z M28.5,26.5h5.6v44.9h-5.6V26.5z M15.2,26.5h5.6v44.9h-5.6V26.5z"
                            />
                            <path
                              fill="#692314"
                              d="M60.3,8.1H40.8V3.5c0-1-0.8-1.9-1.9-1.9H23.7c-1,0-1.9,0.8-1.9,1.9v4.6H2.3c-0.6,0-1.1,0.5-1.1,1.1v3.6
		h60.2V9.2C61.4,8.6,60.9,8.1,60.3,8.1z M37.3,7h-12V5.7c0-0.3,0.3-0.6,0.6-0.6h10.8c0.3,0,0.6,0.3,0.6,0.6V7z"
                            />
                          </g>
                        </svg>
                      </div>

                      <div v-else-if="col.field == 'note'">
                        <input
                          type="text"
                          class="border-t-0 border-r-0 border-l-0 border-b-1"
                          v-model="row[col.field]"
                          @change="updatenote(row.QT, row[col.field])"
                        />
                      </div>

                      <span :class="col.field" v-else>{{
                        row[col.field]
                      }}</span>
                    </div>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
      <div class="vtl-paging vtl-row" v-if="rows.length > 0">
        <template v-if="!setting.isHidePaging">
          <div class="vtl-paging-info col-sm-12 col-md-4">
            <div role="status" aria-live="polite">
              {{
                stringFormat(
                  messages.pagingInfo,
                  setting.offset,
                  setting.limit,
                  auth.list.length
                )
              }}
            </div>
          </div>
          <div class="vtl-paging-change-div col-sm-12 col-md-4">
            <span class="vtl-paging-count-label">{{
              messages.pageSizeChangeLabel
            }}</span>
            <select
              class="vtl-paging-count-dropdown"
              v-model="setting.pageSize"
            >
              <option
                v-for="pageOption in pageOptions"
                :value="pageOption.value"
                :key="pageOption.value"
              >
                {{ pageOption.text }}
              </option>
            </select>
            <span class="vtl-paging-page-label">{{
              messages.gotoPageLabel
            }}</span>
            <select class="vtl-paging-page-dropdown" v-model="setting.page">
              <option
                v-for="n in setting.maxPage"
                :key="n"
                :value="parseInt(n)"
              >
                {{ n }}
              </option>
            </select>
          </div>
          <div class="vtl-paging-pagination-div col-sm-12 col-md-4">
            <div class="dataTables_paginate">
              <ul class="vtl-paging-pagination-ul vtl-pagination">
                <li
                  class="vtl-paging-pagination-page-li vtl-paging-pagination-page-li-first page-item"
                  :class="{ disabled: setting.page <= 1 }"
                >
                  <a
                    class="vtl-paging-pagination-page-link vtl-paging-pagination-page-link-first page-link"
                    href="javascript:void(0)"
                    aria-label="Previous"
                    @click="setting.page = 1"
                  >
                    <span aria-hidden="true">&laquo;</span>
                    <span class="sr-only">First</span>
                  </a>
                </li>
                <li
                  class="vtl-paging-pagination-page-li vtl-paging-pagination-page-li-prev page-item"
                  :class="{ disabled: setting.page <= 1 }"
                >
                  <a
                    class="vtl-paging-pagination-page-link vtl-paging-pagination-page-link-prev page-link"
                    href="javascript:void(0)"
                    aria-label="Previous"
                    @click="prevPage"
                  >
                    <span aria-hidden="true">&lt;</span>
                    <span class="sr-only">Prev</span>
                  </a>
                </li>
                <li
                  class="vtl-paging-pagination-page-li vtl-paging-pagination-page-li-number page-item"
                  v-for="n in setting.paging"
                  :key="n"
                  :class="{ disabled: setting.page === n }"
                >
                  <a
                    class="vtl-paging-pagination-page-link vtl-paging-pagination-page-link-number page-link"
                    href="javascript:void(0)"
                    @click="movePage(n)"
                    >{{ n }}</a
                  >
                </li>
                <li
                  class="vtl-paging-pagination-page-li vtl-paging-pagination-page-li-next page-item"
                  :class="{ disabled: setting.page >= setting.maxPage }"
                >
                  <a
                    class="vtl-paging-pagination-page-link vtl-paging-pagination-page-link-next page-link"
                    href="javascript:void(0)"
                    aria-label="Next"
                    @click="nextPage"
                  >
                    <span aria-hidden="true">&gt;</span>
                    <span class="sr-only">Next</span>
                  </a>
                </li>
                <li
                  class="vtl-paging-pagination-page-li vtl-paging-pagination-page-li-last page-item"
                  :class="{ disabled: setting.page >= setting.maxPage }"
                >
                  <a
                    class="vtl-paging-pagination-page-link vtl-paging-pagination-page-link-last page-link"
                    href="javascript:void(0)"
                    aria-label="Next"
                    @click="setting.page = setting.maxPage"
                  >
                    <span aria-hidden="true">&raquo;</span>
                    <span class="sr-only">Last</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </template>
      </div>
      <div class="vtl-row" v-else>
        <div class="vtl-empty-msg col-sm-12 text-center">
          {{ messages.noDataAvailable }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from "@/services/UserService";
import {
  defineComponent,
  ref,
  reactive,
  computed,
  watch,
  onBeforeUpdate,
  nextTick,
  onMounted,
} from "vue";
import { auth } from "../state/user";
import { cus } from "../state/cus";
import { debounce } from "lodash";

import CusService from "@/services/CusService";
import OrderService from "@/services/OrderService";

export default defineComponent({
  data() {
    return {
      auth,
    };
  },
  async created() {},
  methods: {
    async goto_qt(qt) {
      const v_vat = await CusService.findVAT({ qt: qt });
      cus.vat = v_vat.data[0].vat;
      if (cus.vat == 1) {
        cus.vat = 0.07;
      } else {
        cus.vat = 0;
      }

      localStorage.setItem("tempqt", qt);
      this.$router.push({
        name: "Home",
        params: { list_qt: qt },
      });
    },
    goto_pdf(qt) {
      window.open("https://report.zubbsteel.com/tcpdf/pdf/ZQT.php?ref=" + qt);
    },
    async goto_delete(qt_send, index) {
      let indexfor_all = index;

      if (this.setting.page == 1) {
        indexfor_all = index;
      } else {
        if (index == 0) {
          indexfor_all = (this.setting.page - 1) * 10;
        } else {
          indexfor_all = (this.setting.page - 1) * 10 + index;
        }
      }

      if (confirm("????????????????????????????????????????????????????????????????????? " + qt_send + " ??????????????????????????????")) {
        const delete_message = UserService.del({ qt: qt_send });
        alert("?????????????????????????????????????????????????????? :)");
        this.rows.splice(index, 1);
        auth.list.splice(indexfor_all, 1);

        let del_index = this.setting.page * 10 - 1;
        // console.log(del_index);
        if (del_index < auth.list.length) {
          this.rows.push(auth.list[del_index]);
        }
        if (this.rows.length == 0) {
          this.setting.page = this.setting.page - 1;
          // console.log("???????????????????????????????????????");
        }
      }
    },
    updatenote: debounce(async function (isQT, inputnote) {
      await OrderService.postnote({ note: inputnote, qt: isQT });
    }, 800),
  },
  name: "my-table",
  emits: ["return-checked-rows", "do-search", "is-finished", "get-now-page"],
  props: {
    // ??????????????? (is data loading)
    isLoading: {
      type: Boolean,
      require: true,
    },
    // ??????????????????????????? (Whether to perform a re-query)
    isReSearch: {
      type: Boolean,
      require: true,
    },
    // ??????Checkbox (Presence of Checkbox)
    hasCheckbox: {
      type: Boolean,
      default: false,
    },
    // ?????? (title)
    title: {
      type: String,
      default: "",
    },
    // ?????? (Field)
    columns: {
      type: Array,
      default: () => {
        return [];
      },
    },
    // ?????? (data)
    rows: {
      type: Array,
      default: () => {
        return [];
      },
    },
    // ?????????????????? (Display the number of items on one page)
    pageSize: {
      type: Number,
      default: 10,
    },
    // ????????? (Total number of transactions)
    total: {
      type: Number,
      default: 100,
    },
    // ???????????? (Current page number)
    page: {
      type: Number,
      default: 1,
    },
    // ???????????? (Sort condition)
    sortable: {
      type: Object,
      default: () => {
        return {
          order: "id",
          sort: "asc",
        };
      },
    },
    // ???????????? (Display text)
    messages: {
      type: Object,
      default: () => {
        return {
          pagingInfo: "Showing {0}-{1} of {2}",
          pageSizeChangeLabel: "Row count:",
          gotoPageLabel: "Go to page:",
          noDataAvailable: "No data",
        };
      },
    },
    // ???????????? (Static mode(no refresh server data))
    isStaticMode: {
      type: Boolean,
      default: false,
    },
    // ???????????? (V-slot mode)
    isSlotMode: {
      type: Boolean,
      default: false,
    },
    // ???????????????????????? (Hide paging)
    isHidePaging: {
      type: Boolean,
      default: false,
    },
    // ?????????????????????????????? (Dropdown of Display the number of items on one page)
    pageOptions: {
      type: Array,
      default: () => [
        {
          value: 10,
          text: 10,
        },
        {
          value: 25,
          text: 25,
        },
        {
          value: 50,
          text: 50,
        },
      ],
    },
  },

  setup(props, { emit, slots }) {
    // console.log("**setup load**");
    let localTable = ref(null);

    // ????????????????????????????????????????????????????????? (Validate dropdown's values have page-size value or not)
    let defaultPageSize =
      props.pageOptions.length > 0
        ? ref(props.pageOptions[0].value)
        : ref(props.pageSize);
    if (props.pageOptions.length > 0) {
      props.pageOptions.forEach((v) => {
        if (
          Object.prototype.hasOwnProperty.call(v, "value") &&
          Object.prototype.hasOwnProperty.call(v, "text") &&
          props.pageSize == v.value
        ) {
          defaultPageSize.value = v.value;
        }
      });
    }

    // ???????????????????????? (Internal set value for components)
    const setting = reactive({
      // ????????????Slot?????? (Enable slot mode)
      isSlotMode: props.isSlotMode,
      // ???????????? (Whether to select all)
      isCheckAll: false,
      // ???????????????????????? (Hide paging)
      isHidePaging: props.isHidePaging,
      // KEY???????????? (KEY field name)
      keyColumn: computed(() => {
        let key = "";
        Object.assign(props.columns).forEach((col) => {
          if (col.isKey) {
            key = col.field;
          }
        });
        return key;
      }),
      // ???????????? (current page number)
      page: props.page,
      // ?????????????????? (Display count per page)
      pageSize: defaultPageSize.value,
      // ???????????? (Maximum number of pages)

      maxPage: computed(() => {
        if (auth.list.length <= 0) {
          return 0;
        }
        let maxPage = Math.floor(auth.list.length / setting.pageSize);
        let mod = auth.list.length % setting.pageSize;
        if (mod > 0) {
          maxPage++;
        }
        return maxPage;
      }),
      // ?????????????????? (The starting value of the page number)
      offset: computed(() => {
        // console.log("pageSize:", setting.page);
        return (setting.page - 1) * setting.pageSize + 1;
      }),
      // ?????????????????? (Maximum number of pages0
      limit: computed(() => {
        props.rows.forEach((data) => {
          // console.log(data);
          if (data.status == "C" || data.status == "A") {
            if (data.status == "C") {
              data.status_cus = "??????????????????";
            }
            data.status_show = "?????????????????????????????????";
            data.classi =
              "bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900";
          } else if (data.status == "W") {
            data.status_show = "???????????????????????????";
            data.classi =
              "bg-yellow-100 text-yellow-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-900";
          } else {
            data.status_show = "?????????????????????";
            data.classi =
              "bg-gray-100 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300";
          }
          data.created_at = data.created_at.substring(0, 16);
          data.other = "Edit";
        });
        let limit = setting.page * setting.pageSize;
        return auth.list.length >= limit ? limit : auth.list.length;
      }),
      // ???????????? (Paging array)
      paging: computed(() => {
        let startPage = setting.page - 2 <= 0 ? 1 : setting.page - 2;

        if (setting.maxPage - setting.page <= 2) {
          startPage = setting.maxPage - 4;
        }
        startPage = startPage <= 0 ? 1 : startPage;
        let pages = [];
        for (let i = startPage; i <= setting.maxPage; i++) {
          if (pages.length < 5) {
            pages.push(i);
          }
        }

        return pages;
      }),
      // ?????????????????? (Sortable for local)
      order: props.sortable.order,
      sort: props.sortable.sort,
      pageOptions: props.pageOptions,
    });

    // ?????????????????? (Data rows for local)
    const localRows = computed(() => {
      // sort rows
      let property = setting.order;
      let sort_order = 1;
      if (setting.sort === "desc") {
        sort_order = -1;
      }

      let rows = props.rows;

      rows.sort((a, b) => {
        if (a[property] < b[property]) {
          return -1 * sort_order;
        } else if (a[property] > b[property]) {
          return sort_order;
        } else {
          return 0;
        }
      });

      // return sorted and offset rows
      let result = [];
      for (let index = setting.offset - 1; index < setting.limit; index++) {
        if (rows[index]) {
          result.push(rows[index]);
        }
      }

      nextTick(function () {
        // ???????????????????????????????????????
        callIsFinished();
      });

      return result;
    });

    ////////////////////////////
    //
    //  Checkbox ????????????
    //  (Checkbox related operations)
    //

    // ??????Checkbox?????? (Define Checkbox reference)
    const rowCheckbox = ref([]);
    if (props.hasCheckbox) {
      /**
       * ????????????????????? (Execute before re-rendering)
       */
      onBeforeUpdate(() => {
        // ???????????????????????????????????? (Clear all values before each update)
        rowCheckbox.value = [];
      });

      /**
       * ???????????????Checkbox (Check all checkboxes for monitoring)
       */
      watch(
        () => setting.isCheckAll,
        (state) => {
          let isChecked = [];
          rowCheckbox.value.forEach((val) => {
            if (val) {
              val.checked = state;
              if (val.checked) {
                isChecked.push(val.value);
              }
            }
          });
          // ?????????????????????????????? (Return the selected data on the screen)
          emit("return-checked-rows", isChecked);
        }
      );
    }

    /**
     * Checkbox???????????? (Checkbox click event)
     */
    const checked = () => {
      let isChecked = [];
      rowCheckbox.value.forEach((val) => {
        if (val && val.checked) {
          isChecked.push(val.value);
        }
      });
      // ?????????????????????????????? (Return the selected data on the screen)
      emit("return-checked-rows", isChecked);
    };

    /**
     * ????????????????????????????????? (Clear all selected data on the screen)
     */
    const clearChecked = () => {
      rowCheckbox.value.forEach((val) => {
        if (val && val.checked) {
          val.checked = false;
        }
      });
      // ?????????????????????????????? (Return the selected data on the screen)
      emit("return-checked-rows", []);
    };

    ////////////////////////////
    //
    //  ????????????????? ????????????
    //  (Sorting, page change, etc. related operations)
    //

    /**
     * ?????????????????? (Call execution sequencing)
     */
    const doSort = (order) => {
      let sort = "asc";
      if (order == setting.order) {
        // ????????????????????? (When sorting items)
        if (setting.sort == "asc") {
          sort = "desc";
        }
      }
      let offset = (setting.page - 1) * setting.pageSize;
      let limit = setting.pageSize;

      setting.order = order;
      setting.sort = sort;
      emit("do-search", offset, limit, order, sort);

      // ?????????????????????????????? (Clear the selected data on the screen)
      if (setting.isCheckAll) {
        // ?????????????????????????????? (It will be cleared when you cancel all selections)
        setting.isCheckAll = false;
      } else {
        if (props.hasCheckbox) {
          clearChecked();
        }
      }
    };

    /**
     * ???????????? (Switch page number)
     *
     * @param page      number  ?????????    (New page number)
     * @param prevPage  number  ????????????  (Current page number)
     */
    const changePage = (page, prevPage) => {
      setting.isCheckAll = false;
      let order = setting.order;
      let sort = setting.sort;
      let offset = (page - 1) * setting.pageSize;
      let limit = page * setting.pageSize;
      // console.log("LIST:", props.rows);
      // console.log("AUTH:", auth.list);
      if (!props.isReSearch || page > 1 || page == prevPage) {
        // ????????????????????????????????????????????????????????? (Call query will only be executed if the page number is changed without re-query)
        emit("do-search", offset, limit, order, sort);
      }
    };
    // ?????????????????? (Monitor page switching)
    watch(() => setting.page, changePage);
    // ???????????????????????? (Monitor manual page switching)
    watch(
      () => props.page,
      (val) => {
        if (val <= 1) {
          setting.page = 1;
          emit("get-now-page", setting.page);
        } else if (val >= setting.maxPage) {
          setting.page = setting.maxPage;
          emit("get-now-page", setting.page);
        } else {
          setting.page = val;
        }
      }
    );

    /**
     * ?????????????????? (Switch display number)
     */
    const changePageSize = () => {
      if (setting.page === 1) {
        // ??????????????? changePage()?????????????????????
        changePage(setting.page, setting.page);
      } else {
        // ?????????????????????,??????????????? changePage()
        setting.page = 1;
        setting.isCheckAll = false;
      }
    };
    // ???????????????????????? (Monitor display number switch)
    watch(() => setting.pageSize, changePageSize);

    /**
     * ????????? (Previous page)
     */
    const prevPage = () => {
      if (setting.page == 1) {
        // ????????????????????????????????? (If it is the first page, it will not be executed)
        return false;
      }
      setting.page--;
    };

    /**
     * ????????????????????? (Move to the specified number of pages)
     */
    const movePage = (page) => {
      setting.page = page;
    };

    /**
     * ????????? (Next page)
     */
    const nextPage = () => {
      if (setting.page >= setting.maxPage) {
        // ????????????????????????????????????????????? (If it is equal to or greater than the maximum number of pages, no execution)
        return false;
      }
      setting.page++;
    };

    // ?????????????????? (Monitoring data changes)
    watch(
      () => props.rows,
      () => {
        if (props.isReSearch || props.isStaticMode) {
          setting.page = 1;
        }
        nextTick(function () {
          // ??????????????????????????????????????? (Return the private components after the data is rendered)
          if (!props.isStaticMode) {
            callIsFinished();
          }
        });
      }
    );

    const stringFormat = (template, ...args) => {
      return template.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] != "undefined" ? args[number] : match;
      });
    };

    // Call ???is-finished??? Method
    const callIsFinished = () => {
      // console.log("change;;");
      if (localTable.value) {
        let localElement =
          localTable.value.getElementsByClassName("is-rows-el");
        emit("is-finished", localElement);
      }
      emit("get-now-page", setting.page);
    };

    /**
     * ????????????????????? (Mounted Event)
     */
    onMounted(() => {
      nextTick(() => {
        if (props.rows.length > 0) {
          callIsFinished();
        }
      });
    });

    if (props.hasCheckbox) {
      // ?????? Checkbox ??? (When Checkbox is needed)
      return {
        slots,
        localTable,
        localRows,
        setting,
        rowCheckbox,
        checked,
        doSort,
        prevPage,
        movePage,
        nextPage,
        stringFormat,
      };
    } else {
      return {
        slots,
        localTable,
        localRows,
        setting,
        doSort,
        prevPage,
        movePage,
        nextPage,
        stringFormat,
      };
    }
  },
});
</script>

<style scoped>
.vtl-checkbox-th {
  width: 1%;
}

.vtl-both {
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAQAAADYWf5HAAAAkElEQVQoz7X QMQ5AQBCF4dWQSJxC5wwax1Cq1e7BAdxD5SL+Tq/QCM1oNiJidwox0355mXnG/DrEtIQ6azioNZQxI0ykPhTQIwhCR+BmBYtlK7kLJYwWCcJA9M4qdrZrd8pPjZWPtOqdRQy320YSV17OatFC4euts6z39GYMKRPCTKY9UnPQ6P+GtMRfGtPnBCiqhAeJPmkqAAAAAElFTkSuQmCC");
}

.vtl-sortable {
  cursor: pointer;
  background-position: right;
  background-repeat: no-repeat;
  padding-right: 30px !important;
}

.vtl-asc {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAAZ0lEQVQ4y2NgGLKgquEuFxBPAGI2ahhWCsS/gDibUoO0gPgxEP8H4ttArEyuQYxAPBdqEAxPBImTY5gjEL9DM+wTENuQahAvEO9DMwiGdwAxOymGJQLxTyD+jgWDxCMZRsEoGAVoAADeemwtPcZI2wAAAABJRU5ErkJggg==);
}

.vtl-desc {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAAZUlEQVQ4y2NgGAWjYBSggaqGu5FA/BOIv2PBIPFEUgxjB+IdQPwfC94HxLykus4GiD+hGfQOiB3J8SojEE9EM2wuSJzcsFMG4ttQgx4DsRalkZENxL+AuJQaMcsGxBOAmGvopk8AVz1sLZgg0bsAAAAASUVORK5CYII=);
}

.vtl-loading-mask {
  position: absolute;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(216, 215, 215, 0.5);
  display: flex;
  flex-flow: column;
  transition: opacity 0.3s ease;
}

.vtl-loading-content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.vtl-card {
  position: relative;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
}

select {
  width: auto;
  border: 1px solid #cccccc;
  background-color: #ccccccfa;
  height: auto;
  margin-bottom: 0;
  margin-left: 5px;
  margin-right: 5px;
}

.vtl-table {
  width: 100%;
  margin-bottom: 1rem;
  color: #212529;
  border-collapse: collapse;
  border-radius: 10px;
  font-size: 14px;
}

th {
  text-align: inherit;
  font-size: 12px;
}

tr {
  display: table-row;
  vertical-align: inherit;
  border-color: inherit;
}

.vtl-table-bordered thead td,
.vtl-table-bordered thead th {
  border-bottom-width: 2px;
}

.vtl-table thead th {
  vertical-align: bottom;
  background-color: #e8eaf6e8;
  border-color: #e8eaf6;
  border-bottom: 2px solid #dee2e6;
}

.vtl-table-bordered td,
.vtl-table-bordered th {
  border: 1px solid #dee2e6;
}

.vtl-table td,
.vtl-table th {
  padding: 0.75rem;
  vertical-align: top;
  border-top: 1px solid #dee2e6;
  vertical-align: middle;
}

.vtl-table-hover tbody tr:hover {
  color: #212529;
  background-color: rgba(0, 0, 0, 0.075);
}

.vtl-table-responsive {
  display: block;
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.vtl-table-responsive > .vtl-table-bordered {
  border: 0;
}

.vtl-row {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
}

.vtl-pagination {
  margin: 2px 0;
  white-space: nowrap;
  justify-content: flex-end;
  display: -ms-flexbox;
  display: flex;
  padding-left: 0;
  list-style: none;
  border-radius: 0.25rem;
  margin-bottom: 10px;
}

.page-item.disabled .page-link {
  color: #6c757d;
  pointer-events: none;
  cursor: auto;
  background-color: #fff;
  border-color: #dee2e6;
}

.page-item:first-child .page-link {
  margin-left: 0;
  border-top-left-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;
}

.page-link {
  position: relative;
  display: block;
  padding: 0.5rem 0.75rem;
  margin-left: -1px;
  line-height: 1.25;
  color: #007bff;
  background-color: #fff;
  border: 1px solid #dee2e6;
}
.vtl-tbody-td#other {
  text-align: center;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

*,
::after,
::before {
  box-sizing: border-box;
}

.col-sm-12 {
  -ms-flex: 0 0 100%;
  flex: 0 0 100%;
  max-width: 100%;
}

.text-center {
  text-align: center;
}
.st0 {
  fill: red;
  stroke: #ffcbc0;
  stroke-width: 1;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-miterlimit: 10;
}

@media (min-width: 576px) {
  .vtl-table-responsive-sm {
    display: block;
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  .vtl-table-responsive-sm > .table-bordered {
    border: 0;
  }
  .col-md-4 {
    -ms-flex: 0 0 33.333333%;
    flex: 0 0 33.333333%;
    max-width: 33.333333%;
  }
}
</style>
