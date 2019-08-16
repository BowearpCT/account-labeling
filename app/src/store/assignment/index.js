import router from "../../router";
const axios = require("axios");
export default {
  state: {
    assignment: null
  },
  getters: {
    assignment: function (state) {
      return state.assignment;
    }
  },
  mutations: {
    setAssignment: function (state, payload) {
      state.assignment = payload;
    },
    clearAssignment: function (state) {
      state.assignment = null;
    }
  },
  actions: {
    async assignment({ commit, dispatch }, payload) {
      try {
        commit("setAssignment", payload);
        await dispatch("insertAssignment");
        router.push("/dashboard");
      } catch (error) {
        throw error;
      }
    },
    async insertAssignment() {
      const JWTTOKEN = this.getters.jwtToken;
      const assignment = this.getters.assignment;
      const admin = this.getters.user;
      axios.defaults.headers.common["Authorization"] = JWTTOKEN;
      const config = {
        category: assignment.category,
        channel: assignment.channel,
        adminId: admin.id,
        userId: assignment.userId,
        total: assignment.total
      };
      try {
        await axios.post("http://localhost:3000/api/assignment", config);
      } catch (error) {
        throw error;
      }
    }
  }
};
