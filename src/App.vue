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
      auth.pos = localStorage.getItem("sub_position");
    } else {
      localStorage.setItem("tempqt", null);
    }
  },
  methods: {},
};
</script>
<style></style>
