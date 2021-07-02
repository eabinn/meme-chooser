import { createWebHistory, createRouter } from "vue-router";
import Home from "./pages/Home.vue";
import Select from "./pages/Select.vue";
import Result from "./pages/Result.vue";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/select",
    component: Select,
  },
  {
    path: "/result",
    component: Result,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
