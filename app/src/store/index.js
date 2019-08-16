import Vue from "vue";
import Vuex from "vuex";
import token from "./jwtToken/index.js";
import alert from "./alert/index.js";
import user from "./user/index.js";
import userlist from "./userlist";
import assignment from "./assignment";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    jwtToken: token,
    alert: alert,
    user: user,
    users: userlist,
    assignment: assignment
  },
  plugins: [createPersistedState({})]
});
