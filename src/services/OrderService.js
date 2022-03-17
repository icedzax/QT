import Api from "../services/Api";

export default {
  del(body) {
    return Api().post(`/delete`, body);
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
};
