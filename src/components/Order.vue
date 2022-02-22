<template>
  <div class="container">
    <table class="table-fix w-full">
      <thead class="w-full">
        <tr class="w-full mb-4">
          <th
            class="font-light border-b border-slate-300 w-2/12 text-xs md:text-sm"
          >
            ลำดับ
          </th>
          <th
            class="font-light border-b border-slate-300 w-4/12 text-xs md:text-sm"
          >
            รายการสินค้า
          </th>
          <th
            class="font-light border-b border-slate-300 w-1/12 text-xs md:text-sm"
          >
            น้ำหนักหน่วย +/-
          </th>
          <th
            class="font-light border-b border-slate-300 w-2/12 text-xs md:text-sm"
          >
            จำนวนหน่วย
          </th>
          <th
            class="font-light border-b border-slate-300 w-2/12 text-xs md:text-sm"
          >
            ราคาต่อหน่วยก่อน VAT 7%
          </th>
          <th
            class="font-light border-b border-slate-300 w-2/12 text-xs md:text-sm"
          >
            จำนวนเงิน
          </th>
        </tr>
      </thead>
      <!-- Remove the nasty inline CSS fixed height on production and replace it with a CSS class — this is just for demonstration purposes! -->
      <tbody class="bg-grey-light w-full">
        <tr
          class="full mb-4"
          v-for="(item, index) in this.data_item"
          :key="index"
        >
          <td class="py-1 w-2/12 text-center text-xs md:text-sm">
            {{ item.No }}
          </td>
          <td class="py-1 w-4/12 text-center text-xs md:text-sm">
            {{ item.Product }}
          </td>
          <td class="py-1 w-1/12 text-center text-xs md:text-sm">
            <p>{{ item.Weight }}</p>
          </td>
          <td class="py-1 w-2/12 text-center text-xs md:text-sm">
            <p>{{ item.Num }}</p>
          </td>
          <td class="py-1 w-2/12 text-center text-xs md:text-sm">
            <p>{{ item.VAT }}</p>
          </td>
          <td class="py-1 w-2/12 text-center text-xs md:text-sm">
            <p>{{ item.Total }}</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data_item: [
        {
          No: "1 PRC1010190",
          Product: "ท่อดำ 1/2''x1.9มม(ขี+ข)(ดี)",
          Weight: "116.16",
          Num: "22.00 PC",
          VAT: "101.00",
          Total: "2222.00",
        },
        {
          No: "2 PRC1038290",
          Product: "ท่อดำ 1 1/2''x2.9มม(ม+ข)",
          Weight: "474",
          Num: "24.00 PC",
          VAT: "355.00",
          Total: "18.50",
        },
        {
          No: "2 PRC1038290",
          Product: "ท่อดำ 1 1/2''x2.9มม(ม+ข)",
          Weight: "474",
          Num: "24.00 PC",
          VAT: "355.00",
          Total: "499.00",
        },
        {
          No: "2 PRC1038290",
          Product: "ท่อดำ 1 1/2''x2.9มม(ม+ข)",
          Weight: "474",
          Num: "24.00 PC",
          VAT: "355.00",
          Total: "8520.00",
        },
        {
          No: "2 PRC1038290",
          Product: "ท่อดำ 1 1/2''x2.9มม(ม+ข)",
          Weight: "474",
          Num: "24.00 PC",
          VAT: "355.00",
          Total: "8520.00",
        },
        {
          No: "2 PRC1038290",
          Product: "ท่อดำ 1 1/2''x2.9มม(ม+ข)",
          Weight: "474",
          Num: "24.00 PC",
          VAT: "355.00",
          Total: "8520.00",
        },
        {
          No: "3 PRC1038290",
          Product: "ท่อดำ 1 1/2''x2.9มม(ม+ข)",
          Weight: "474",
          Num: "24.00 PC",
          VAT: "355.00",
          Total: "8520.00",
        },
      ],
    };
  },
};
</script>
