<script setup>
// API
import APISAP from "../../../api/SuchefAPI/APISAP"

// REFERENCIAS VUE
import { ref, onMounted, onBeforeMount } from "vue"
// COMPONENTES PRIMEVUE
import Card from "primevue/card"
import Button from "primevue/button"
import Dropdown from "primevue/dropdown"
import Calendar from "primevue/calendar"
import Skeleton from "primevue/skeleton"
import InputText from "primevue/inputtext"
import Badge from 'primevue/badge'
import Column from 'primevue/column'
import DataTable from "primevue/datatable"
import { FilterMatchMode } from 'primevue/api';

// PINIA
import { useTienda } from "../store/TiendasStore"
import { useVenta } from "../store/VentasStore"
import { storeToRefs } from "pinia"

const tienda = useTienda()
const { ListadoTiendas } = storeToRefs(tienda)
const ventas = useVenta()
const { ListadoVentas } = storeToRefs(ventas)


// COMPOSABLES
import {
    crearObjetoDropdown,
    GenerarFecha,
    ObtenerFechaActual,
} from "../../../composables/Generales"
import { MensajeAlertaAuth } from "../../../composables/MensajeAlerta"
import Row from "primevue/row"

// Datatable
const isLoading = ref(false)
const BtnDescargar = ref(false)
const ListarVentas = ref([{}])
// Select Tiendas
const SelectedTienda = ref()
const icondisplay = ref()
const OptionsTiendas = ref()
const VentasLoading = ref(false)
const filters = ref({});



const BuscarVentas = async () => {
    isLoading.value = true
    BtnDescargar.value = false

    try {

        if (SelectedTienda.value === undefined) {
            throw { message: 'Seleccione una tienda para continuar' }
        }
        if (icondisplay.value === undefined) {
            throw { message: 'Seleccione un rango de fecha para continuar' }
        }
        if (icondisplay.value[0] === null) {
            throw { message: 'Seleccione una fecha Inicial' }
        }
        if (icondisplay.value[1] === null) {
            throw { message: 'Seleccione una fecha Final' }
        }
 
        await ventas.ObtenerVentas(SelectedTienda.value.value, GenerarFecha(icondisplay.value[0]), GenerarFecha(icondisplay.value[1]))
        ListarVentas.value = ListadoVentas.value
        isLoading.value = false
        if (ListarVentas.value.length > 0) {
            BtnDescargar.value = true
        } else {
            BtnDescargar.value = false
        }
    } catch (error) {
        console.log(error)
        MensajeAlertaAuth('error', error.message, 'Error Busqueda ventas')
        isLoading.value = false
        BtnDescargar.value = false
    }
    isLoading.value = false
}

// Funcion para descargar las ventas segun tienda seleccionada.
const DescargarVentas = async () => {
    VentasLoading.value = true
    if (SelectedTienda.value != null) {
        await APISAP.get("Ventas/GenerarExcelVentas", {
            params: {
                Tienda: SelectedTienda.value.value,
                FechaIni: GenerarFecha(icondisplay.value[0]),
                FechaFin: GenerarFecha(icondisplay.value[1]),
            },
            responseType: "blob",
        })
            .then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]))
                const link = document.createElement("a")
                link.href = url
                link.setAttribute("download", `Ventas${ObtenerFechaActual()}.xlsx`)
                document.body.appendChild(link)
                link.click()
                VentasLoading.value = false
            })
            .catch((error) => {
                VentasLoading.value = false
                console.error("Error al descargar el archivo", error)
            })
    } else {
        MensajeAlertaAuth(
            "warning",
            "Seleccione una sucursal para continuar",
            "Error de Sucursal"
        )
        VentasLoading.value = false
    }
}

onMounted(async () => {
    // crea todoso los objetos de los dropdawn
    try {
        await tienda.ObtenerTiendas()
        OptionsTiendas.value = crearObjetoDropdown(
            ListadoTiendas.value,
            ["tiendaPOS", "descripcion"],
            "tiendaPOS"
        )
    } catch (error) {
        MensajeAlertaAuth("error", error, "Error de Carga")
    }
})

