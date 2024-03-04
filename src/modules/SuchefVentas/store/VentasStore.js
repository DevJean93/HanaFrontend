import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import APISAP from '../../../api/SuchefAPI/APISAP'

export const useVenta = defineStore('Ventas', () => {
  const Ventas = ref([
    {
      Tienda: '',
      FUNICO: '',
      FechaFactura: '',
      serie: '',
      Factura: '',
      Nit: '',
      TotalFactura: null,
      Nombre: '',
      UUID: '',
      SerieFel: '',
      NumeroFel: '',
      Final1: '',
      Final2: '',
      Encabezado1: '',
      Encabezado2: '',
    },
  ])

  const ObtenerVentas = async (Tienda, FechaIni, FechaFin) => {
    await APISAP.get('/Ventas/BusquedaVentas', {
      params: {
        Tienda,
        FechaIni,
        FechaFin,
      },
    }).then((response) => {
      const { data } = response
      Ventas.value = data
    })
  }

  const ListadoVentas = computed(() => {
    if (Ventas.value) {
      return Ventas.value
    }
    return null
  })

  return {
    Ventas,
    ObtenerVentas,
    ListadoVentas,
  }
})
