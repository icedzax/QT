import Api from "../services/Api";

export default {
  search(body) {
    return Api().post(`/CusSearch/`, body);
  },
  show(userId) {
    return Api().get("user/" + userId);
  },
  post(userId) {
    return Api().post("auth/", userId);
  },
  push() {
    return Api().push("user/", user.id, user);
  },
  delete() {
    return Api().delete("user/", user.id, user);
  },
};
