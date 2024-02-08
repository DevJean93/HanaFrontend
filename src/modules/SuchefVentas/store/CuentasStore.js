import { defineStore } from "pinia";
import {ref, computed}from'vue'
import APISAP from "../../../api/SuchefAPI/APISAP";

export const useCuenta = defineStore("Cuentas", () => {


    const Cuentas = ref([{
      cuenta: '',
      nombreCuenta: '',
      cuenta_SAP: '',
      nivel: null,
      cuenta_Moneda: '',
    }]);
    
    const ObtenerCuentas = async(Empresa)=>{
    await APISAP.get("/Hana/GetCuentas", {
      params: {
        Empresa,
      },
    }).then((response) => {
      const { data } = response;
       Cuentas.value = data
    });
    }
    
    const ListadoCuentas = computed(()=>{
      if(Cuentas.value){
        return Cuentas.value
      }
      return null
    })

    return {
      Cuentas,
      ObtenerCuentas,
      ListadoCuentas,
    };

})