import Vue from "vue";
import Vuex from "vuex";
import token from "./jwtToken/index.js";
import alert from "./alert/index.js";
import user from "./user/index.js";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    jwtToken: token,
    alert: alert,
    user: user
  },
  plugins: [createPersistedState({})]
});
