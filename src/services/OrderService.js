import Api from "../services/Api";

export default {
  del(body) {
    return Api().post(`/delete`, body);
  },
  update(body) {
    return Api().post(`/update`, body);
  },
};
