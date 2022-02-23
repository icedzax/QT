<template>
  <div class="bg-gray-50">
    <span class="text-indigo-600">{{ getId }}</span>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {
    localStorage.setItem("id", this.getId);
  },
  computed: {
    getId() {
      return this.$route.params.id;
    },
  },
};
</script>
