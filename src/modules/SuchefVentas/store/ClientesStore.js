import { defineStore } from "pinia";
import { ref, computed } from "vue";
import APISAP from "../../../api/SuchefAPI/APISAP";

export const useCliente = defineStore("Clientes", () => {
  const Clientes = ref([
    {
      codigo: '',
      nombre: '',
      nombreext: '',
      grupo: null,
      nombrE_GRUPO: '',
      tipo: '',
      u_Codigo_Anterior: null,
      nit: '',
      moneda: '',
      limitecredito: null,
      fechaactualiza: '',
      deuda: null,
      saldo: null,
      estado: '',
    },
  ]);

  const ObtenerClientesAlimunsa = async () => {
    await APISAP.get("/Hana/GetClientesAlimunsa", {
    }).then((response) => {
      const { data } = response;
      Clientes.value = data;
    });
  };

  const ListadoClientes = computed(() => {
    if (Clientes.value) {
      return Clientes.value;
    }
    return null;
  });

  return {
    Clientes,
    ObtenerClientesAlimunsa,
    ListadoClientes,
  };
});
