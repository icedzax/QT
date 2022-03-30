<template>
  <tr v-show="data.show || data.REMARK" class="bg-grey-light w-full">
    <td
      class="py-1 w-1/12 text-center text-xs md:text-sm border border-slate-200"
    >
      <input
        type="text"
        class="tdi w-5/6 text-xs p-1 text-center border-none text-gray-400"
        :value="'หมายเหตุ'"
        disabled
      />
    </td>
    <td
      colspan="8"
      class="py-1 w-full text-xs md:text-sm border border-slate-200"
    >
      <input
        type="text"
        class="w-full text-xs p-1 text-left border-none focus:outline-none"
        :value="data.REMARK"
      />
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: {},
    },
  },
};
</script>

<style></style>
