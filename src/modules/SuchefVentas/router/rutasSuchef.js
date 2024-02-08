
const rutas = [
  {
    path: "/MaestroCuentas",
    name: "maestro-cuentas",
    component: () => import("@/modules/SuchefVentas/pages/MaestroCuentas.vue"),
    meta: {
      roles: ["Admin"],
    },
  },
  
  {
    path: "/MaestroSucursales",
    name: "maestro-sucursales",
    component: () => import("@/modules/SuchefVentas//pages/MaestroSucursales.vue"),
    meta: {
      roles: ["Admin"],
    },
  },
  {
    path: "/Asignaciones",
    name: "asignacion-sucursal",
    component: () => import("@/modules/SuchefVentas/pages/AsignacionSucursal.vue"),
    meta: {
      roles: ["Admin"],
    },
  }
];
      
    

    export default rutas