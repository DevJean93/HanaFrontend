


<script setup>
import { ref } from 'vue'
import Textarea from 'primevue/textarea';
import HanaAPI from '../api/HanaAPI'


const data = ref(null);
const error = ref(null);

const login = async () => {

  const reponse = await HanaAPI.post('/Auth/login', {
    email: 'jruano@gala.com.gt',
    password: 'Jruano@23',
  }).then(resp =>  data.value = resp.data)

  console.log(reponse)

};


</script>

<template>
  <div class="card">
    <button @click="login">Iniciar Sesión</button>
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