import { createApp } from "vue";
import "./tailwind.css";
import App from "./App.vue";
import { routes } from "./routes.js";
import { createRouter, createWebHistory } from "vue-router";
import axios from "axios";

const app = createApp(App);

const router = createRouter({
  history: createWebHistory(),
  routes,
  axios,
});

app.use(router);
app.mount("#app");
