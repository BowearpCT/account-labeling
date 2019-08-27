const axios = require("axios");
export default {
  state: {
    accounts: null,
    currentAccount: null
  },
  getters: {
    accounts: function (state) {
      return state.accounts;
    },
    currentAccount: function (state) {
      return state.currentAccount;
    }
  },
  mutations: {
    setAccounts: function (state, payload) {
      state.accounts = payload;
    },
    clearAccount: function (state) {
      state.accounts = null;
    },
    setCurrentAccount: function (state, payload) {
      state.currentAccount = payload;
    },
    clearCurrentAccount: function (state) {
      state.currentAccount = null;
    }
  },
  actions: {
    async getAcoountBooking({ commit }, payload) {
      const JWTTOKEN = this.getters.jwtToken;
      axios.defaults.headers.common["Authorization"] = JWTTOKEN;
      try {
        const accountsBooking = axios.get(
          "http://localhost:3000/api/assignment",
          {
            body: { assignmentId: payload.assignment.id }
          }
        );
        commit("accounts", accountsBooking);
      } catch (error) {
        throw error;
      }
    }
  }
};
