import { createApp } from "vue";
import { createWebHashHistory, createRouter } from "vue-router";
import App from "./App.vue";
import Home from "@/pages/Home.vue";
import Select from "@/pages/Select.vue";
import Result from "@/pages/Result.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/select", name: "Select", component: Select },
  { path: "/result", name: "Result", component: Result, props: (route: any) => ({ query: route.query.category }) },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

const app = createApp(App);

app.use(router);

app.mount("#app");
