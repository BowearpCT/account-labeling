const axios = require("axios");
import VueJwtDecode from "vue-jwt-decode";
export default {
  state: {
    user: null
  },
  getters: {
    user(state) {
      return state.user;
    }
  },
  mutations: {
    user(state, payload) {
      state.user = payload;
    }
  },
  actions: {
    async jwtDecode({ commit }, payload) {
      try {
        var { data } = VueJwtDecode.decode(payload);
        commit("user", data);
      } catch (error) {
        return error;
      }
    },
    async signIn({ commit }, payload) {
      var { data } = await axios.post("http://localhost:3000/user/login", {
        username: payload.username,
        password: payload.password
      });
      commit("setToken", data);
    }
  }
};
