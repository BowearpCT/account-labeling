const axios = require("axios");
const JWTTOKEN = this.getters.jwttoken;
const config = {
  headers: {
    Authorization: "Bearer " + JWTTOKEN
  }
};
export default {
  state: {
    users: null
  },
  getters: {
    users(state) {
      return state.user;
    }
  },
  mutations: {
    users(state, payload) {
      state.user = payload;
    },
    clearUsers(state) {
      state.user = null;
    }
  },
  actions: {
    async fetcherUsers({ commit }) {
      try {
        var usersResult = await axios.get(
          "http://localhost:3000/user/login",
          config
        );
        commit("usersResult", usersResult);
      } catch (error) {
        throw error;
      }
    }
  }
};
