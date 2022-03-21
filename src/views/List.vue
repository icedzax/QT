<template>
  <div class="container">
    <span class="flex justify-center text-xl mt-2">รายการใบนำเสนอราคา</span>
    <div class="flex justify-center">
      <table class="w-3/5 border-collapse mt-2">
        <thead>
          <th class="font-light border border-slate-200 py-2">เลขที่ QT</th>
          <th class="font-light border border-slate-200">ชื่อลูกค้า</th>
          <th class="font-light border border-slate-200">เวลาสร้าง</th>
          <th class="font-light border border-slate-200 w-1/4">
            สถานะการอนุมัติ
          </th>
        </thead>
        <tbody class="text-center">
          <tr v-for="(i, index) in this.AllList" :key="index">
            <td class="border border-slate-200 p-1">{{ i.QT }}</td>
            <td class="border border-slate-200 p-1">{{ i.CNAME }}</td>
            <td class="border border-slate-200 p-1">{{}}</td>
            <td class="border border-slate-200 p-1">
              <div class="flex justify-center">
                <svg
                  v-if="i.status == 'รออนุมัติ'"
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 50 50"
                  style="enable-background: new 0 0 50 50"
                  xml:space="preserve"
                  class="w-5 cursor-default"
                >
                  <circle style="fill: #efce4a" cx="25" cy="25" r="25" />
                  <line
                    style="
                      fill: none;
                      stroke: #ffffff;
                      stroke-width: 2;
                      stroke-linecap: round;
                      stroke-miterlimit: 10;
                    "
                    x1="25"
                    y1="10"
                    x2="25"
                    y2="32"
                  />
                  <line
                    style="
                      fill: none;
                      stroke: #ffffff;
                      stroke-width: 2;
                      stroke-linecap: round;
                      stroke-miterlimit: 10;
                    "
                    x1="25"
                    y1="37"
                    x2="25"
                    y2="39"
                  />
                </svg>

                <svg
                  v-else-if="i.status == 'อนุมัติแล้ว'"
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 50 50"
                  style="enable-background: new 0 0 50 50"
                  xml:space="preserve"
                  class="w-5 h-6 cursor-default"
                >
                  <circle style="fill: #25ae88" cx="25" cy="25" r="25" />
                  <polyline
                    style="
                      fill: none;
                      stroke: #ffffff;
                      stroke-width: 2;
                      stroke-linecap: round;
                      stroke-linejoin: round;
                      stroke-miterlimit: 10;
                    "
                    points="
	38,15 22,33 12,25 "
                  />
                </svg>
                <svg
                  v-else
                  version="1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  enable-background="new 0 0 48 48"
                  class="w-5 cursor-default"
                >
                  <polygon fill="#BA55D3" points="40,45 8,45 8,3 30,3 40,13" />
                  <polygon fill="#E1F5FE" points="38.5,14 29,14 29,4.5" />
                  <g fill="#FFFFFF">
                    <rect x="16" y="21" width="17" height="2" />
                    <rect x="16" y="25" width="13" height="2" />
                    <rect x="16" y="29" width="17" height="2" />
                    <rect x="16" y="33" width="13" height="2" />
                  </g>
                </svg>
                <span> {{ i.status }}</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import UserService from "@/services/UserService";
import { auth } from "@/state/user";
export default {
  data() {
    return {
      list_au: [],
    };
  },
  computed: {
    AllList() {
      return this.list_au;
    },
  },
  async created() {
    const data_list = await UserService.list({ emp_code: auth.user_id });
    this.list_au = data_list.data;
    this.list_au.map((data) => {
      if (data.status == "TEMP") {
        data.status = "แบบร่าง";
      } else if (data.status == "A") {
        data.status = "อนุมัติแล้ว";
      } else if (data.status == "W") {
        data.status = "รออนุมัติ";
      }
    });
  },
};
</script>
<style type="text/css">
.st0 {
  /* fill: #da70d6; */
  stroke: #da70d6;
}
</style>
