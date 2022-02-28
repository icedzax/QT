import { createRouter, createWebHistory } from "vue-router";
// import Home from "../src/views/Home.vue";
import Main from "./views/Main.vue";
import Set from "../src/components/Set.vue";
import { auth } from "./state/user";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Main,
  },
  {
    path: "/set/:id",
    name: "Set",
    component: Set,
  },
  {
    path: "/main",
    name: "Main",
    component: Main,
  },
  {
    path: "/about",
    name: "About",
    meta: {
      auth: true,
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "./views/About.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (auth.status || to.name === "Main" || !to.meta.auth) {
    next();
  } else {
    next({ name: "Main" });
  }
});
export default router;
