import { defineStore } from "pinia";
import { ref, computed } from "vue";
import APISAP from "../../../api/SuchefAPI/APISAP";

export const useTienda = defineStore("Tiendas", () => {
  const Tiendas = ref([
    {
      id: null,
      tiendaPOS: "",
      descripcion: "",
      empresa: "",
      agrupacion: "",
      estado: true,
      codigoSAP: null,
      descripcionSAP: null,
    },
  ]);

  const EditarTiendaById = async (data) => {
    // Buscar el índice del objeto con el id
    const indice = Tiendas.value.findIndex((tienda) => tienda.id === data.id);
    // Verificar si se encontró un objeto con el id
    if (indice !== -1) {
      // Actualizar el objeto con los nuevos datos
      Tiendas.value[indice] = { ...Tiendas.value[indice], ...data };
    } else {
      console.error(`No se encontró ninguna tienda con el id ${id}`);
    }
  };
  const ObtenerTiendas = async () => {
    await APISAP.get("/Ventas/GetTiendas").then((response) => {
      const { data } = response;
      Tiendas.value = data;
    });
  };

  const ListadoTiendas = computed(() => {
    if (Tiendas.value) {
      return Tiendas.value;
    }
    return null;
  });

  return {
    Tiendas,
    ObtenerTiendas,
    ListadoTiendas,
    EditarTiendaById,
  };
});
