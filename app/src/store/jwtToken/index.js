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
        if (user) {
          commit("success", "login success! ");
          if (user.role == "2") {
            return router.push("/user");
          } else {
            return router.push("/dashboard");
          }
        } else {
          commit("error", "username or password wrong!");
        }
      } catch (error) {
        throw error;
      } finally {
        setTimeout(() => {
          commit("clear");
        }, 2000);
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
      commit("clearAssignment");
      commit("clearAssignments");
      commit("clear");
      commit("resetIndex");
      commit("clearAccounts");
      commit("clearUsers");
      commit("clearCategories");
      commit("clearCategoryLabels");
    }
  }
};
