const axios = require("axios");
export default {
  state: {
    accounts: null,
    accountLabelling: null,
    currentAccount: null,
    index: 0,
    total: 0
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
    },
    accountLabelling: function (state) {
      return state.accountLabelling;
    },
    total: function (state){
      return state.total;
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
    setIndex: function (state, payload) {
      state.index = payload;
    },
    resetIndex: function (state) {
      state.index = 0;
    },
    setAccountLabelling: function(state, payload) {
      state.accountLabelling = payload;
    },
    clearAccountLabelling: function(state) {
      state.accountLabelling = null;
    },
    setTotal: function(state, payload) {
      state.total = payload;
    },
    clearTotal: function(state) {
      state.total = 0;
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
    },
    async fetchAccounts({ commit }) {
      axios.defaults.headers.common["Authorization"] = this.getters.jwtToken;
      try {
        const { data } = await axios.get(
          "http://localhost:3000/api/accounts/labelling"
        );
        commit("setAccountLabelling", data);
      } catch (error) {
        throw error;
      }
    },
    async fetchAccountsFilter({ commit }, payload) {
      axios.defaults.headers.common["Authorization"] = this.getters.jwtToken;
      try {
        const { data } = await axios.get(
          "http://localhost:3000/api/accounts/labelling/filter",
          {
            params: {
              labels: payload.labels,
              search: payload.search
            }
          }
        );
        commit("setAccountLabelling", data);
      } catch (error) {
        throw error;
      }
    }
  }
};
