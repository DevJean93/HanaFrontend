
 const Model = [
   {
     role: ["Admin"],
     label: "Home",
     items: [
       { label: "Home", icon: "pi pi-fw pi-home", to: "/Home" },
       { label: "Home", icon: "pi pi-fw pi-home", to: "/Home" },
       { label: "Home", icon: "pi pi-fw pi-home", to: "/Home" },
       { label: "Home", icon: "pi pi-fw pi-home", to: "/Home" },
     ],
   },

   {
     role: ["User"],
     label: "UI Components",
     items: [
       { label: "Form Layout", icon: "pi pi-fw pi-id-card", to: "/HelloWorld" },
     ],
   },
 ];

 const MenuRole = (userRol)=>{
 const Menu = Model.filter((item) => item.role.includes(userRol));
console.log(Menu)
 return Menu
}

export default MenuRole
