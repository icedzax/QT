import Api from "../services/Api";

export default {
  getPrice(p) {
    return Api().post(`/price`, p);
  },
};
