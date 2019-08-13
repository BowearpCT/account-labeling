import Vue from "vue";
import Router from "vue-router";
// import Home from "./views/Home.vue";
import Dashboard from "./views/DashBoard.vue";
import Login from "./views/Login.vue";
import auth from "./auth/admin";
import authUser from "./auth/user";
import Assign from "./views/Assign.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/assign",
      component: Assign,
      beforeEnter: auth
    },
    {
      path: "/user",
      beforeEnter: authUser,
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/login",
      component: Login
    },
    {
      path: "/dashboard",
      component: Dashboard,
      beforeEnter: auth
    }
  ]
});
