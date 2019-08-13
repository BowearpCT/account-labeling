import router from "../../router";
import VueJwtDecode from "vue-jwt-decode";
const axios = require("axios");

export default {
  state: {
    jwtToken: null
  },
  getters: {
    jwtToken: function (state) {
      return state.jwtToken;
    }
  },
  mutations: {
    setToken: function (state, payload) {
      state.jwtToken = payload;
    },
    removeToken: function (state) {
      state.jwtToken = null;
    }
  },
  actions: {
    signIn: async function ({ commit, dispatch }, payload) {
      try {
        await dispatch("loginFetcher", payload);
        var token = this.getters.jwtToken;
        var user = await VueJwtDecode.decode(token);
        commit("user", user);
        commit("success", "login success! ");
        if (user) {
          if (user.role == "2") {
            return router.push("/user");
          } else {
            return router.push("/assign");
          }
        }
      } catch (error) {
        commit("error", "username or password wrong!");
      } finally {
        setTimeout(() => {
          commit("clear");
        }, 5000);
      }
    },
    loginFetcher: async ({ commit }, payload) => {
      try {
        var result = await axios.post("http://localhost:3000/user/login", {
          username: payload.username,
          password: payload.password
        });

        commit("setToken", result.data);
      } catch (error) {
        throw error;
      }
      return result;
    },
    signOut: async function ({ commit }) {
      commit("removeToken");
      commit("clearUser");
      commit("clear");
    }
  }
};
