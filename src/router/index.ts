import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import { decode } from "jsonwebtoken";

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
    meta: {
      requireAuth: true
    },
    component: () => import("@/views/mylinks.vue")
  },
  {
    path: "/:redirect",
    name: "Redirect",
    component: () => import("@/views/redirect.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (localStorage.getItem("user") != null) {
      const user = JSON.parse(localStorage.getItem("user") || "");
      const jwtDecode = decode(user.token, { complete: true, json: true });

      if(jwtDecode && jwtDecode.payload.exp * 1000 - Date.now() < 0) {
        localStorage.removeItem("user");
        router.push("/");
      }
      
      next();
    } else {
      router.push("/");
    }
  }
  next();
});

export default router;
