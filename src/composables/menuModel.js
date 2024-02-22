
 const Model = [
   {
     role: ["Admin"],
     label: "Suchef",
     items: [
       {
         label: "Modulo Ventas SAP",
         icon: "pi pi-fw pi-calculator",
         items: [
           {
             label: "Maestro Cuentas",
             icon: "pi pi-fw pi-book",
             to: "/MaestroCuentas",
           },
           {
             label: "Maestro Clientes",
             icon: "pi pi-fw pi-shopping-bag",
             to: "/MaestroClientes",
           },
           {
             label: "Asignacion Sucursal",
             icon: "pi pi-fw pi-list",
             to: "/Asignaciones",
           },
           {
             label: "Parametros Ventas",
             icon: "pi pi-sliders-v",
             to: "/ParametrosVentas",
           },
           {
             label: "Excel Ventas",
             icon: "pi pi-file-excel",
             to: "/GenerarVenta",
           },
         ],
       },
     ],
   },

   {
     role: ["User", "Gerencia"],
     label: "UI Components",
     items: [
       { label: "Form Layout", icon: "pi pi-fw pi-id-card", to: "/HelloWorld" },
     ],
   },
 ];

 const MenuRole = (userRol)=>{
 const Menu = Model.filter((item) => item.role.includes(userRol));

 return Menu
}

export default MenuRole
