import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import AddNote from "../views/AddNote.vue";
import authService from "../services/auth.service";

const requiredAuth = (to, from, next) => {
  let token = JSON.parse(localStorage.getItem("user"));
  if (token) {
    authService.verifyToken().then((res) => {
      if (res.data) {
        next();
      }
      next("/login");
      return;
    });
  } else {
    next("/login");
    return;
  }
};

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter: requiredAuth
  },
  {
    path: "/addnote",
    name: "AddNote",
    component: AddNote,
    beforeEnter: requiredAuth
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
    beforeEnter: requiredAuth,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
