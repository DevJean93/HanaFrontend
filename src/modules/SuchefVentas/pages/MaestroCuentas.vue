
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

         <div class="menu">
            <Button type="button" label="Buscar" icon="pi pi-search" :loading="isLoading" @click="getCuentas"  rounded />

           <div class="field col-12 md:col-4">
                   <span class="p-float-label">
                       <InputText type="text" id="Empresa" v-model="value1" />
                       <label for="Empresa">Empresa</label>
                   </span>
               </div>


         </div>

         {{ ListarCuentas }}
      </template>

   </Card>
</template>

<style scoped>

</style>