const axios = require("axios");
export default {
  state: {
    category: null,
    labels: null,
    selectedLabel: null,
    suggestionLabel: null
  },
  getters: {
    labels: function (state) {
      return state.labels;
    },
    category: function (state) {
      return state.category;
    },
    selectedLabel: function (state) {
      return state.selectedLabel;
    },
    suggestionLabel: function (state) {
      return state.suggestionLabel;
    }
  },
  mutations: {
    setLabels: function (state, payload) {
      state.labels = payload;
    },
    clearLabels: function (state) {
      state.labels = null;
    },
    setCategory: function (state, payload) {
      state.category = payload;
    },
    clearCategory: function (state) {
      state.category = null;
    },
    setSelectedLabel: function (state, payload) {
      state.selectedLabel = payload;
    },
    clearSelectedLabel: function (state) {
      state.selectedLabel = null;
    },
    setSuggestionLabel: function (state, payload) {
      state.suggestionLabel = payload;
    },
    clearSuggestionLabel: function (state) {
      state.suggestionLabel = null;
    }
  },
  actions: {
    async labels({ commit, dispatch }, payload) {
      try {
        commit("category", payload);
        dispatch("fetchLabels", this.getters.category);
      } catch (error) {
        throw error;
      }
    },
    async fetchLabels({ commit }) {
      const JWTTOKEN = this.getters.jwtToken;
      const category = this.getters.category;
      axios.defaults.headers.common["Authorization"] = JWTTOKEN;
      try {
        const fetchResult = axios.get(
          "http://localhost:3000/api/label/descendents/",
          {
            params: { LabelName: category }
          }
        );
        commit("setLabels", fetchResult);
      } catch (error) {
        throw error;
      }
    },
    async insertLabelling(payload) {
      const JWTTOKEN = this.getters.jwtToken;
      axios.defaults.headers.common["Authorization"] = JWTTOKEN;
      try {
        await axios.post("http://localhost:3000/api/label/descendents/", {
          params: {
            accountId: payload.accountId,
            labels: payload.labels
          }
        });
      } catch (error) {
        throw error;
      }
    }
  }
};
