import { createApp } from 'vue'
import App from '@/App.vue'
import router from './router/router';
import '@/assets/styles.scss';
import PrimeVue from 'primevue/config';
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { createPinia } from 'pinia'

const pinia = createPinia()

createApp(App)
  .use(PrimeVue, { ripple: true })
  .use(VueSweetalert2)
  .use(router)
  .use(pinia)
  .mount("#app");
