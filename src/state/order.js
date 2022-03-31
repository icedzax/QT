import { reactive } from "vue";

const order = reactive({
  list: [],
  status: false,
  con: [],
  kunnr: null,
  date: null,
  cust: {},
});

export { order };
