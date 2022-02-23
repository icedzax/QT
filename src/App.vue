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
import UserService from "./services/UserService";
import { auth } from "./state/user";

export default {
  data() {
    return {
      auth,
    };
  },
  async created() {
    //this.State = result.data;
    // if (auth.steel.length === 0) {
    let result = await UserService.index();
    auth.steel = result.data;
    // }

    //console.log(auth.steel);

    // this.setState({ steel: result.data });
  },
};
</script>
