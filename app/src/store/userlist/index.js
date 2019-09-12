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
      axios.defaults.headers.common["Authorization"] = this.getters.jwtToken;
      try {
        const usersResult = await axios.get("http://localhost:3000/api/user");
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
