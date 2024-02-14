
<script setup>

import { FilterMatchMode } from 'primevue/api';
import { ref, onBeforeMount } from 'vue';
import { useTienda } from '../store/TiendasStore'
import { ToastAlert, MensajeAlertaAuth } from '../../../composables/MensajeAlerta';
import Card from 'primevue/card';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Badge from 'primevue/badge'
import Toolbar from 'primevue/toolbar'
import { storeToRefs } from 'pinia'
import Dropdown from 'primevue/dropdown';
import Dialog from 'primevue/dialog'
import { useCuenta } from '../store/CuentasStore';
import { useCliente } from '../store/ClientesStore'
import crearObjetoDropdown from '../../../composables/Generales'
import APISAP from '../../../api/SuchefAPI/APISAP';

// SELECT DE CUENTAS
const cuent = useCuenta();
const ListaCuentas = ref([])
const SelectedCuentaSAP = ref()

// SELECT DE CLIENTES
const client = useCliente();
const ListaCliente = ref([])
const SelectedClienteSAP = ref()


//DROPDAWN
const TiendasDialog = ref(false);
const submitted = ref(false);

// STORE TIENDAS
const sucursal = ref({});
const tienda = useTienda();
const { ListadoTiendas } = storeToRefs(tienda)

// CARGADO Y FILTRO DE TABLA
const isLoading = ref(false)
const filters = ref({});
const isLoadingEdit = ref(false)

// MODELO DEL OBJETO TIENDA
const DtoTiendas = [{
    id: null,
    tiendaPOS: "",
    descripcion: "",
    empresa: "",
    agrupacion: "",
    estado: null,
    codigoSAP: null,
    descripcionSAP: null,
    cuentaSAP: null,
    ctaDescripcion: null
}]


const ListarTiendas = ref(DtoTiendas)

const getTiendas = async () => {
    isLoading.value = true
    try {
        await tienda.ObtenerTiendas()
        ListarTiendas.value = ListadoTiendas.value
        isLoading.value = false
    }
    catch (error) {
        isLoading.value = false
        MensajeAlertaAuth('warning', 'No se encontraron tiendas!', 'Tiendas SAP')
    }

}

const EditarTienda = async (editTienda) => {

    try {
        isLoadingEdit.value = true
        sucursal.value = { ...editTienda };
        SelectedCuentaSAP.value = null
        SelectedClienteSAP.value = null

        if (cuent.ListadoCuentas.length <= 1) { await cuent.ObtenerCuentas('ALIMUNSA') }

        if (client.ListadoClientes.length <= 1) { await client.ObtenerClientesAlimunsa() }

        const listadoCuenta = cuent.ListadoCuentas.filter(cta => cta.nombreCuenta.includes('Venta'))
        const listadoCliente = client.ListadoClientes

        const DtoTiendasConStatus = crearObjetoDropdown(listadoCuenta, ['nombreCuenta', 'cuenta'], 'cuenta')
        const DtoClienteConStatus = crearObjetoDropdown(listadoCliente, ['codigo', 'nombre'], 'codigo')

        ListaCuentas.value = DtoTiendasConStatus
        ListaCliente.value = DtoClienteConStatus
        isLoadingEdit.value = false
        TiendasDialog.value = true;


    } catch (error) {
        isLoadingEdit.value = false
        MensajeAlertaAuth('error', error.message, 'error')
    }


};

const SaveTienda = async () => {
    submitted.value = true
    const TiendasDTO = {
        IdTienda: sucursal.value.id,
        Cliente: SelectedClienteSAP.value.value,
        Cuenta: SelectedCuentaSAP.value.value,
    };

    await APISAP.put("/Ventas/EditTienda", TiendasDTO).then((response) => {
        tienda.EditarTiendaById(response.data)
        TiendasDialog.value = false
        ToastAlert('success', 'Tienda editada con Exito')
        submitted.value = false
    }).catch((error) => {
        TiendasDialog.value = false
        submitted.value = false
        MensajeAlertaAuth('error', error.message, 'Error')
    })


}

