import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const Test = () =>
  import(/* webpackChunkName: "Test" */ "../views/Test.vue");
const Register = () =>
  import(/* webpackChunkName: "Register" */ "../views/Register.vue");
const Login = () =>
  import(/* webpackChunkName: "Login" */ "../views/Login.vue");

const routes = [
  {
    path: '*',
    redirect: '/not-found',
  },
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      authRequired: true,
      pageName: 'Home',
      layout: 'Navbar',
    },
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
    meta: {
      authRequired: true,
      pageName: 'About',
      layout: 'Navbar',
    },
  },
  {
    path: "/test",
    name: "Test",
    component: Test,
    meta: {
      authRequired: true,
      pageName: 'Test',
      layout: 'Basic',
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      authRequired: false,
      pageName: 'Register',
      layout: 'Basic',
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      authRequired: false,
      pageName: 'Login',
      layout: 'Basic',
    },
  },
  { path: "*", redirect: "/" },
];

import config from "/src/config";
const router = new VueRouter({
  mode: "history",
  base: config.env.baseURL,
  routes,
});

// import store from "/src/store";
router.beforeEach((to, from, next) => {
  // redirect to login when unauthorized
  const publicPages = ["/login", "/register"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = sessionStorage.getItem("user") || localStorage.getItem("user");

  if (authRequired && !loggedIn) {
    return next("/login");
  }

  // Don't let an authenticated user navigate to login.
  // If they do, redirect to the dashboard
  if (!authRequired && loggedIn) {
    return next("/");
  }

  // // Is the user authenticated?
  // if (to.meta.authRequired && !store.getters['auth/user']) {
  //   // Authentication required for this route. Redirecting to login
  //   return next({ path: '/login', query: { redirect: to.path } })
  // }

  // // Don't let an authenticated user navigate to login.
  // // If they do, redirect to the dashboard
  // if (to.path === '/login' && store.getters['auth/user']) {
  //   // User is already logged in. Redirecting to dashboard
  //   return next({ path: '/' })
  // }

  next();
});

export default router;
