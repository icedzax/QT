import { reactive } from "vue";
//เอา localstorage Key : id ไปยิง API เพื่อ login

const auth = reactive({
  user: null,
  user_id: null,
  temp_qt: null,
  status: false,
});

export { auth };