const hideDialog = () => {
    TiendasDialog.value = false;
    submitted.value = false;
};


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
            <Toolbar class="mb-4">
                <template v-slot:start>
                    <div class="my-2 menu">
                        <div class="caja-botones">
                            <Button label="Buscar" icon="pi pi-search" class="p-button-primary mr-2" :loading="isLoading"
                                @click="getTiendas" />
                            <!-- <Button label="Crear" icon="pi pi-plus" class="p-button-success mr-2" @click="openNew" /> -->
                        </div>
                    </div>
                </template>

                <!-- <template v-slot:end>
               <FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" chooseLabel="Import"
                  class="mr-2 inline-block" />
               <Button label="Export" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)" />
            </template> -->
            </Toolbar>

            <DataTable :value="ListarTiendas" paginator :rows="10" :filters="filters" :rowsPerPageOptions="[10, 15, 20, 50]"
                stripedRows tableStyle="min-width: 50rem"
                paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                currentPageReportTemplate="{first} a {last} de {totalRecords}">
                <template #header>
                    <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
                        <h5 class="m-0">Maestro de Tiendas</h5>
                        <span class="block mt-2 md:mt-0 p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText v-model="filters['global'].value" placeholder="Buscar..." />
                        </span>
                    </div>
                </template>
                <Column header="Codigo Sucursal" :sortable="true" style="width: 5%">
                    <template #body="{ data }">
                        <template v-if="data.tiendaPOS">
                            <Badge style="width: 100%;" class="mr-2">{{ data.tiendaPOS }}</Badge>
                        </template>
                    </template>
                </Column>
                <Column field="descripcion" header="Descripcion" :sortable="true" headerStyle="min-width:10rem;"></Column>
                <Column field="agrupacion" header="Agrupacion" :sortable="true" headerStyle="min-width:10rem;"></Column>
                <Column header="Estado" :sortable="true" headerStyle="min-width:10rem;">
                    <template #body="{ data }">
                        <template v-if="data.estado !== null">
                            <template v-if="data.estado === true">
                                <Badge style="width: 100%;" class="mr-2" severity="success">ACTIVO</Badge>

                            </template>
                            <template v-else>
                                <Badge style="width: 100%;" class="mr-2" severity="warning">INACTIVO</Badge>

                            </template>
                        </template>
                    </template>
                </Column>
                <Column header="Codigo SAP" :sortable="true" style="width: 5%">
                    <template #body="{ data }">
                        <template v-if="data.codigoSAP">
                            <Badge style="width: 100%;" class="mr-2" severity="warning">{{ data.codigoSAP }}</Badge>
                        </template>
                    </template>
                </Column>
                <Column field="descripcionSAP" header="Descripcion SAP" :sortable="true" headerStyle="min-width:10rem;">
                </Column>
                <Column header="Cuenta SAP" :sortable="true" style="width: 5%">
                        <template #body="{ data }">
                            <template v-if="data.cuentaSAP">
                                <Badge style="width: 100%;" class="mr-2" severity="warning">{{ data.cuentaSAP }}</Badge>
                            </template>
                        </template>
                    </Column>
                <Column field="ctaDescripcion" header="Desc Cuenta" :sortable="true" headerStyle="min-width:10rem;">
                </Column>
                <Column header="Acciones" headerStyle="min-width:10rem;">
                    <template #body="slotProps">
                        <template v-if="slotProps.data.id">
                            <Button icon="pi pi-file-edit" :loading="isLoadingEdit"
                                class="p-button-rounded p-button-warning mt-2" @click="EditarTienda(slotProps.data)" />
                        </template>
                    </template>
                </Column>
            </DataTable>
        </template>

    </Card>


    <Dialog v-model:visible="TiendasDialog" :style="{ width: '450px' }" header="ASIGNACION SAP" :modal="true"
        class="p-fluid">
        <div class="field">
            <label for="tiendaPos">Codigo Sucursal</label>
            <InputText id="tiendaPos" v-model.trim="sucursal.tiendaPOS" required="true" autofocus :disabled="true"
                :class="{ 'p-invalid': submitted && !sucursal.tiendaPOS }" />
            <small class="p-invalid" v-if="submitted && !sucursal.tiendaPOS">La tienda es requerida</small>
        </div>
        <div class="field">
            <label for="descripcion">Descripcion</label>
            <InputText id="descripcion" v-model.trim="sucursal.descripcion" required="true" autofocus :disabled="true"
                :class="{ 'p-invalid': submitted && !sucursal.descripcion }" />
            <small class="p-invalid" v-if="submitted && !sucursal.tiendaPOS">La descripcion es requerida</small>
        </div>

        <div class="field">
            <label for="clienteSAP" class="mb-3">Cuenta SAP</label>

            <Dropdown v-model="SelectedCuentaSAP" :options="ListaCuentas" filter resetFilterOnHide optionLabel="label"
                placeholder="Seleccciona una Cuenta">
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
        </div>
        <div class="field">
            <label for="clienteSAP" class="mb-3">Cliente SAP</label>

            <Dropdown v-model="SelectedClienteSAP" :options="ListaCliente" filter resetFilterOnHide optionLabel="label"
                placeholder="Seleccciona un Cliente">
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
        </div>
        <template #footer>
            <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog" />
            <Button label="Guardar" icon="pi pi-check" class="p-button-text" @click="SaveTienda" />
        </template>
    </Dialog>
</template>

<style scoped>
.menu {
    display: flex;
}

@media screen and (max-width:478px) {
    .menu {

        flex-direction: column;
        flex-direction: column-reverse;
        gap: 10px;
    }

}
</style>