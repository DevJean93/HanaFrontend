import { defineStore } from "pinia";
import { ref, computed } from "vue";
import APISAP from "../../../api/SuchefAPI/APISAP";

export const useParametro = defineStore("Parametros", () => {
  const Parametro = ref([
    {
      id: null,
      propiedad: "",
      valor: "",
      descripcion: "",
    },
  ]);

  const ObtenerParametros = async () => {
    await APISAP.get("/Ventas/GetParametrosVenta").then((response) => {
      const { data } = response;
      Parametro.value = data;
    });
  }

  
  const EditarParametroById = async (data) => {
    // Buscar el índice del objeto con el id
    const indice = Parametro.value.findIndex((params) => params.id === data.id);

    // Verificar si se encontró un objeto con el id
    if (indice !== -1) {
      // Actualizar el objeto con los nuevos datos
      Parametro.value[indice] = { ...Parametro.value[indice], ...data };
    } else {
      console.error(`No se encontró ningun parametro con el id ${id}`);
    }
  };
  const InsertarParametro = (nuevoParametro)=>{
    Parametro.value.push(nuevoParametro);
  }

  const ListadoParametros = computed(() => {
    if (Parametro.value) {
      return Parametro.value;
    }
    return null;
  });

  return {
    Parametro,
    InsertarParametro,
    EditarParametroById,
    ObtenerParametros,
    ListadoParametros,
  };
});
