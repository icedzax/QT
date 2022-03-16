import { reactive } from "vue";

const order = reactive({
  list: [],
  status: false,
  rules: [],
});

export { order };
