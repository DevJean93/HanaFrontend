
 const Model = [
   {
     role: ["Admin"],
     label: "Administracion",
     items: [
       { label: "Usuarios", icon: " pi pi-pw pi-users", to: "/Usuarios" },
       { label: "Contraseñas", icon: " pi pi-pw pi-users", to: "/Usuarios" },
       { label: "Cortes", icon: " pi pi-pw pi-users", to: "/Usuarios" },
     ],
   },

   {
     role: ["User","Gerencia"],
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
