import Api from "../services/Api";

export default {
  getPrice(p) {
    return Api().post(`/price`, p);
  },
  insert(p) {
    return Api().post(`/insert`, p);
  },
  items(qt) {
    return Api().get("items/" + qt);
  },
  search(payload) {
    return Api().post("fgs", payload);
  },
};
