
const rutas = [
  {
    path: "/MaestroCuentas",
    name: "maestro-cuentas",
    component: () => import("@/modules/SuchefVentas/pages/MaestroCuentas.vue"),
    meta: {
      roles: ["Admin", "User", "Gerencia"],
    },
  },

  {
    path: "/MaestroClientes",
    name: "maestro-clientes",
    component: () =>
      import("@/modules/SuchefVentas//pages/MaestroClientes.vue"),
    meta: {
      roles: ["Admin", "User", "Gerencia"],
    },
  },
  {
    path: "/Asignaciones",
    name: "asignacion-sucursal",
    component: () =>
      import("@/modules/SuchefVentas/pages/AsignacionSucursal.vue"),
    meta: {
      roles: ["Admin", "User", "Gerencia"],
    },
  },
  {
    path: "/ParametrosVentas",
    name: "parametros-ventas",
    component: () =>
      import("@/modules/SuchefVentas/pages/ParametrosVentas.vue"),
    meta: {
      roles: ["Admin", "User", "Gerencia"],
    },
  },
  {
    path: "/GenerarVenta",
    name: "ventas-sucursal",
    component: () => import("@/modules/SuchefVentas/pages/GenerarVentaSAP.vue"),
    meta: {
      roles: ["Admin", "User", "Gerencia"],
    },
  },
];
      
    

    export default rutas