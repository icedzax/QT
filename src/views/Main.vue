<template>
  <div class="mx-5 lg:container">
    <div
      class="box grid overflow-hidden grid-cols-2 xl:grid-cols-3 grid-rows-2 gap-2 flex-wrap mt-1"
    >
      <div class="h-auto row-start-1 row-span-2 col-start-1 col-span-2">
        <Header></Header>
      </div>
      <div
        class="row-start-6 xl:row-start-1 xl:row-span-2 xl:col-start-3 xl:col-span-1 xl:h-24 invisible xl:visible"
      >
        <Header_r></Header_r>
      </div>
    </div>

    <div
      class="boxi h-auto flex justify-center xl:hidden -mt-40 sm:-mt-32 md:-mt-32 lg:-mt-24"
    >
      <Header_r></Header_r>
    </div>
    <!--  ก้อนผู้เสนอราคาและลูกค้า  -->
    <div
      class="box grid overflow-hidden grid-cols-2 grid-rows-2 gap-2 flex-wrap mt-1"
    >
      <div
        class="row-start-1 row-span-5 col-start-1 col-span-2 md:col-span-1 h-auto"
      >
        <Sale :soffice="order.sale_office"></Sale>
      </div>
      <div
        class="row-span-5 col-start-1 col-span-2 md:col-start-2 md:col-span-1 h-auto"
      >
        <Customer :customername="chk_cus" :statusApp="approved"></Customer>
      </div>
    </div>
    <!--  ก้อนรายการสินค้า  -->
    <div
      class="box grid overflow-y-visible grid-cols-1 grid-rows-1 gap-1 flex-wrap mt-1"
    >
      <div class="h-auto row-start-1 row-span-5 col-start-1 col-span-2 pb-5">
        <Orders :mat="this.mat_param"></Orders>
      </div>
    </div>
    <!--  ก้อนเงื่อนไขและสรุปรายการ  -->
    <div
      class="box grid overflow-hidden grid-cols-2 xl:grid-cols-3 grid-rows-2 gap-2 flex-wrap mt-1"
    >
      <div
        class="row-start-1 row-span-5 col-start-1 col-span-2 xl:col-span-2 h-auto"
      >
        <Rule :sw="sumw" :pship="order.ship" :pterm="order.term"></Rule>
      </div>
      <div class="row-span-5 col-start-1 col-span-2 xl:col-start-3 h-auto">
        <Total :sp="sump" :vat="chk_vat" :tf="sumtf"></Total>
      </div>
    </div>
    <!--  ก้อนลายเซนต์  -->
    <div
      class="box grid overflow-hidden grid-cols-1 grid-rows-1 gap-1 flex-wrap mt-1 mb-1"
    >
      <div class="row-start-1 row-span-5 col-start-1 col-span-2 h-auto">
        <License></License>
      </div>
    </div>

    <!-- <div>{{ chk_vat }}</div> -->
  </div>
  <!--  change file name  -->
</template>
<script>
import Header from "../components/header.vue";
import Header_r from "../components/header_right.vue";
import Sale from "../components/Sales.vue";
import Customer from "../components/Customer.vue";
import Orders from "../components/Order2.vue";
import Rule from "../components/Rule.vue";
import Total from "../components/Total.vue";
import License from "../components/License.vue";

import { order } from "../state/order";
import { cus } from "../state/cus";
import { auth } from "../state/user";

import UserService from "../services/UserService.js";
import FgService from "../services/FgService";
import OrderService from "../services/OrderService.js";
import CusService from "../services/CusService";

