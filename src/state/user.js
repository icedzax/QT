import { reactive } from "vue";
//เอา localstorage Key : id ไปยิง API เพื่อ login

const auth = reactive({
  user: {},
  status: false,
});

export { auth };
