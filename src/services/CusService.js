import Api from "../services/Api";

export default {
  search(body) {
    return Api().post(`/CusSearch/`, body);
  },
  select(body) {
    return Api().post(`/CusSelect/`, body);
  },
  show(userId) {
    return Api().get("user/" + userId);
  },
  postCus(body) {
    return Api().post(`/getCus/`, body);
  },
  post(userId) {
    return Api().post("auth/", userId);
  },
  setCus(body) {
    return Api().post(`setCus/`, body);
  },
  push() {
    return Api().push("user/", user.id, user);
  },
  delete() {
    return Api().delete("user/", user.id, user);
  },
  findVAT(qt) {
    return Api().post("getHeader/", qt);
  },
  updateVAT(body) {
    return Api().post("updateVAT/", body);
  },
  searchCUSbycode(input) {
    return Api().post("fetchCus/", input);
  },
};
