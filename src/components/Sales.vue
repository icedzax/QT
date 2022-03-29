<template>
  <div class="container">
    <div
      class="grid overflow-hidden grid-cols-3 grid-rows-1 gap-1 text-left text-xs xl:text-sm p-1 xl:p-0"
    >
      <div
        class="row-start-1 row-span-1 col-start-1 col-span-1 text-left font-semibold"
      >
        ผู้เสนอราคา
      </div>
      <div class="row-start-1 row-span-1 col-start-2 col-span-2 flex">
        <div>{{ auth.data_sale.sale_name }}</div>
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

export default {
  data() {
    return {
      auth,

      selected: 0,
    };
  },
  props: {
    soffice: {
      type: Number,
      default: 0,
    },
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
