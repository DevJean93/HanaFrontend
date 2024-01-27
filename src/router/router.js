import { createRouter, createWebHashHistory } from "vue-router";
import AppLayout from "../layout/AppLayout.vue";
import App from "../App.vue";
import HelloWorld from "../components/HelloWorld.vue";
const routes = [
  {
    path: "/",
    component: AppLayout,
    children: [
      {
        path: "/",
        component: App,
      },
      {
        path: "/HelloWorld",
        component: HelloWorld,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
