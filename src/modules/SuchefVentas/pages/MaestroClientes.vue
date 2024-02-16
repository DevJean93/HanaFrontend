
<script setup>

import { FilterMatchMode } from 'primevue/api';
import { ref, onBeforeMount } from 'vue';
import { useCliente } from '../store/ClientesStore'
import { MensajeAlertaAuth } from '../../../composables/MensajeAlerta';
import Card from 'primevue/card';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Badge from 'primevue/badge'
import Toolbar from 'primevue/toolbar'
import { storeToRefs } from 'pinia'


const client = useCliente();
const {ListadoClientes} =  storeToRefs(client)
const isLoading = ref(false)
const filters = ref({});
const DtoClientes = [{
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
}]
const ListarClient = ref(DtoClientes)

const getClientes = async () => {
    isLoading.value = true
    try {
        await client.ObtenerClientesAlimunsa()
        ListarClient.value = ListadoClientes.value
        isLoading.value = false

    }
    catch (error) {
        isLoading.value = false
     MensajeAlertaAuth('warning', 'No se encontraron clientes para esta Empresa!', 'Cuentas SAP')         
    }

}


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
                                @click="getClientes" />
                        </div>
                    </div>
                </template>

                <!-- <template v-slot:end>
               <FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" chooseLabel="Import"
                  class="mr-2 inline-block" />
               <Button label="Export" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)" />
            </template> -->
            </Toolbar>

            <DataTable :value="ListarClient" paginator :rows="10" :filters="filters" :rowsPerPageOptions="[10, 15, 20, 50]"
                stripedRows tableStyle="min-width: 50rem"
                paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                currentPageReportTemplate="{first} a {last} de {totalRecords}" class="p-datatable-gridlines">
                <template #header>
                    <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
                        <h5 class="m-0">Maestro de Clientes</h5>
                        <span class="block mt-2 md:mt-0 p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText v-model="filters['global'].value" placeholder="Buscar..." />
                        </span>
                    </div>
                </template>
                <Column header="Codigo" sortable style="width: 5%">
                    <template #body="{ data }">
                        <template v-if="data.codigo">
                            <Badge style="width: 100%;" class="mr-2">{{ data.codigo }}</Badge>
                        </template>
                    </template>
                </Column>
                <Column field="nombre" header="Nombre" sortable style="width: 10%"></Column>
                <Column field="grupo" header="NoGrupo" sortable style="width: 2%"></Column>
                <Column field="nombrE_GRUPO" header="Desc Grupo" sortable style="width: 5%"></Column>
                <Column field="tipo" header="Tipo Grupo" sortable style="width: 2%"></Column>
                <Column field="nit" header="Nit" sortable style="width: 5%"></Column>
                <Column field="moneda" header="Moneda" sortable style="width: 6%"></Column>
                <Column field="limitecredito" header="Limite Credito" sortable style="width: 6%"></Column>
                <Column field="fechaactualiza" header="Fecha Actualiza" sortable style="width: 6%"></Column>
                <Column field="deuda" header="Deuda" sortable style="width: 6%"></Column>
                <Column field="saldo" header="Saldo" sortable style="width: 6%"></Column>
                <Column field="estado" header="Estado" sortable style="width: 2%"></Column>
                <!-- <Column header="Acciones" style="width: 10%;">
               <template #body="slotProps">
                  <template v-if="slotProps.data.cuenta">
                     <Button icon="pi pi-trash" class="p-button-rounded p-button-warning mt-2"
                        @click="EliminarCuenta(slotProps.data)" />
                  </template>
               </template>
            </Column> -->
            </DataTable>
        </template>

    </Card>
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