import { store } from "../store/index.js";

export default (to, from, next) => {
  var user = store.getters.user;
  if (user) {
    if (user.role == "2") {
      next();
    } else {
      next("/dashboard");
    }
  } else {
    next("/login");
  }
};
