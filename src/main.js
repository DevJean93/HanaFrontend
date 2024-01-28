import { createApp } from 'vue'
import App from '@/App.vue'
import router from './router/router';
import '@/assets/styles.scss';
import PrimeVue from 'primevue/config';
import { createPinia } from 'pinia'

const pinia = createPinia()

createApp(App)
.use(PrimeVue ,{ripple:true})
.use(router)
.use(pinia)
.mount('#app')
