import { reactive } from "vue";
//เอา localstorage Key : id ไปยิง API เพื่อ login

const sys = reactive({
  loading: false,
  itemLoading: false,
});

export { sys };
