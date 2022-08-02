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
  postplant(plant) {
    return Api().post(`/editPlant`, plant);
  },
  getplant(qt) {
    return Api().get("getplant/" + qt);
  },
  postnote(note) {
    return Api().post(`/updatenote`, note);
  },
  filterdate(day) {
    return Api().post(`/changeDate`, day);
  },
  priceUpdate(matnr) {
    return Api().post(`/priceUpdate`, matnr);
  },
  getSoList(pay) {
    return Api().post(`/appListWait`, pay);
  },
  getSoListReg(pay) {
    return Api().post(`/appListWaitReg`, pay);
  },
  soCheck(pay) {
    return Api().post(`/soCheckApp`, pay);
  },
  loadFile(QT) {
    return Api().post(`/loadFile`, QT);
  },
  del(filename) {
    return Api().post(`/deleteFile`, filename);
  },
  soApp(pay) {
    return Api().post(`/soApp`, pay);
  },
};
