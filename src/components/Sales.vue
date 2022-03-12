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
      <div class="row-start-1 row-span-1 col-start-2 col-span-2">
        {{ this.bid_name }}
      </div>
      <div class="row-start-2 row-span-1 col-start-1 col-span-1 font-semibold">
        เบอร์ติดต่อ
      </div>
      <div class="row-start-2 row-span-1 col-start-2 col-span-2">
        {{ this.tel }}
      </div>
      <div class="row-start-3 row-span-1 col-start-1 col-span-1 font-semibold">
        มือถือ
      </div>
      <div class="row-start-3 row-span-1 col-start-2 col-span-2">
        {{ this.phone }}
      </div>
      <div class="row-start-4 row-span-1 col-start-1 col-span-1 font-semibold">
        แฟ็กซ์
      </div>
      <div class="row-start-4 row-span-1 col-start-2 col-span-2">
        {{ this.fax }}
      </div>
      <div class="row-start-5 row-span-1 col-start-1 col-span-1 font-semibold">
        อีเมลล์
      </div>
      <div class="row-start-5 row-span-1 col-start-2 col-span-2">
        {{ this.email }}
      </div>
      <div class="row-start-6 row-span-1 col-start-1 col-span-1 font-semibold">
        ไอดีไลน์
      </div>
      <div class="row-start-6 row-span-1 col-start-2 col-span-2">
        {{ this.lineID }}
      </div>
    </div>
  </div>
</template>
<script>
import { auth } from "../state/user";
import UserService from "../services/UserService";

export default {
  data() {
    return {
      bid_name: auth.data_sale.sale_name,
      tel: auth.data_sale.sale_tele1,
      phone: auth.data_sale.sale_tele2,
      fax: auth.data_sale.sale_fax,
      email: auth.data_sale.sale_email,
      lineID: auth.data_sale.sale_line,
    };
  },
  async created() {
    let data_sale = await UserService.sale(auth.user_id);
    auth.data_sale = data_sale.data;
  },
};
</script>
