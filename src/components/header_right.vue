<template>
  <div class="px-2">
    <Modal @closeModal="newQT" @newQ="reRenderNewQT" :value="modalOpen"></Modal>
    <div
      class="col-span-1 col-start-3 row-span-1 row-start-1 text-center text-xs md:text-sm"
    >
      <div class="flex">
        <div class="text-center text-base md:text-lg lg:text-left">
          ใบเสนอราคา
        </div>
        <div class="justify-inline ml-2 flex">
          <div class="h-10 w-10" @click="goto_pdf">
            <svg
              version="1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              enable-background="new 0 0 48 48"
            >
              <rect x="9" y="11" fill="#424242" width="30" height="3" />
              <path
                fill="#616161"
                d="M4,25h40v-7c0-2.2-1.8-4-4-4H8c-2.2,0-4,1.8-4,4V25z"
              />
              <path
                fill="#424242"
                d="M8,36h32c2.2,0,4-1.8,4-4v-8H4v8C4,34.2,5.8,36,8,36z"
              />
              <circle fill="#00E676" cx="40" cy="18" r="1" />
              <rect x="11" y="4" fill="#90CAF9" width="26" height="10" />
              <path
                fill="#242424"
                d="M37.5,31h-27C9.7,31,9,30.3,9,29.5v0c0-0.8,0.7-1.5,1.5-1.5h27c0.8,0,1.5,0.7,1.5,1.5v0 C39,30.3,38.3,31,37.5,31z"
              />
              <rect x="11" y="31" fill="#90CAF9" width="26" height="11" />
              <rect x="11" y="29" fill="#42A5F5" width="26" height="2" />
              <g fill="#1976D2">
                <rect x="16" y="33" width="17" height="2" />
                <rect x="16" y="37" width="13" height="2" />
              </g>
            </svg>
          </div>
          <div @click="goto_pdf_middle">
            <svg
              class="h-10 w-9"
              version="1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              enable-background="new 0 0 48 48"
              title="ขนาดกลาง"
            >
              <rect
                x="9"
                y="11"
                fill="#424242"
                width="30"
                height="3"
                id="id_111"
              ></rect>
              <path
                fill="#616161"
                d="M4,25h40v-7c0-2.2-1.8-4-4-4H8c-2.2,0-4,1.8-4,4V25z"
                id="id_112"
              ></path>
              <path
                fill="#424242"
                d="M8,36h32c2.2,0,4-1.8,4-4v-8H4v8C4,34.2,5.8,36,8,36z"
                id="id_113"
              ></path>
              <circle fill="#db8a28" cx="40" cy="18" r="1" id="id_114"></circle>
              <rect
                x="11"
                y="4"
                fill="#d6c528"
                width="26"
                height="10"
                id="id_115"
              ></rect>
              <path
                fill="#242424"
                d="M37.5,31h-27C9.7,31,9,30.3,9,29.5v0c0-0.8,0.7-1.5,1.5-1.5h27c0.8,0,1.5,0.7,1.5,1.5v0 C39,30.3,38.3,31,37.5,31z"
                id="id_116"
              ></path>
              <rect
                x="11"
                y="31"
                fill="#f7e96b"
                width="26"
                height="11"
                id="id_117"
              ></rect>
              <rect
                x="11"
                y="29"
                fill="#c9b92b"
                width="26"
                height="2"
                id="id_118"
              ></rect>
              <g fill="#1976D2">
                <rect
                  x="16"
                  y="33"
                  width="17"
                  height="2"
                  id="id_119"
                  style="fill: rgb(222, 204, 40)"
                ></rect>
                <rect
                  x="16"
                  y="37"
                  width="13"
                  height="2"
                  id="id_120"
                  style="fill: rgb(219, 201, 40)"
                ></rect>
              </g>
            </svg>
          </div>
          <div @click="goto_pdf_mini">
            <svg
              class="h-10 w-7"
              version="1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              enable-background="new 0 0 48 48"
            >
              <rect
                x="9"
                y="11"
                fill="#424242"
                width="30"
                height="3"
                id="id_111"
              ></rect>
              <path
                fill="#616161"
                d="M4,25h40v-7c0-2.2-1.8-4-4-4H8c-2.2,0-4,1.8-4,4V25z"
                id="id_112"
              ></path>
              <path
                fill="#424242"
                d="M8,36h32c2.2,0,4-1.8,4-4v-8H4v8C4,34.2,5.8,36,8,36z"
                id="id_113"
              ></path>
              <circle fill="#5968eb" cx="40" cy="18" r="1" id="id_114"></circle>
              <rect
                x="11"
                y="4"
                fill="#f08d8d"
                width="26"
                height="10"
                id="id_115"
              ></rect>
              <path
                fill="#242424"
                d="M37.5,31h-27C9.7,31,9,30.3,9,29.5v0c0-0.8,0.7-1.5,1.5-1.5h27c0.8,0,1.5,0.7,1.5,1.5v0 C39,30.3,38.3,31,37.5,31z"
                id="id_116"
              ></path>
              <rect
                x="11"
                y="31"
                fill="#f27979"
                width="26"
                height="11"
                id="id_117"
              ></rect>
              <rect
                x="11"
                y="29"
                fill="#eb5959"
                width="26"
                height="2"
                id="id_118"
              ></rect>
              <g fill="#1976D2">
                <rect
                  x="16"
                  y="33"
                  width="17"
                  height="2"
                  id="id_119"
                  style="fill: rgb(242, 44, 44)"
                ></rect>
                <rect
                  x="16"
                  y="37"
                  width="13"
                  height="2"
                  id="id_120"
                  style="fill: rgb(240, 45, 45)"
                ></rect>
              </g>
            </svg>
          </div>
          <div class="w-10" @click="goto_so">
            <svg
              version="1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              enable-background="new 0 0 48 48"
            >
              <polygon
                fill="#eb9ecd"
                points="40,45 8,45 8,3 30,3 40,13"
                id="id_101"
              ></polygon>
              <polygon
                fill="#E1F5FE"
                points="38.5,14 29,14 29,4.5"
                id="id_102"
              ></polygon>
              <g fill="#1976D2">
                <rect
                  x="16"
                  y="21"
                  width="17"
                  height="2"
                  id="id_103"
                  style="fill: rgb(143, 83, 120)"
                ></rect>
                <rect
                  x="16"
                  y="25"
                  width="13"
                  height="2"
                  id="id_104"
                  style="fill: rgb(143, 83, 129)"
                ></rect>
                <rect
                  x="16"
                  y="29"
                  width="17"
                  height="2"
                  id="id_105"
                  style="fill: rgb(143, 83, 132)"
                ></rect>
                <rect
                  x="16"
                  y="33"
                  width="13"
                  height="2"
                  id="id_106"
                  style="fill: rgb(143, 83, 132)"
                ></rect>
              </g>
            </svg>
          </div>
          <div @click="goto_list">
            <svg
              version="1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              enable-background="new 0 0 48 48"
              class="w-9"
            >
              <path
                fill="#FFA000"
                d="M38,12H22l-4-4H8c-2.2,0-4,1.8-4,4v24c0,2.2,1.8,4,4,4h31c1.7,0,3-1.3,3-3V16C42,13.8,40.2,12,38,12z"
              />
              <path
                fill="#FFCA28"
                d="M42.2,18H15.3c-1.9,0-3.6,1.4-3.9,3.3L8,40h31.7c1.9,0,3.6-1.4,3.9-3.3l2.5-14C46.6,20.3,44.7,18,42.2,18z"
              />
            </svg>
          </div>
        </div>
      </div>
      <!-- <div
        class="grid overflow-hidden grid-cols-3 grid-rows-2 gap-1 mx-16 lg:mx-0 text-left mt-1"
      >
        <div
          class="row-start-1 row-span-1 col-start-1 col-span-1 p-1 text-xs mt-1"
        >
          เลขที่ใบเสนอราคา
        </div>
        <div class="row-start-1 row-span-1 col-start-2 col-span-2 p-1 text-xs">
          {{ auth.temp_qt }}
          <button
            class="text-center rounded-full px-2 text-sm border-2 border-green-500 text-black hover:text-green-600 font-semibold shadow-lg ring-1 ring-green-200"
          >
            สร้างใหม่
          </button>
        </div>
        <div class="row-start-2 row-span-1 col-start-1 col-span-1 p-1 text-xs">
          วันที่เสนอราคา
        </div>
        <div class="row-start-2 row-span-1 col-start-2 col-span-1 p-1 text-xs">
          {{ order.date }}
        </div>
      </div> -->

      <div class="flex">
        <div class="w-32 text-left">เลขที่ใบเสนอราคา</div>
        <div class="w-32 text-left">
          {{ auth.temp_qt }}
        </div>
        <div
          @click="newQT"
          class="cursor-pointer rounded-md border-2 border-green-500 px-2 text-sm font-semibold text-black shadow-lg ring-1 ring-green-200 hover:text-green-600"
        >
          สร้างใหม่
        </div>
      </div>
      <div class="mt-1 flex">
        <div class="w-32 text-left">วันที่เสนอราคา</div>
        <div class="w-32">
          {{ order.date }}
        </div>
        <div
          @click="dupQT"
          class="cursor-pointer rounded-md border-2 border-yellow-500 px-2 text-sm font-semibold text-black shadow-lg ring-1 ring-yellow-200 hover:text-yellow-600"
        >
          Duplicate
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { auth } from "../state/user";
  import { order } from "../state/order";
  import UserService from "../services/UserService";

  import { sys } from "../state/system";
  import Modal from "./Modal.vue";

  export default {
    data() {
      return {
        auth,
        order,
        sys,
        modalOpen: false,
      };
    },
    components: {
      Modal,
    },
    created() {},
    methods: {
      goto_pdf() {
        window.open(
          "https://report.zubbsteel.com/tcpdf/pdf/ZQT.php?ref=" + auth.temp_qt
        );
      },
      goto_pdf_middle() {
        window.open(
          "https://report.zubbsteel.com/tcpdf/pdf/ZQT2.php?ref=" + auth.temp_qt
        );
      },
      goto_pdf_mini() {
        window.open(
          "https://report.zubbsteel.com/tcpdf/pdf/ZQT3.php?ref=" + auth.temp_qt
        );
      },
      goto_so() {
        window.open(
          "https://report.zubbsteel.com/tcpdf/pdf/ZORDER_A5.php?ref=" +
            auth.temp_qt
        );
      },
      goto_list() {
        this.$router.push({
          name: "List",
        });
      },
      reRenderNewQT() {
        //  localStorage.setItem("tempqt", nqt.data);
        this.$router.go();
      },
      async newQT() {
        const sale = await UserService.showSale({ emp_code: auth.user_id });
        if (sale.data.length > 0) {
          this.modalOpen = !this.modalOpen;
        } else {
          if (confirm("ยืนยันสร้างใบเสนอราคาใหม่ ?")) {
            sys.loading = true;
            const nqt = await UserService.newQT({
              qt: auth.temp_qt,
              emp_code: auth.user_id,
            });
            sys.loading = false;
            // await console.log("NQT", nqt.data);
            await localStorage.setItem("tempqt", nqt.data);
            await this.$router.go();
          }
        }
      },
      async dupQT() {
        if (
          confirm(
            "ยืนยันสร้างใบเสนอราคาใหม่ ?\nอ้างอิงเอกสารเลขที่ " + auth.temp_qt
          )
        ) {
          sys.loading = true;
          const nqt = await UserService.dupQT({
            qt: auth.temp_qt,
            emp_code: auth.user_id,
          });
          sys.loading = false;
          await this.$router.go();
          await localStorage.setItem("tempqt", nqt.data);
        }
      },
    },
  };
</script>