export default {
  data() {
    return {
      auth,
      order,
      sumweight: 0,
      sumprice: 0,
      sumtranf: 0,
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
  props: {
    mat_param: {
      type: String,
      default: null,
    },
  },
  components: {
    Header,
    Sale,
    Customer,
    Orders,
    Rule,
    Total,
    License,
    Header_r,
  },
  async created() {
    // console.log("### ROUTE ###", this.$route.params.list_qt);
    // console.log("### LOCAL TMPQT ###", localStorage.getItem("tempqt"));

    let initQT;
    if (this.$route.params.list_qt === undefined) {
      initQT = localStorage.getItem("tempqt");
    } else {
      initQT = this.$route.params.list_qt;
    }
    // localStorage.setItem("tempqt", null);
    let us = await UserService.temp({ emp: auth.user_id });
    // console.log("qt:::", us.data[0]);

    let sale = await UserService.isSale({ emp_code: auth.user_id });
    if (sale.data) {
      auth.position = "Admin";
    } else {
      auth.position = "Sale";
    }
    if (initQT) {
      us = await UserService.tempQT({
        emp: auth.user_id,
        qt: initQT,
      });
    }

    // console.log("### init ###", us.data[0]);
    if (us.data[0]) {
      auth.temp_qt = us.data[0].qt;
      localStorage.setItem("tempqt", auth.temp_qt);
      order.kunnr = us.data[0].KUNNR;
      order.date = us.data[0].qt_date;
      order.status = us.data[0].status;
      order.sale_office = us.data[0].sale_office;
      order.sale_team = us.data[0].sale_team;
      order.term = us.data[0].term;
      order.ship = us.data[0].ship;
      order.price_validity = us.data[0].price_validity;
      order.cust = {
        KUNNR: us.data[0].KUNNR,
        LAND1: us.data[0].LAND1,
        CNAME: us.data[0].CNAME,
        TELNU: us.data[0].TELNU,
        TELFX: us.data[0].TELFX,
        FAXNU: us.data[0].FAXNU,
        TAXNO: us.data[0].TAXNO,
        EMAIL: us.data[0].EMAIL,
        ADDRS: us.data[0].ADDRS,
        MOBILE: us.data[0].MOBILE,
        CONTACTNAME: us.data[0].CONTACTNAME,
      };
      order.plant = us.data[0].plant;
    }

    if (auth.temp_qt) {
      const items = await FgService.items(auth.temp_qt);
      //const data_sale = await UserService.sale(auth.user_id);
      // console.log(auth.temp_qt);
      let arrTemp = auth.temp_qt.split("-");
      const data_sale = await UserService.sale_test(arrTemp[1]);

      const data_con = await OrderService.Con(auth.temp_qt);

      const data_cus = await CusService.postCus({ KUNNR: order.kunnr });

      if (data_con.data[0]) {
        order.con = data_con.data;
      }
      //console.log("dataSale:", data_sale);
      auth.data_sale = data_sale.data;
      if (data_cus.data[0]) {
        cus.data = data_cus.data[0];
        // console.log("look-kha=>", cus.data);
      }

      // if ((auth.saleOrg = 1000)) {
      //   this.tprice = this.type.retail;
      // } else if ((state.user.saleOrg = 2000)) {
      //   this.tprice = this.type.Wholesale;
      // }
      this.tprice = this.type.retail;

      if (items.data) {
        order.list = items.data;
      }

      const v_vat = await CusService.findVAT({ qt: initQT });
      cus.vat = v_vat.data[0].vat;
      if (cus.vat == 1) {
        cus.vat = 0.07;
      } else {
        cus.vat = 0;
      }
    }
  },
  computed: {
    oo() {
      return order.list;
    },
    sumw() {
      this.sumweight = 0;

      if (order.list) {
        order.list.map((data) => {
          let price_item = data.amount * data.rmd_weight;
          this.sumweight = this.sumweight + parseFloat(price_item);
        });
      }
      return this.sumweight;
    },
    sump() {
      this.sumprice = 0;

      if (order.list) {
        order.list.map((data) => {
          if (data.rmd_mat !== "TRANSPORT") {
            if (data.cal_price && data.cal_price.length > 3) {
              data.cal_price = this.data.cal_price;
            }
            this.sumprice = this.sumprice + parseFloat(data.cal_price);
            // if (data.cal_price && data.cal_price.length > 3) {
            //   data.cal_price = this.addComma(data.cal_price);
            // }
          }
        });
      }
      return this.sumprice;
    },
    sumtf() {
      this.sumtranf = 0;
      order.list.map((data) => {
        if (data.rmd_mat === "TRANSPORT") {
          this.sumtranf = this.sumtranf + parseFloat(data.cal_price);
          // if (data.cal_price && data.cal_price.length > 3) {
          //   data.cal_price = this.addComma(data.cal_price);
          // }
        }
      });
      return this.sumtranf;
    },
    approved() {
      const app = order.status;
      // console.log(app);
      return app;
    },
    chk_cus() {
      return cus.name;
    },
    chk_vat() {
      return cus.vat;
    },
  },
  methods: {},
};
</script>
<style>
.box {
  @apply bg-white
  p-2
  min-w-full
  shadow

  min-h-full
  rounded;
}
.boxi {
  @apply bg-white
  p-2
  min-w-full
  shadow
  min-h-full
  rounded-b;
}
</style>
