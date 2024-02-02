import { useAuth } from "../stores/AuthStore";

export default async function routes(to, from, next) {
  if (to.meta?.auth) {
    const auth = useAuth();
    auth.isAuth ? next() : next({ name: "main-acceso" });
    console.log(to.name);
  } else {
    next();
  }
}


