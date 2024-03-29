import { computed, ref } from "vue";
import { defineStore } from "pinia";
import HanaAPI from "../api/HanaAPI";
import router from '../router/router'
import { useJwt } from "@vueuse/integrations/useJwt";
export const useAuth = defineStore("auth", () => {
  const token = ref(localStorage.getItem("token"));
  const user = ref(JSON.parse(localStorage.getItem("user")));
  const isAuth = ref(false);

  const setToken =(tokenValue)=> {
    localStorage.setItem("token", tokenValue);
    token.value = tokenValue;
  }

  const setUser =(userValue)=> {
    localStorage.setItem("user", JSON.stringify(userValue));
    user.value = userValue;
  }

  const setIsAuth=(auth)=> {
    isAuth.value = auth;
  }

  const isAuthenticated = computed(() => {
    return token.value && user.value;
  });

  const userEmail = computed(() => {
    if (user.value) {
      return user.value.Email ;
    }
    return "";
  });

  const userRole = computed(()=>{
    if(token.value){
      const encodedJwt = token.value;
      const { payload } = useJwt(encodedJwt);
      const { value } = payload;
      const { Role} = value;
      return Role
    }
    return"";
  })

  async function checkToken() {
    try {
      const tokenAuth = `Bearer ${token.value}`
   
      const response = await HanaAPI.get("/Auth/ValidarToken", {
        params:{
          Token:token.value
        },
        headers: {
          Authorization: tokenAuth,
        },
      });
      return response;
    } catch (error) {
      clear();
      router.push({ name: "main"});

    }
  }

    async function checkTokenByStorage(token) {
      try {
        const tokenAuth = `Bearer ${token}`;

        const response = await HanaAPI.get("/Auth/ValidarToken", {
          params: {
            Token: token,
          },
          headers: {
            Authorization: tokenAuth,
          },
        });
        return response;
      } catch (error) {
        clear();
        router.push({ name: "main" });
      }
    }

  function clear() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    isAuth.value = false;
    token.value = "";
    user.value = "";
  }

  return {
    token,
    user,
    setToken,
    setUser,
    checkToken,
    checkTokenByStorage,
    isAuthenticated,
    userEmail,
    clear,
    setIsAuth,
    isAuth,
    userRole,
  };
});
