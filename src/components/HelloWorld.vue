


<script>
import { ref } from 'vue'

import axios from 'axios'

export default {
  name: 'Login',
  setup() {
    const data = ref(null);
    const error = ref(null);

    const login = async () => {
      try {
        const response = await axios.post('http://94.74.66.85:8094/api/Auth/Login', {
          email: 'jruano@gala.com.gt',
          password: 'Jruano@23',
        });

        data.value = response
        error.value = null;
        console.log(data.value.data)
      } catch (err) {
        error.value = 'Error al iniciar sesión: ' + err.message;
        data.value = null;
      }
    };

    return {
      data,
      error,
      login,
    };
  },
};

</script>

<template>


  <div class="card">
    <button @click="login">Iniciar Sesión</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
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
