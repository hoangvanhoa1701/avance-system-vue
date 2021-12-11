import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const Test = () =>
  import(/* webpackChunkName: "TestVueX" */ "../views/Test.vue");
const Register = () =>
  import(/* webpackChunkName: "TestVueX" */ "../views/Register.vue");
const Login = () =>
  import(/* webpackChunkName: "TestVueX" */ "../views/Login.vue");

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/test",
    name: "Test",
    component: Test,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  { path: "*", redirect: "/" },
];

import config from "/src/config";
const router = new VueRouter({
  mode: "history",
  base: config.env.baseURL,
  routes,
});

import USER from "/src/constants";
router.beforeEach((to, from, next) => {
  // redirect to login when unauthorized
  const publicPages = ["/login", "/register"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem(USER);

  // Don't let an authenticated user navigate to login.
  // If they do, redirect to the dashboard
  // if (authRequired && store.getters["Auth/authenticated"]) {
  //   return next({ path: "/" });
  // }

  if (authRequired && !loggedIn) {
    return next("/login");
  }

  next();
});

export default router;
