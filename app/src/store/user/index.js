import VueJwtDecode from "vue-jwt-decode";
export default {
  state: {
    user: null
  },
  getters: {
    user(state) {
      return state.user;
    }
  },
  mutations: {
    user(state, payload) {
      state.user = payload;
    },
    clearUser(state) {
      state.user = null;
    }
  },
  actions: {
    async jwtDecode({ commit }, payload) {
      try {
        var { data } = VueJwtDecode.decode(payload);
        commit("user", data);
      } catch (error) {
        return error;
      }
    }
  }
};