onBeforeMount(() => {
    initFilters();
});

const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    };
};

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
                                    selectionMode="range" :manualInput="false" showIcon iconDisplay="input"
                                    class="mr-2">
                                </Calendar>
                                <label for="calendar">Rango de Fechas</label>
                            </span>
                        </div>
                        <div class="seccion2">
                            <Button label="Buscar" icon="pi pi-search" @click="BuscarVentas"
                                class="p-button-primary mr-2" :loading="isLoading" />
                            <Button label="Descargar Excel" v-if="BtnDescargar" icon="pi pi-cloud-download"
                                :loading="VentasLoading" class="p-button-help" severity="success"
                                @click="DescargarVentas" />
                        </div>
                    </div>
                    <!-- <Button label="Crear" icon="pi pi-plus" class="p-button-success mr-2" @click="openNew" /> -->
                </template>
            </Card>

            <DataTable :value="ListarVentas" paginator :rows="10" :filters="filters"
                :rowsPerPageOptions="[10, 15, 20, 50]" stripedRows tableStyle="min-width: 50rem"
                paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                currentPageReportTemplate="{first} a {last} de {totalRecords}" class="p-datatable-gridlines">

                <template #header>
                    <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
                        <h5 class="m-0">Ventas Sucursales</h5>
                        <span class="block mt-2 md:mt-0 p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText v-model="filters['global'].value" placeholder="Buscar..." />
                        </span>
                    </div>
                </template>
                <Column header="Tienda" sortable style="width: 5%">

                    <template #body="{ data }">
                        <template v-if="isLoading">
                            <Skeleton></Skeleton>
                        </template>

                        <template v-if="data.tienda & isLoading == false">
                            <Badge style="width: 100%" class="mr-2">{{ data.tienda }}</Badge>
                        </template>
                    </template>
                </Column>
                <Column field="fechaFactura" header="Fecha" sortable headerStyle="min-width:5rem;">

                    <template #body v-if="isLoading">
                        <Skeleton></Skeleton>
                    </template>
                </Column>
                <Column field="serie" header="Serie" sortable headerStyle="min-width:5rem;">

                    <template #body v-if="isLoading">
                        <Skeleton></Skeleton>
                    </template>
                </Column>
                <Column field="factura" header="No.Factura" sortable headerStyle="min-width:5rem;">

                    <template #body v-if="isLoading">
                        <Skeleton></Skeleton>
                    </template>
                </Column>
                <Column field="nit" header="Nit" sortable headerStyle="min-width:5rem;">

                    <template #body v-if="isLoading">
                        <Skeleton></Skeleton>
                    </template>
                </Column>
                <Column field="totalFactura" header="Total Factura" sortable headerStyle="min-width:5rem;">

                    <template #body v-if="isLoading">
                        <Skeleton></Skeleton>
                    </template>
                </Column>
                <Column field="serieFel" header="Serie Fel" sortable headerStyle="min-width:5rem;">

                    <template #body v-if="isLoading">
                        <Skeleton></Skeleton>
                    </template>
                </Column>
                <Column field="numeroFel" header="Limite Credito" sortable headerStyle="min-width:5rem;">

                    <template #body v-if="isLoading">
                        <Skeleton></Skeleton>
                    </template>
                </Column>
                <Column field="encabezado2" header="Encabezado" sortable headerStyle="min-width:5rem;">

                    <template #body v-if="isLoading">
                        <Skeleton></Skeleton>
                    </template>
                </Column>
            </DataTable>
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

@media screen and (max-width: 1068px) {
    .seccion2 {
        width: 100%;
    }

    .contenido {
        gap: 25px;
        flex-direction: column;
    }
}

@media screen and (max-width: 798px) {
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
