import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login.vue")
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/register.vue")
  },
  {
    path: "/mylinks",
    name: "My Links",
    component: () => import("@/views/mylinks.vue")
  },
  {
    path: "/:redirect",
    name: "Redirect",
    component: () => import("@/views/redirect.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
