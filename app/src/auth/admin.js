import { store } from "../store/index.js";

export default (to, from, next) => {
  var user = store.getters.user;
  if (user) {
    if (user.role == "admin") {
      next();
    } else {
      next("/user");
    }
  } else {
    next("/login");
  }
};
