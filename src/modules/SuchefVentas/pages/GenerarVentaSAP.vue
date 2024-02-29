
<script setup>
// API
import APISAP from '../../../api/SuchefAPI/APISAP';
// REFERENCIAS VUE
import { ref, onMounted } from 'vue';
// COMPONENTES PRIMEVUE
import Card from 'primevue/card';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import Calendar from 'primevue/calendar';

// PINIA 
import { useTienda } from '../store/TiendasStore'
import { storeToRefs } from 'pinia';

const tienda = useTienda()
const { ListadoTiendas } = storeToRefs(tienda)

// COMPOSABLES
import { crearObjetoDropdown, GenerarFecha, ObtenerFechaActual } from '../../../composables/Generales'
import { MensajeAlertaAuth } from '../../../composables/MensajeAlerta';

// Select Tiendas
const SelectedTienda = ref()
const icondisplay = ref();
const OptionsTiendas = ref()
const VentasLoading = ref(false)

// Funcion para descargar las ventas segun tienda seleccionada. 
const DescargarVentas = async () => {
    VentasLoading.value = true
    if (SelectedTienda.value != null) {
        await APISAP.get('Ventas/GenerarExcelVentas', {
            params: {
                Tienda: SelectedTienda.value.value,
                FechaIni: GenerarFecha(icondisplay.value[0]),
                FechaFin: GenerarFecha(icondisplay.value[1])
            },
            responseType: 'blob'
        })
            .then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `Ventas${ObtenerFechaActual()}.xlsx`);
                document.body.appendChild(link);
                link.click();
                VentasLoading.value = false
            })
            .catch((error) => {
                VentasLoading.value = false
                console.error('Error al descargar el archivo', error);
            });
    } else {
        MensajeAlertaAuth('warning', 'Seleccione una sucursal para continuar', 'Error de Sucursal')
        VentasLoading.value = false
    }

}

onMounted(async () => {
    // crea todoso los objetos de los dropdawn
    try {
        await tienda.ObtenerTiendas()
        OptionsTiendas.value = crearObjetoDropdown(ListadoTiendas.value, ['tiendaPOS', 'descripcion'], 'tiendaPOS')

    } catch (error) {
        MensajeAlertaAuth('error', error, 'Error de Carga')
    }

});
</script>

<template>
    <Card>
        <template #content>
            <Card class="mb-4 CardStyle">
                <template #content>
                    <div class="contenido">
                        <div class="seccion1">
                            <span class="p-float-label">
                                <Dropdown v-model="SelectedTienda" id="dropTiendas" :options="OptionsTiendas" filter
                                    resetFilterOnHide optionLabel="label" placeholder="Selecccionar Sucursal"
                                    class="mr-2 DropStyle">
                                    <template #value="slotProps">
                                        <div v-if="slotProps.value" class="flex align-items-center">
                                            <div>{{ slotProps.value.label }}</div>
                                        </div>
                                        <span v-else>
                                            {{ slotProps.placeholder }}
                                        </span>
                                    </template>
                                    <template #option="slotProps">
                                        <div class="flex align-items-center">
                                            <div>{{ slotProps.option.label }}</div>
                                        </div>
                                    </template>
                                </Dropdown>
                                <label for="dropTiendas">Sucursales</label>
                            </span>
                            <span class="p-float-label">
                                <Calendar inputId="calendar" dateFormat="dd/mm/yy" v-model="icondisplay"
                                    selectionMode="range" :manualInput="false" showIcon iconDisplay="input" class="mr-2">
                                </Calendar>
                                <label for="calendar">Rango de Fechas</label>
                            </span>
                        </div>
                        <div class="seccion2">
                            <Button label="Buscar" icon="pi pi-search" class="p-button-primary mr-2" />
                            <Button label="Descargar Excel" icon="pi pi-cloud-download" :loading="VentasLoading"
                                class="p-button-help" severity="success" @click="DescargarVentas" />
                        </div>

                    </div>
                    <!-- <Button label="Crear" icon="pi pi-plus" class="p-button-success mr-2" @click="openNew" /> -->
                </template>
            </Card>
        </template>

    </Card>
</template>

<style scoped>
.DropStyle {
    max-width: 300px;
    overflow: hidden;
    text-overflow: ellipsis;
}

.p-calendar {
    width: 100%;
}
.p-dropdown {
    width: 100%;
}

.CardStyle {
    background: #f9fafb;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    box-shadow: none;
}

.contenido {
    display: flex;
    flex-direction: row;
    gap: 7px;
}

.seccion1 {
    gap: 7px;
    width: max-content;
    display: flex;
    flex-direction: row;
}


.seccion2 {
    width: max-content;
    display: flex;
    flex-direction: row;
}

@media screen and (max-width:1068px) {

    .seccion2 {
        width: 100%;
    }

    .contenido {
        gap: 25px;
        flex-direction: column;
    }

}

@media screen and (max-width:798px) {

    .seccion1 {
        width: 100%;
        gap: 25px;
        flex-direction: column;
    }

    .seccion2 {
        width: 100%;
    }

    .contenido {
        overflow: scroll;
        gap: 25px;
        flex-direction: column;
    }

}
</style>
