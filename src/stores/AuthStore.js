import { defineStore } from "pinia";
import { useJwt } from "@vueuse/integrations/useJwt";
import { ref, computed } from "vue";

export const useAuthStore = defineStore("authStore", () => {

    // referencias
    const user = JSON.parse(localStorage.getItem("user"))
    const LocalUser = ref(user);

  // metodos de accion
  const loginUser = (User) => {
    const encodedJwt = User;
    const { payload } = useJwt(encodedJwt);
    const { value } = payload;
    const { Email, Role, UserName } = value;
    const UserActive = {
      Email,
      Role,
      UserName, 
      Token: User,
    };
    
    localStorage.setItem("user", JSON.stringify(UserActive));
    LocalUser.value = JSON.parse(localStorage.getItem("user"));
  };
  const logout = () => {
  
    localStorage.removeItem("user");
    LocalUser.value = null

  }

  
  // retorno de objetos
  return {
    // state
    LocalUser,
    //getters
    GetActualUser: computed(()=>{LocalUser.Email}),
    // actions
    loginUser,
    logout,
  };
});
