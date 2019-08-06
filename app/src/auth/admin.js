import { store } from "../store/index.js";

export default (to, from, next) => {
  var user = store.getters.user;
  if (user.role == "admin") {
    next();
  } else {
    next("/login");
  }
};
