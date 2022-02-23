import { reactive } from "vue";
//เอา localstorage Key : id ไปยิง API เพื่อ login

const auth = reactive({
  user: {}, //ถ้า login สำเร็จให้เป็นให้เอา data ของ user ที่ได้จาก api มาใส่
  status: false, //ถ้า login สำเร็จให้เป็น true
});

export { auth };
