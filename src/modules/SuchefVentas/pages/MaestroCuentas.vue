
<script setup>
import { ref } from 'vue';
import {useCuenta} from '../store/CuentasStore'
import { MensajeAlerta } from '../../../composables/MensajeAlerta';
const cuent = useCuenta();
const DtoCuentas=[{
   cuenta: '',
   nombreCuenta: '',
   cuenta_SAP: '',
   nivel: null,
   cuenta_Moneda: '',
}]
const ListarCuentas = ref(DtoCuentas)

const getCuentas = async()=>{
   try{
      await cuent.ObtenerCuentas('ALIMUNSA')
      ListarCuentas.value = cuent.ListadoCuentas
      MensajeAlerta('success','Cuentas Obtenidas con Exito!','Mensaje Cuentas')
   }
   catch{
       MensajeAlerta('error', 'Cuentas Obtenidas con Exito!', 'Mensaje Cuentas')
   }

}

</script>
<template>
    <h1>Cuentas</h1>
   <button @click="getCuentas"> Clic Test Cuentas</button>
   {{ ListarCuentas }}
</template>