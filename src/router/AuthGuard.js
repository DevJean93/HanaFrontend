import { useAuth } from "../stores/AuthStore";

export default async function routes(to, from, next) {
  if (to.meta?.auth) {
    const auth = useAuth();
    if (auth.isAuth) {
      // Roles de rutas
      const RouteRoles = to.meta.roles;
      //Roles de usuario
      const userRoles = auth.user.Role;
      const Permisos = RouteRoles.includes(userRoles);

  if (Permisos === true) {
        next();
      } else {
        next({ name: "main-permisos" });
      }
    } else {
      next({ name: "main-acceso" });
    }
  } else {
    next();
  }
}
