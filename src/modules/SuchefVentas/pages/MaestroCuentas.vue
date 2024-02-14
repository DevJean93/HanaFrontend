
<script setup>

import { FilterMatchMode } from 'primevue/api';
import { ref, onBeforeMount } from 'vue';
import { useCuenta } from '../store/CuentasStore'
import { MensajeAlertaAuth } from '../../../composables/MensajeAlerta';
import Card from 'primevue/card';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Badge from 'primevue/badge'
import Toolbar from 'primevue/toolbar'

const cuent = useCuenta();
const isLoading = ref(false)
const inputEmpresa = ref('')
const filters = ref({});
const DtoCuentas = [{
   cuenta: '',
   nombreCuenta: '',
   cuenta_SAP: '',
   nivel: null,
   cuenta_Moneda: '',
}]
const ListarCuentas = ref(DtoCuentas)

const getCuentas = async () => {
   isLoading.value = true
   try {
      await cuent.ObtenerCuentas(inputEmpresa.value.toUpperCase())
      ListarCuentas.value = cuent.ListadoCuentas
      isLoading.value = false

   }
   catch {
      isLoading.value = false

      MensajeAlertaAuth('warning', 'No se encontraron cuentas para esta Empresa!', 'Cuentas SAP')

   }

}

const EliminarCuenta = (data) => {

   console.log(data)

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
                        @click="getCuentas" />
                  </div>
                  <div class="caja-input">
                     <span class="p-float-label">
                        <InputText type="text" id="Empresa" v-model="inputEmpresa" />
                        <label for="Empresa">Empresa</label>
                     </span>
                  </div>
               </div>
            </template>

            <!-- <template v-slot:end>
               <FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" chooseLabel="Import"
                  class="mr-2 inline-block" />
               <Button label="Export" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)" />
            </template> -->
         </Toolbar>

         <DataTable :value="ListarCuentas" paginator :rows="10" :filters="filters" :rowsPerPageOptions="[10, 15, 20, 50]"
            stripedRows tableStyle="min-width: 50rem"
            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            currentPageReportTemplate="{first} a {last} de {totalRecords}">
            <template #header>
               <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
                  <h5 class="m-0">Maestro de Cuentas</h5>
                  <span class="block mt-2 md:mt-0 p-input-icon-left">
                     <i class="pi pi-search" />
                     <InputText v-model="filters['global'].value" placeholder="Buscar..." />
                  </span>
               </div>
            </template>
            <Column header="Cuenta" sortable style="width: 15%">
               <template #body="{ data }">
                  <template v-if="data.cuenta">
                     <Badge class="mr-2">{{ data.cuenta }}</Badge>
                  </template>
               </template>
            </Column>
            <Column field="nombreCuenta" header="Descripcion" sortable style="width: 30%"></Column>
            <Column field="cuenta_SAP" header="Cta SAP" sortable style="width: 30%"></Column>
            <Column field="nivel" header="Nivel" sortable style="width: 10%"></Column>
            <Column field="cuenta_Moneda" header="Moneda" sortable style="width: 10%"></Column>
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