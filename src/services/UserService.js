import Api from "../services/Api";

export default {
  fgList() {
    return Api().get("/Fg");
  },
  show(userId) {
    return Api().get("user/" + userId);
  },
  temp(payload) {
    return Api().get("temp/" + payload.emp);
  },
  tempQT(payload) {
    return Api().get("tempQT/" + payload.emp + "/" + payload.qt);
  },
  setSalOff(payload) {
    return Api().post("setSaleOffice", payload);
  },
  sale(empcode) {
    return Api().get("sale/" + empcode);
  },
  sale_test(sale_code) {
    return Api().get("sale_test/" + sale_code);
  },
  getUser(userId) {
    return Api().post("auth/", userId);
  },
  push() {
    return Api().push("user/", user.id, user);
  },
  delete() {
    return Api().delete("user/", user.id, user);
  },
  list(body) {
    return Api().post("qtList/", body);
  },
  filterlist(body) {
    return Api().post("qtList_filter", body);
  },
  filterCustomer(body) {
    return Api().post("qtList_customers", body);
  },
  newQT(body) {
    return Api().post("newQT/", body);
  },
  del(body) {
    return Api().post("delQT/", body);
  },
  showSale(body) {
    return Api().post("adminList/", body);
  },
  getEMP(body) {
    return Api().post("saleEMP/", body);
  },
  selectSale(body) {
    return Api().post("LastQT/", body);
  },
  newQT_ad(body) {
    return Api().post("newQT_admin/", body);
  },
  activeAd(body) {
    return Api().post("activeAdmin/", body);
  },
  newLast_QT() {
    return Api().post("createTemp/", body);
  },
  isSale(body) {
    return Api().post("isSales/", body);
  },
  newtemp(salecode) {
    return Api().get("newtemp/" + salecode);
  },
};
