import Api from "@services/Api";

export default {
  index(search) {
    return Api().get("users");
  },
  show(userId) {
    return Api().get("user/" + userId);
  },
  post() {
    return Api().post("user", userId);
  },
  push() {
    return Api().push("user/", user.id, user);
  },
  delete() {
    return Api().delete("user/", user.id, user);
  },
};
