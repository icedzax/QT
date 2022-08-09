<template>
  <div class="mx-4">
    <div
      class="grid grid-cols-3 grid-rows-1 gap-1 overflow-hidden p-1 text-left text-xs xl:p-0 xl:text-sm"
    >
      <div
        class="col-span-1 col-start-1 row-span-1 row-start-1 text-left font-semibold"
      >
        ผู้เสนอราคา
      </div>
      <div class="col-span-2 col-start-2 row-span-1 row-start-1 flex">
        <div>{{ auth.data_sale.sale_name }}</div>
        <select
          v-if="isTeamList"
          v-model="soffice"
          @change="selectOption($event)"
          class="mx-5 rounded border-none p-1 pr-10 text-xs"
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

      <div class="col-span-1 col-start-1 row-span-1 row-start-2 font-semibold">
        เบอร์ติดต่อ
      </div>
      <div class="col-span-2 col-start-2 row-span-1 row-start-2">
        {{ auth.data_sale.sale_tele1 }}
      </div>
      <div class="col-span-1 col-start-1 row-span-1 row-start-3 font-semibold">
        มือถือ
      </div>
      <div class="col-span-2 col-start-2 row-span-1 row-start-3">
        {{ auth.data_sale.sale_tele2 }}
      </div>
      <div class="col-span-1 col-start-1 row-span-1 row-start-4 font-semibold">
        แฟ็กซ์
      </div>
      <div class="col-span-2 col-start-2 row-span-1 row-start-4">
        {{ auth.data_sale.sale_fax }}
      </div>
      <div class="col-span-1 col-start-1 row-span-1 row-start-5 font-semibold">
        อีเมลล์
      </div>
      <div class="col-span-2 col-start-2 row-span-1 row-start-5">
        {{ auth.data_sale.sale_email }}
      </div>
      <div class="col-span-1 col-start-1 row-span-1 row-start-6 font-semibold">
        ไอดีไลน์
      </div>
      <div class="col-span-2 col-start-2 row-span-1 row-start-6">
        {{ auth.data_sale.sale_line }}
      </div>
    </div>
  </div>
</template>
<script>
import UserService from "@/services/UserService";
import { auth } from "../state/user";
import { order } from "../state/order";

export default {
  data() {
    return {
      auth,
      order,
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
  created() {},
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
      order.sale_office = v_office[0].sale_office;
      UserService.setSalOff(v_office[0]);
    },
  },
};
</script>
