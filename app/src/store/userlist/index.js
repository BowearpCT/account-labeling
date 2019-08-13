const axios = require("axios");

export default {
  state: {
    users: null
  },
  getters: {
    users(state) {
      return state.users;
    }
  },
  mutations: {
    users(state, payload) {
      state.users = payload;
    },
    clearUsers(state) {
      state.users = null;
    }
  },
  actions: {
    async fetcherUsers({ commit }) {
      const JWTTOKEN = this.getters.jwtToken;
      const config = {
        headers: {
          Authorization: JWTTOKEN
        }
      };
      try {
        var usersResult = await axios.get(
          "http://localhost:3000/api/user",
          config
        );
        commit("users", usersResult.data);
      } catch (error) {
        throw error;
      }
    },
    removeUsers({ commit }) {
      commit("clearUsers");
    }
  }
};
