import router from "../../router";
import VueJwtDecode from "vue-jwt-decode";

const axios = require("axios");
export default {
  state: {
    jwtToken: null
  },
  getters: {
    jwtToken: function(state) {
      return state.jwtToken;
    }
  },
  mutations: {
    setToken: function(state, payload) {
      state.jwtToken = payload;
    }
  },
  actions: {
    signIn: async function({ commit }, payload) {
      try {
        var result = await axios.post("http://localhost:3000/user/login", {
          username: payload.username,
          password: payload.password
        });
        commit("setToken", result.data);
        var user = VueJwtDecode.decode(result.data);
        commit("user", user);
        commit("success", "login success! ");
        // this.$store.dispatch("jwtDecode", result.data);
        if (result.data) {
          return router.push("/about");
        }
        // this.$route.push("/");
      } catch (error) {
        commit("error", "username or password wrong!");
      } finally {
        setTimeout(() => {
          commit("clear");
        }, 5000);
      }
    }
  }
};
