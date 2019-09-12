const axios = require("axios");
export default {
  state: {
    accounts: null,
    currentAccount: null,
    index: 0
  },
  getters: {
    accounts: function (state) {
      return state.accounts;
    },
    currentAccount: function (state) {
      return state.currentAccount;
    },
    index: function (state) {
      return state.index
    }
  },
  mutations: {
    setAccounts: function (state, payload) {
      state.accounts = payload;
    },
    clearAccounts: function (state) {
      state.accounts = null;
    },
    setCurrentAccount: function (state, payload) {
      state.currentAccount = payload;
    },
    clearCurrentAccount: function (state) {
      state.currentAccount = null;
    },
    increateIndex: function (state) {
      state.index += 1;
    },
    decreateIndex: function (state) {
      state.index -= 1;
    },
    resetIndex: function (state) {
      state.index = 0;
    }
  },
  actions: {
    async getAcoountBooking({ commit }, payload) {
      const JWTTOKEN = this.getters.jwtToken;
      axios.defaults.headers.common["Authorization"] = JWTTOKEN;
      try {
        const reservedAccounts = await axios.get(
          "http://localhost:3000/api/account-booking/" + payload
        );
        commit("setAccounts", reservedAccounts.data);
      } catch (error) {
        throw error;
      }
    }
  }
};
