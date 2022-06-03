<template>
  <div class="mx-4">
    <Modal @closeModal="changeSale" :value="modalOpen"></Modal>

    <div
      class="grid overflow-hidden grid-cols-3 grid-rows-1 gap-1 text-left text-xs xl:text-sm p-1 xl:p-0"
    >
      <div
        class="row-start-1 row-span-1 col-start-1 col-span-1 text-left font-semibold"
      >
        ผู้เสนอราคา
      </div>
      <div class="row-start-1 row-span-1 col-start-2 col-span-2 flex">
        <div class="flex items-center relative">
          <span
            @click="this.pos ? changeSale() : ''"
            :class="
              this.pos
                ? 'hover:cursor-pointer hover:border-green-400 hover:bg-green-50 border rounded px-1 '
                : 'border rounded px-1 '
            "
          >
            {{ auth.data_sale.sale_name }}</span
          >
        </div>
        <select
          v-if="isTeamList"
          v-model="soffice"
          @change="selectOption($event)"
          class="mx-5 text-xs p-1 border-none rounded pr-10"
        >
          <option
            v-for="sal in auth.data_sale.team"
            :key="sal.sale_office"
            :value="sal.sale_office"
          >
            {{ sal.sale_team }}
          </option>
        </select>
      </div>

      <div class="row-start-2 row-span-1 col-start-1 col-span-1 font-semibold">
        เบอร์ติดต่อ
      </div>
      <div class="row-start-2 row-span-1 col-start-2 col-span-2">
        {{ auth.data_sale.sale_tele1 }}
      </div>
      <div class="row-start-3 row-span-1 col-start-1 col-span-1 font-semibold">
        มือถือ
      </div>
      <div class="row-start-3 row-span-1 col-start-2 col-span-2">
        {{ auth.data_sale.sale_tele2 }}
      </div>
      <div class="row-start-4 row-span-1 col-start-1 col-span-1 font-semibold">
        แฟ็กซ์
      </div>
      <div class="row-start-4 row-span-1 col-start-2 col-span-2">
        {{ auth.data_sale.sale_fax }}
      </div>
      <div class="row-start-5 row-span-1 col-start-1 col-span-1 font-semibold">
        อีเมลล์
      </div>
      <div class="row-start-5 row-span-1 col-start-2 col-span-2">
        {{ auth.data_sale.sale_email }}
      </div>
      <div class="row-start-6 row-span-1 col-start-1 col-span-1 font-semibold">
        ไอดีไลน์
      </div>
      <div class="row-start-6 row-span-1 col-start-2 col-span-2">
        {{ auth.data_sale.sale_line }}
      </div>
    </div>
  </div>
</template>
<script>
import UserService from "@/services/UserService";
import { auth } from "../state/user";
import Pen from "./Pen.vue";
import Modal from "./Modal.vue";

export default {
  components: {
    Pen,
    Modal,
  },
  data() {
    return {
      modalOpen: false,
      auth,
      selected: 0,
      pos: false,
    };
  },
  props: {
    soffice: {
      type: Number,
      default: 0,
    },
  },
  created() {
    //console.log("Data User:", auth);
    this.checkAdmin();
  },
  computed: {
    isTeamList() {
      if (auth.data_sale.team) {
        return auth.data_sale.team.length > 1 ? true : false;
      } else {
        return false;
      }
    },
  },
  methods: {
    async checkAdmin() {
      const us = await UserService.isSale({
        emp_code: auth.user_id,
      });
      if (us.data) {
        this.pos = true;
        const setnewSale = await UserService.getSalebyad(auth.user_id);
        const lastQT = await UserService.selectSale({
          sale_code: setnewSale.data[0].sale_code,
        });
        let calQT = lastQT.data[0].qt.slice(-3);
        let newQ = "";
        let QT = "";
        if (calQT.slice(0, 1) == 0) {
          newQ = parseInt(calQT) + 1;
          QT = 0 + newQ.toString();
          newQ = QT;
        } else {
          newQ = parseInt(calQT) + 1;
          newQ = newQ.toString();
        }
        let newQT = lastQT.data[0].qt.slice(0, 11) + newQ;
        auth.temp_qt = newQT;
      }
    },

    changeSale() {
      this.modalOpen = !this.modalOpen;
    },
    selectOption(event) {
      const v_office = auth.data_sale.team
        .filter((item) => item.sale_office == event.target.value)
        .map((data) => {
          return {
            qt: auth.temp_qt,
            sale_office: data.sale_office,
            sale_team: data.sale_team,
          };
        });
      console.log(v_office[0]);
      UserService.setSalOff(v_office[0]);
    },
  },
};
</script>
