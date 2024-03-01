import { createRouter, createWebHashHistory } from "vue-router";
import AuthGuard from "@/router/AuthGuard";
import rutasSuchef from '@/modules/SuchefVentas/router/rutasSuchef'
const routes = [
  {
    path: '/:catchAll(.*)',
    redirect: '/Error' // Puedes cambiar '/Error' por la ruta que desees como por defecto
  },
  {
    path: "/",
    name: "main",
    component: () => import("../views/pages/auth/Login.vue"),
  },
  {
    path: "/Acceso",
    name: "main-acceso",
    component: () => import("../views/pages/auth/AccessLogout.vue"),
  },
  {
    path: "/Permisos",
    name: "main-permisos",
    component: () => import("../views/pages/auth/AccessPermisos.vue"),
  },
  {
    path: "/Error",
    name: "main-error",
    component: () => import("../views/pages/auth/Error.vue"),
  },
  {
    path: "/Register",
    name: "main-register",
    component: () => import("../views/pages/auth/Register.vue"),
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
        meta: {
          roles: ["Admin", "User", "Gerencia"],
        },
      },
      ...rutasSuchef,
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(AuthGuard);
export default router;
