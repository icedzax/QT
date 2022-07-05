<template>
  <div class="mx-4 h-auto">
    <div
      class="grid overflow-hidden grid-cols-2 lg:grid-cols-3 grid-rows-1 gap-0.5"
    >
      <div class="row-start-1 row-span-1 col-start-1 col-span-2 lg:col-span-5">
        <div class="grid overflow-hidden grid-cols-5 grid-rows-1 gap-0.5">
          <div class="row-start-1 row-span-1 col-start-1 col-span-1 h-10">
            <img src="../img/ZUBBLOGO.jpg" alt="" class="w-auto h-auto mt-2" />
          </div>
          <div
            class="row-start-1 row-span-1 col-start-2 col-span-3 font-bold text-base sm:text-2xl mt-1 md:ml-20 text-center"
          >
            บริษัท เหล็กทรัพย์ จำกัด
          </div>
          <div class="row-start-1 row-span-2 col-span-1">
            <img src="../img/QR.png" alt="" class="w-auto h-auto md:h-20" />
          </div>
          <div class="mt-4 flex justify-inline col-span-3">
            <label class="mr-4">ขึ้นของที่ </label>
            <select
              :disabled="
                order.status == 'A' ||
                order.status == 'C' ||
                order.status == 'W'
              "
              v-model="Selectplant"
              @change="postPlant"
            >
              <option v-for="item in this.PLANT" :key="item.plant">
                {{ item.plant }} - {{ item.name }}
              </option>
            </select>
            <div hidden>{{ pplant }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import OrderService from "../services/OrderService.js";
import { auth } from "../state/user";
import { order } from "../state/order";

export default {
  data() {
    return {
      Selectplant: "",
      auth,
      order,
      PLANT: [
        { plant: "1010", name: "ZUBB" },
        { plant: "1020", name: "OPS" },
        { plant: "2010", name: "OCP" },
        { plant: "1040", name: "SPS" },
        { plant: "1050", name: "WPN" },
        { plant: "3030", name: "MMT" },
      ],
    };
  },
  created() {
    this.pplant;
  },
  computed: {
    pplant() {
      let showplant = "1010 - ZUBB";
      console.log("ODP:", order.plant);
      if (order.plant) {
        const p = this.PLANT.filter((x) => x.plant == order.plant);
        showplant = p[0].plant + " - " + p[0].name;
      }
      this.Selectplant = showplant;
      console.log("sss", this.Selectplant);
      return showplant;
    },
  },
  methods: {
    async postPlant() {
      const data = this.Selectplant.split("-");

      let code_plant = data[0];
      order.plant = parseInt(code_plant);
      await OrderService.postplant({ plant: code_plant, qt: auth.temp_qt });
    },
  },
};
</script>
