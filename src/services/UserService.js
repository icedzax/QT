import Api from "../services/Api";

export default {
  fgList() {
    return Api().get("/Fg");
  },
  show(userId) {
    return Api().get("user/" + userId);
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
};
