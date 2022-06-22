import Api from "../services/Api";

export default {
  unApp(payload) {
    return Api().post(`/unApp`, payload);
  },
  isRef(payload) {
    return Api().post(`/isRef`, payload);
  },
  priceValid(payload) {
    return Api().post(`/pvalid`, payload);
  },
  del(body) {
    return Api().post(`/delete`, body);
  },
  delall(body) {
    return Api().post(`/deleteall`, body);
  },
  update(body) {
    return Api().post(`/update`, body);
  },
  myRule(body) {
    return Api().post(`/addcon`, body);
  },
  delcon(body) {
    return Api().post(`/delcon`, body);
  },
  editCon(body) {
    return Api().post(`/editCon`, body);
  },
  Con(qt) {
    return Api().get("Con/" + qt);
  },
  pv(payload) {
    return Api().post("updateHead/", payload);
  },

  pmat(payload) {
    return Api().post("unitMat/", payload);
  },
  appC(body) {
    return Api().post(`/cApp`, body);
  },
  term(payload) {
    return Api().post(`/updateHead`, payload);
  },
  ship(payload) {
    return Api().post(`/updateHead`, payload);
  },
  getLastQT(payload) {
    return Api().get(`/getLastQT/${payload}`);
  },
};
