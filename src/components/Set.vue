<template>
  <div class="bg-gray-50">
    <span class="text-indigo-600">{{ getId }}</span>
  </div>
</template>
<script>
import UserService from "../services/UserService";
import { auth } from "../state/user";

export default {
  data() {
    return { resultii: [] };
  },
  mounted() {
    localStorage.setItem("id", this.getId);
  },
  computed: {
    getId() {
      return this.$route.params.id;
    },
  },
  async created() {
    let arr_id = { emp_code: this.getId };
    let arr_info = [];
    let name = "";
    let position = "";
    let result = await UserService.getUser(arr_id);
    auth.user = result.data;
    arr_info = result.data;

    arr_info.map((data) => {
      name = data.emp_name;
      position = data.position_name;
    });
    localStorage.setItem("emp_name", name);
    localStorage.setItem("position_name", position);
  },
};
</script>
