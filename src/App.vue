<script setup>
import { ref } from "vue";

let counter = ref(0);

setInterval(() => {
  counter.value++;
}, 1000);
</script>

<template>
  <div>
    <header class="bg-white shadow" v-if="$route.meta.title">
      <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1
          @click="counter = 0"
          class="text-3xl font-bold leading-tight text-gray-900"
        >
          {{ $route.meta.title }} / {{ counter }}
        </h1>
      </div>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>
<script>
import { fg } from "./state/fg";
import { auth } from "./state/user";
import { order } from "./state/order";
import { cus } from "./state/cus";
import UserService from "./services/UserService.js";
import FgService from "./services/FgService";
import OrderService from "./services/OrderService.js";
import CusService from "./services/CusService";

export default {
  data() {
    return {
      fg,
      auth,
      cus,
      tprice: [],
      type: {
        retail: ["R1:ราคาสดรับเอง", "R2:ราคาสดส่ง", "R3:ราคาเงินเชื่อ"],
        Wholesale: [
          "T1:100 ตัน",
          "W0:ราคายกรถ",
          "W1:ราคาคละไซด์",
          "W2:ราคายกมัด",
          "W3:ราคาปลีก",
        ],
      },
    };
  },
  async created() {
    if (!auth.user_id) {
      auth.user_id = localStorage.getItem("id");
      auth.user = localStorage.getItem("emp_name");
    }
    const us = await UserService.temp(auth.user_id);
    console.log(us);
    if (us.data[0]) {
      auth.temp_qt = await us.data[0].qt;
      order.kunnr = await us.data[0].KUNNR;
    }

    if (auth.temp_qt) {
      const items = await FgService.items(auth.temp_qt);
      const data_sale = await UserService.sale(auth.user_id);
      const data_con = await OrderService.Con(auth.temp_qt);

      const data_cus = await CusService.postCus({ KUNNR: order.kunnr });

      if (data_con) {
        order.con = data_con.data;
      }
      auth.data_sale = data_sale.data;
      cus.address = data_cus.data[0].ADDRS;
      cus.KUNNR = data_cus.data[0].KUNNR;
      cus.name = data_cus.data[0].CNAME;

      if ((auth.saleOrg = 1000)) {
        this.tprice = this.type.retail;
      } else if ((state.user.saleOrg = 2000)) {
        this.tprice = this.type.Wholesale;
      }

      if (items.data[0]) {
        order.list = items.data;

        this.tprice.map((x) => {
          order.list.map((y) => {
            const t_type = x.includes(y.ptype);
            if (t_type) {
              y.ptype = x;
            }
            y.cal_price = y.cal_price.toString();
            y.price_unit = y.price_unit.toString();
            if (y.cal_price.length > 3) {
              y.cal_price = this.addComma(y.cal_price);
            }
            if (y.price_unit.length > 3) {
              y.price_unit = this.addComma(y.price_unit);
            }
          });
        });
      }
    }

    // const temp = await FgService.temp(auth.user_id);
    // if (temp.data[0]) {
    //   auth.temp_qt = temp.data.qt;
    // }
    //this.State = result.data;
    // if (auth.steel.length === 0) {
    // }
    //console.log(auth.steel);
    // this.setState({ steel: result.data });
  },
  methods: {
    addComma(a) {
      let x = a.split(".");
      let x1 = x[0];

      let x2 = x.length > 1 ? "." + x[1] : "";

      var rgx = /(\d+)(\d{3})/;

      while (rgx.test(x1)) {
        x1 = x1.replace(rgx, "$1" + "," + "$2");
      }
      let aa = x1 + x2;
      return aa;
    },
  },
};
</script>
