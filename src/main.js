import { createApp, markRaw } from "vue";
import App from '@/App.vue'
import router from './router/router';
import '@/assets/styles.scss';
import PrimeVue from 'primevue/config';
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { createPinia } from 'pinia'
import { useAuth } from "./stores/AuthStore";
import { fas } from "@fortawesome/free-solid-svg-icons";

const app = createApp(App);
const pinia = createPinia();
pinia.use(({ store }) => {
  store.router = markRaw(router);
});

  app.use(pinia);
  app.use(router);
  app.use(PrimeVue, { ripple: true })
  app.use(VueSweetalert2)
  
  if (localStorage.getItem("token")) {
    (async () => {
      const auth = useAuth();
      try {
        auth.setIsAuth(true);
      const aut = await auth.checkToken();
      } catch (error) {
        auth.clear();
      }
    })();
  }

  app.mount("#app");

 