

<script setup>
import { ref } from 'vue'
import Textarea from 'primevue/textarea';
import HanaAPI from '../api/HanaAPI'
import { useAuthStore } from '@/stores/AuthStore'
import { useRouter } from "vue-router";

const data = ref(null);
const error = ref(null);
const AuthStore = useAuthStore()
const router = useRouter();
const LogOut = ()=>{
  AuthStore.logout()
  router.push({ name: 'main' })
}

</script>

<template>
  <div class="card">
    <button @click=" LogOut">Logout </button>
    <p>
    
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
    <span class="p-float-label">
      <Textarea v-model="data" rows="5" cols="30" />
      <label>JWT</label>
  </span>

  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank">create-vue</a>, the official Vue + Vite
    starter
  </p>
  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
../api/HanaAPI