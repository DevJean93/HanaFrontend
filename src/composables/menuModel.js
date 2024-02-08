
 const Model = [
   {
     role: ["Admin"],
     label: "Suchef",
     items: [
       {
         label: "Modulo Ventas",
         icon: "pi pi-fw pi-calculator",
         items: [
           {
             label: "Maestro Cuentas",
             icon: "pi pi-fw pi-book",
             to: "/MaestroCuentas",
           },
           {
             label: "Maestro Sucursales",
             icon: "pi pi-fw pi-shopping-bag",
             to: "/MaestroSucursales",
           },
           {
             label: "Asignacion Sucursal",
             icon: "pi pi-fw pi-list",
             to: "/Asignaciones",
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
