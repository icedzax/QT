<template>
  <div class="container">
    <span class="flex justify-center text-xl mt-2">รายการใบนำเสนอราคา</span>
    <div class="flex justify-center">
      <table class="w-3/5 border-collapse mt-2">
        <thead>
          <th class="font-light border border-slate-200 py-2">เลขที่ QT</th>
          <th class="font-light border border-slate-200">ชื่อลูกค้า</th>
          <th class="font-light border border-slate-200">เวลาสร้าง</th>
          <th class="font-light border border-slate-200 w-1/4">
            สถานะการอนุมัติ
          </th>
        </thead>
        <tbody class="text-center">
          <tr v-for="(i, index) in this.data" :key="index">
            <td class="border border-slate-200 p-1">{{ i.QT_ID }}</td>
            <td class="border border-slate-200">{{ i.CUS_NAME }}</td>
            <td class="border border-slate-200">{{ i.CREATE_TIME }}</td>
            <td class="border border-slate-200">{{ i.STS_APP }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: [
        {
          QT_ID: "12123",
          CUS_NAME: "คุณเอ",
          CREATE_TIME: "12.00",
          STS_APP: "none",
        },
        {
          QT_ID: "12124",
          CUS_NAME: "คุณบี",
          CREATE_TIME: "13.00",
          STS_APP: "none",
        },
        {
          QT_ID: "12125",
          CUS_NAME: "คุณซี",
          CREATE_TIME: "14.00",
          STS_APP: "success",
        },
        {
          QT_ID: "12126",
          CUS_NAME: "คุณดี",
          CREATE_TIME: "15.00",
          STS_APP: "success",
        },
        {
          QT_ID: "12127",
          CUS_NAME: "คุณอี",
          CREATE_TIME: "16.00",
          STS_APP: "none",
        },
      ],
    };
  },
};
</script>
<style></style>
