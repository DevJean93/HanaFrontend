import { createRouter, createWebHashHistory } from "vue-router";
import AppLayout from "../layout/AppLayout.vue";
import HelloWorld from "../components/HelloWorld.vue";
import LoginView from '../views/pages/auth/Login.vue'
import App from '@/App.vue'
const routes = [
  {
    path: "/",
    component:LoginView ,
    
  },
  {
    path: "/Home",
    component: AppLayout,
    children: [
      {
        path: "/Home",
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
