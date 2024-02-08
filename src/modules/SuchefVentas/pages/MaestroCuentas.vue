
<script setup>
import { ref } from 'vue';
import { useCuenta } from '../store/CuentasStore'
import { MensajeAlerta } from '../../../composables/MensajeAlerta';
import Card from 'primevue/card';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';




const cuent = useCuenta();
const isLoading = ref(false)
const DtoCuentas = [{
   cuenta: '',
   nombreCuenta: '',
   cuenta_SAP: '',
   nivel: null,
   cuenta_Moneda: '',
}]
const ListarCuentas = ref(DtoCuentas)

const getCuentas = async () => {
   isLoading.value = true
   try {
      await cuent.ObtenerCuentas('ALIMUNSA')
      ListarCuentas.value = cuent.ListadoCuentas
      isLoading.value = false

   }
   catch {
      isLoading.value = false
      MensajeAlerta('error', 'Cuentas Obtenidas con Exito!', 'Mensaje Cuentas')
   }

}

</script>
<template>
   <Card>
      <template #title>MAESTRO CUENTAS SAP</template>
      <template #content>
         <div class="flex flex-row flex-wrap">
            <Button type="button" label="Buscar" icon="pi pi-search" :loading="isLoading" @click="getCuentas" />

            <InputText id="username" v-model="value" />
            <label for="username">Username</label>

         </div>

         {{ ListarCuentas }}
      </template>

   </Card>
</template>