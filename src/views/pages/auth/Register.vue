<script setup>
import { useLayout } from '@/layout/composables/layout';
import { ref, computed } from 'vue';
import AppConfig from '@/layout/AppConfig.vue';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import HanaAPI from '../../../api/HanaAPI';
import { ToastAlert } from '../../../composables/MensajeAlerta';


const { layoutConfig } = useLayout();
//Modelo Inicial
const RegisterModel = {
    name: '',
    email: '',
    password1: '',
    password2: '',
}
const FormData = ref({...RegisterModel})

const isLoading = ref(false)

const msgError = ref('')


const Register = async () => {
    isLoading.value = true
    const { name,email, password1, password2 } = FormData.value
    await HanaAPI.post('/Auth/Registro', {
        userName:name,
        email,
        password1,
        password2
    }).then((resp) => {
        const { status, data } = resp
        isLoading.value = false
        if (status === 200) {
            const {  descripcion  } = data
            ToastAlert('success', descripcion) 
            FormData.value = {...RegisterModel}
        }

    }).catch((error) => {
        isLoading.value = false
        const { status, data } = error.response
        const {descripcion} = data
        if (status === 400) {
            msgError.value = descripcion
            ToastAlert('error', msgError.value)
        }
    })
}


const logoUrl = computed(() => {
    return `layout/images/${layoutConfig.darkTheme.value ? 'logo-white-01' : 'logo-dark-01'}.svg`;
});
</script>

<template>
    <div class="surface-ground flex  align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="flex flex-column align-items-center justify-content-center " style="margin: 0% 5%">
            <img :src="logoUrl" alt="Sakai logo" class=" w-25rem flex-shrink-0" />

            <div
                style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                    <div class="text-center mb-5">
                        <img src="/demo/images/login/avatar2.png" alt="Image" height="50" class="mb-3" />
                        <div class="text-900 text-3xl font-medium mb-3">Bienvenido!</div>
                        <span class="text-600 font-medium">Ingresa tus datos para el registro</span>
                    </div>

                    <form @submit.prevent="Register" >
                        <label for="nombre" class="block text-900 text-xl font-medium mb-2">Nombre</label>
                        <InputText id="nombre" type="text" placeholder="Nombre" class="w-full  mb-5"
                            style="padding: 1rem" v-model="FormData.name" required />

                        <label for="email1" class="block text-900 text-xl font-medium mb-2">Email</label>
                        <InputText id="email1" type="text" placeholder="Email address" class="w-full mb-5"
                            style="padding: 1rem" v-model="FormData.email" required />

                        <label for="password1" class="block text-900 font-medium text-xl mb-2">Password</label>
                        <Password id="password1" v-model="FormData.password1" placeholder="Password" :toggleMask="true"
                            class="w-full  mb-5" inputClass="w-full" :inputStyle="{ padding: '1rem' }" required>
                        </Password>

                        <label for="password2" class="block text-900 font-medium text-xl mb-2">Password</label>
                        <Password id="password2" v-model="FormData.password2" placeholder="Confirmar Password" :toggleMask="true"
                            class="w-full  mb-5" inputClass="w-full" :inputStyle="{ padding: '1rem' }" required>
                        </Password>
    
                        <Button type="submit" label="Registrarse" class="w-full p-3 text-xl" :disabled="isLoading"></Button>
                        <br>
                        <br>
                        <router-link to="/" class="font-medium no-underline ml-2 text-right cursor-pointer"
                            style="color: var(--primary-color)">Regresar al login</router-link>
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
