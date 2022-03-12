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
import UserService from "./services/UserService.js";
import FgService from "./services/FgService";
export default {
  data() {
    return {
      fg,
      auth,
    };
  },
  async created() {
    if (!auth.user_id) {
      auth.user_id = localStorage.getItem("id");
      auth.user = localStorage.getItem("emp_name");
    }
    const us = await UserService.temp(auth.user_id);
    if (us.data[0]) {
      auth.temp_qt = await us.data[0].qt;
    }

    if (auth.temp_qt) {
      const items = await FgService.items(auth.temp_qt);
      const data_sale = await UserService.sale(auth.user_id);
      auth.data_sale = data_sale.data;
      console.log(auth);
      if (items.data[0]) {
        order.list = items.data;
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
};
</script>
