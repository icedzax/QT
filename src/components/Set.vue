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
    let subPosition = "";
    let subP = "Sale";
    let result = await UserService.getUser(arr_id);
    auth.user = result.data;
    arr_info = result.data;

    const us = await UserService.isSale({
      emp_code: this.getId,
    });
    if (us.data) {
      subP = "Admin";
    }
    console.log(arr_info);
    arr_info.map((data) => {
      name = data.emp_name;
      position = data.position_name;
      subPosition = subP;
    });
    auth.pos = subP;
    localStorage.setItem("emp_name", name);
    localStorage.setItem("position_name", position);
    localStorage.setItem("sub_position", subPosition);
  },
};
</script>
