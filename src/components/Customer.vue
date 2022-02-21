<template>
  <div class="container">
    <div
      class="grid overflow-hidden grid-cols-4 grid-rows-1 gap-1 text-xs xl:text-sm p-1 xl:p-0"
    >
      <div class="font-semibold">ลูกค้า</div>
      <div class="col-span-3">{{ this.customer_name }}</div>
      <div><p class="h-10 font-semibold">ที่อยู่</p></div>
      <div class="col-span-3 border-2 border-gray-200 rounded">
        <p class="h-10">{{ this.address }}</p>
      </div>
      <div class="font-semibold">ชื่อผู้ติดต่อ</div>
      <div class="col-span-3">{{ this.contact_name }}</div>
      <div class="font-semibold">เบอร์ติดต่อ</div>
      <div>{{ this.tel }}</div>
      <div class="font-semibold">มือถือ</div>
      <div>{{ this.phone }}</div>
      <div class="font-semibold">โทรสาร</div>
      <div>{{ this.fax }}</div>
      <div class="font-semibold">อีเมลล์</div>
      <div>{{ this.email }}</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      customer_name: "One-Time Account (Domestic Customer)",
      address: "",
      contact_name: "สมพร พฤติวานิชกุล",
      tel: "",
      phone: "0814448333",
      fax: "",
      email: "",
    };
  },
};
</script>
