<script setup>
import { useLayout } from '@/layout/composables/layout';
import { ref, computed } from 'vue';
import AppConfig from '@/layout/AppConfig.vue';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Checkbox from 'primevue/checkbox';
import Button from 'primevue/button';
import { useRouter } from 'vue-router'
import HanaAPI from '../../../api/HanaAPI';
import { useJwt } from "@vueuse/integrations/useJwt";
import { MensajeAlerta } from '../../../composables/MensajeAlerta';
import { useAuth } from '@/stores/AuthStore'

const { layoutConfig } = useLayout();

const FormData = ref({
    email: '',
    password: '',
    checked: false
})

const msgError = ref('')
const router = useRouter()
const auth = useAuth()
const isLoading = ref(false)


const Login = async () => {
    const { email, password } = FormData.value
    isLoading.value = true
    await HanaAPI.post('/Auth/login', {
        email,
        password
    }).then((resp) => {
        const { status, data } = resp
        const encodedJwt = data;
        const { payload } = useJwt(encodedJwt);
        const { value } = payload;
        if (status === 200) {
            auth.setToken(encodedJwt);
            auth.setUser(value);
            auth.setIsAuth(true);
            router.push({ name: 'main-home' })
            isLoading.value = false
        }
        isLoading.value = false
    }).catch((error) => {    

        if(  error.hasOwnProperty('response')){
            const { status, data } = error.response
             if (status === 400) {
                msgError.value = data
                MensajeAlerta('warning', msgError.value, 'Error')
                isLoading.value = false
            }
        }else{
            const { message } = error
            msgError.value = message
            MensajeAlerta('warning', msgError.value, 'Error')
            isLoading.value = false
        }
      
    })


}


const logoUrl = computed(() => {
    return `layout/images/${layoutConfig.darkTheme.value ? 'logo-white-01' : 'logo-dark-01'}.svg`;
});
</script>

<template>
    <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden ">
        <div class="flex flex-column align-items-center justify-content-center">
            <img :src="logoUrl" alt="Gala logo" class=" w-25rem flex-shrink-0" />

            <div
                style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                    <div class="text-center mb-5">
                        <img src="/demo/images/login/avatar2.png" alt="Image" height="50" class="mb-3" />
                        <div class="text-900 text-3xl font-medium mb-3">Bienvenido! DockerWoork</div>
                        <span class="text-600 font-medium">Inicia sesion para continuar</span>
                    </div>

                    <form @submit.prevent="Login">

                        <label for="email1" class="block text-900 text-xl font-medium mb-2">Email</label>
                        <InputText id="email1" type="text" placeholder="Email address" class="w-full md:w-30rem mb-5"
                            style="padding: 1rem" v-model="FormData.email" required />

                        <label for="password1" class="block text-900 font-medium text-xl mb-2">Password</label>
                        <Password id="password1" v-model="FormData.password" placeholder="Password" :toggleMask="true"
                            class="w-full md:w-30rem mb-5" inputClass="w-full" :inputStyle="{ padding: '1rem' }" required>
                        </Password>
                        <div class="flex align-items-center justify-content-between mb-5 gap-5">
                            <div class="flex align-items-center">
                                <Checkbox v-model="FormData.checked" id="rememberme1" binary class="mr-2"></Checkbox>
                                <label for="rememberme1">Recuerdame</label>
                            </div>
                            <a class="font-medium no-underline ml-2 text-right cursor-pointer"
                                style="color: var(--primary-color)">Olvidaste tu password?</a>
                        </div>
                        <Button type="submit" label="Iniciar Sesion" class="w-full p-3 text-xl"
                            :loading="isLoading"></Button>                   
                            <br>
                            <br>
                            <br>
                            <router-link to="/Register" class="font-medium no-underline ml-2 text-right cursor-pointer" 
                                style="color: var(--primary-color)">No tienes cuenta ? Registrate</router-link>                       
                    </form>
                </div>
            </div>
        </div>
    </div>
    <AppConfig simple />
</template>

<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
</style>
