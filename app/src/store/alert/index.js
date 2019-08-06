export default {
  state: {
    type: null,
    message: null
  },
  actions: {
    success({ commit }, message) {
      commit("success", message);
    },
    error({ commit }, message) {
      commit("error", message);
    },
    clear({ commit }, message) {
      commit("success", message);
    }
  },
  mutations: {
    success(state, message) {
      state.type = "success";
      state.message = message;
    },
    error(state, message) {
      state.type = "danger";
      state.message = message;
    },
    clear(state) {
      state.type = null;
      state.message = null;
    }
  }
};
