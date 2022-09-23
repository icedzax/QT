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
  get(payload) {
    return Api().get("fg/" + payload);
  },
  getUOM(body) {
    return Api().post(`/uom`, body);
  },
  searchMATNRbycode(matcode) {
    return Api().post(`/fetchMat`, matcode);
  },
};
