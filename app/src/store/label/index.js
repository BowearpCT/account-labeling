const axios = require("axios");
export default {
  state: {
    category: null,
    categories: null,
    labels: [],
    selectedLabel: null,
    suggestionLabel: null
  },
  getters: {
    categories: function (state) {
      return state.categories;
    },
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
    setCategories: function (state, payload) {
      state.categories = payload;
    },
    clearCategories: function (state) {
      state.categories = null;
    },
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
        await commit("setCategory", payload);
        dispatch("fetchLabels");
      } catch (error) {
        throw error;
      }
    },
    async fetchLabels({ commit, state }) {
      const JWTTOKEN = this.getters.jwtToken;
      const category = state.category;
      axios.defaults.headers.common["Authorization"] = JWTTOKEN;
      try {
        const fetchResult = await axios.get(
          "http://localhost:3000/api/label/descendents/name/" + category
        );
        await commit("setLabels", fetchResult.data);
      } catch (error) {
        throw error;
      }
    },
    async fetchCategories({ commit }) {
      axios.defaults.headers.common["Authorization"] = this.getters.jwtToken;
      try {
        const categories = await axios.get(
          "http://localhost:3000/api/label/category"
        );
        commit("setCategories", categories.data);
      } catch (error) {
        throw error;
      }
    },
    async insertLabelling({ }, payload) {
      const JWTTOKEN = this.getters.jwtToken;
      axios.defaults.headers.common["Authorization"] = JWTTOKEN;
      try {
        const data = {
          accountReservedId: payload.reservedId,
          labels: payload.labels
        };
        await axios.post("http://localhost:3000/api/account/labelling", data);
      } catch (error) {
        throw error;
      }
    }
  }
};
