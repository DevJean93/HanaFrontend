import { createRouter, createWebHashHistory } from "vue-router";

import AuthGuard  from '@/router/AuthGuard'
const routes = [
  {
    path: "/",
    name: "main",
    component: () => import("../views/pages/auth/Login.vue"),
  },
  {
    path: "/Acceso",
    name: "main-acceso",
    component: () => import("../views/pages/auth/Access.vue"),
  },
  {
    path: "/Error",
    name: "main-error",
    component: () => import("../views/pages/auth/Error.vue"),
  },
  {
    path: "/Home",
    name: "main-layout",
    component: () => import("../layout/AppLayout.vue"),
    meta: {
      auth: true,
    },
    children: [
      {
        path: "/Home",
        name: "main-home",
        component: () => import("../App.vue"),
      },
      {
        path: "/HelloWorld",
        name: "main-hello",
        component: () => import("../components/HelloWorld.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(AuthGuard)
export default router;
