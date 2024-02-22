
<script setup>
// RERERENCIAS VUE
import { ref, onBeforeMount, onMounted } from 'vue'
import { FilterMatchMode } from 'primevue/api';
// APIS
import APISAP from '../../../api/SuchefAPI/APISAP';
// REFERENCIAS DE PRIME VUE
import Card from 'primevue/card'
import Toolbar from 'primevue/toolbar'
import DataTable from 'primevue/datatable'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Column from 'primevue/column';
import Badge from 'primevue/badge';
import Dialog from 'primevue/dialog'
// REFERENCIAS GENERALES
import { MensajeAlertaAuth, ToastAlert, ConfirmAlert } from '../../../composables/MensajeAlerta';
// PINIA 
import { useParametro } from '../store/ParametrosStore'
import { storeToRefs } from 'pinia';


const DTOParametro = ref([
    {
        Id: "",
        Propiedad: "",
        Valor: "",
        Descripcion: "",
    },
]);

const CreateParametro = ref([
    {
        Id: "",
        Propiedad: "",
        Valor: "",
        Descripcion: "",
    },
]);

// LOADINGS

const isLoadingEdit = ref(false)
const isLoadingDelete = ref(false)
const saveParametroLoad = ref(false)
const submitted = ref(false);
const submittedCreate = ref(false);
//Drops
const parametro = ref({});

const ParametrosEditDialog = ref(false)
const ParametrosCreateDialog = ref(false)
const params = useParametro();
const { ListadoParametros } = storeToRefs(params)
const ListarParametros = ref(DTOParametro)



const CrearParametro = async () => {
    console.log(CreateParametro)
    submittedCreate.value = true
    if (CreateParametro.value.propiedad && CreateParametro.value.descripcion && CreateParametro.value.valor) {

        await APISAP.post("/Ventas/CrearParametrosVenta", {
            id: 0,
            propiedad: CreateParametro.value.propiedad,
            valor: CreateParametro.value.valor,
            descripcion: CreateParametro.value.descripcion
        }).then((response) => {
            console.log(response.data)
            params.InsertarParametro(response.data)
            ParametrosCreateDialog.value = false
            ToastAlert('success', 'Parametro creado con Exito')
            submittedCreate.value = false
        }).catch((error) => {
            ParametrosCreateDialog.value = false
            submittedCreate.value = false
            MensajeAlertaAuth('error', error.message, 'Error')
        })
    }

}

const ModalCrear = () => {
    ParametrosCreateDialog.value = true
}

const EditarParametro = async (data) => {
    // se abre el modal
    ParametrosEditDialog.value = true
    // se asigna la data 
    parametro.value = { ...data };
    console.log(data)
}

const SaveParametro = async () => {
    submitted.value = true
    if (parametro.value.propiedad && parametro.value.descripcion && parametro.value.valor) {

        await APISAP.put("/Ventas/EditarParametrosVenta", parametro.value).then((response) => {
            params.EditarParametroById(response.data)
            saveParametroLoad.value = false
            ParametrosEditDialog.value = false
            ToastAlert('success', 'Parametro editado con Exito')
            submitted.value = false
        }).catch((error) => {
            saveParametroLoad.value = false
            ParametrosEditDialog.value = false
            submitted.value = false
            MensajeAlertaAuth('error', error.message, 'Error')
        })
    }
}

const EliminarParametro = async (data) => {
    ConfirmAlert('Eliminar Parametro', 
    `Esta seguro de eliminar el Parametro ${data.propiedad}`, 
    'warning', 'Si Eliminar', 
  async  (result) => {
        if (result.isConfirmed) {
           await APISAP.delete("/Ventas/EliminarParametrosVenta",{
            params:{
                Id: data.id
            }
           }).then((response)=>{
             params.EliminarParametro(response.data)
             console.log(response.data)
              ToastAlert('success', 'Parametro eliminado con Exito')
           }).catch((error)=>{
              MensajeAlertaAuth('error', error.message, 'Error')
           })
        }
    })
}
const hideDialog = () => {
    ParametrosEditDialog.value = false;
    submitted.value = false;
};

const hideDialogCreate = () => {
    ParametrosCreateDialog.value = false;
    submittedCreate.value = false;
};
const filters = ref({});
onBeforeMount(() => {
    initFilters();
});

const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    };
};


onMounted(async () => {

    try {
        await params.ObtenerParametros()
        ListarParametros.value = ListadoParametros.value
    }
    catch {
        MensajeAlertaAuth('warning', 'No se encontraron parametros para esta Empresa!', 'Cuentas SAP')

    }
});

</script>


<template>
    <Card>
        <template #content>
            <Toolbar class="mb-4">
                <template v-slot:start>
                    <div class="my-2 menu">
                        <div class="caja-botones">
                            <Button label="Crear" icon="pi pi-search" class="p-button-success mr-2"
                                :loading="isLoadingDelete" @click="ModalCrear" />
                        </div>
                    </div>
                </template>
            </Toolbar>

            <DataTable :value="ListarParametros" paginator :rows="10" :filters="filters"
                :rowsPerPageOptions="[10, 15, 20, 50]" stripedRows tableStyle="min-width: 50rem"
                paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                currentPageReportTemplate="{first} a {last} de {totalRecords}" class="p-datatable-gridlines">
                <template #header>
                    <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
                        <h5 class="m-0">Parametros Ventas</h5>
                        <span class="block mt-2 md:mt-0 p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText v-model="filters['global'].value" placeholder="Buscar..." />
                        </span>
                    </div>
                </template>
                <Column field="id" header="Id Parametro" sortable headerStyle="min-width:5rem;"></Column>
                <Column field="propiedad" header="Propiedad" sortable headerStyle="min-width:10rem;"></Column>
                <Column header="Valor" :sortable="true" headerStyle="min-width:10rem;">
                    <template #body="{ data }">
                        <template v-if="data.valor">
                            <Badge style="width: 100%;" class="mr-2" severity="primary">{{ data.valor }}</Badge>
                        </template>
                    </template>
                </Column>
                <Column field="descripcion" header="Descripcion" sortable headerStyle="min-width:10rem;"></Column>
                <Column header="Acciones" headerStyle="min-width:10rem;">
                    <template #body="slotProps">
                        <template v-if="slotProps.data.id">
                            <Button icon="pi pi-file-edit" :loading="isLoadingEdit"
                                class="p-button-rounded p-button-warning mt-2 mr-2"
                                @click="EditarParametro(slotProps.data)" />
                            <Button icon="pi pi-eraser" :loading="isLoadingDelete"
                                class="p-button-rounded p-button-danger mt-2" @click="EliminarParametro(slotProps.data)" />
                        </template>

                    </template>
                </Column>
            </DataTable>

            <Dialog v-model:visible="ParametrosEditDialog" :style="{ width: '450px' }" header="EDITAR PARAMETRO"
                :modal="true" class="p-fluid">
                <div class="field">
                    <label for="id">Id Parametro</label>
                    <InputText id="id" v-model.trim="parametro.id" required="true" autofocus :disabled="true"
                        :class="{ 'p-invalid': submitted && !parametro.id }" />
                    <small class="p-invalid" v-if="submitted && !parametro.id">El Parametro es requerido</small>
                </div>
                <div class="field">
                    <label for="">Propiedad</label>
                    <InputText id="propiedad" v-model.trim="parametro.propiedad" required="true" autofocus
                        :class="{ 'p-invalid': submitted && !parametro.propiedad }" />
                    <small class="p-invalid" v-if="submitted && !parametro.propiedad">La Propiedad es requerida</small>
                </div>
                <div class="field">
                    <label for="">Valor</label>
                    <InputText id="valor" v-model.trim="parametro.valor" required="true" autofocus
                        :class="{ 'p-invalid': submitted && !parametro.valor }" />
                    <small class="p-invalid" v-if="submitted && !parametro.valor">El valor es requerido</small>
                </div>
                <div class="field">
                    <label for="">Descripcion</label>
                    <InputText id="descripcion" v-model.trim="parametro.descripcion" required="true" autofocus
                        :class="{ 'p-invalid': submitted && !parametro.descripcion }" />
                    <small class="p-invalid" v-if="submitted && !parametro.descripcion">La descripcion es requerida</small>
                </div>

                <template #footer>
                    <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog" />
                    <Button label="Guardar" icon="pi pi-check" class="p-button-text" :loading="saveParametroLoad"
                        @click="SaveParametro" />
                </template>
            </Dialog>

            <Dialog v-model:visible="ParametrosCreateDialog" :style="{ width: '450px' }" header="CREAR PARAMETRO"
                :modal="true" class="p-fluid">
                <div class="field">
                    <label for="">Propiedad</label>
                    <InputText id="propiedad" v-model.trim="CreateParametro.propiedad" required="true" autofocus
                        :class="{ 'p-invalid': submittedCreate && !CreateParametro.propiedad }" />
                    <small class="p-invalid" v-if="submittedCreate && !CreateParametro.propiedad">La Propiedad es
                        requerida</small>
                </div>
                <div class="field">
                    <label for="">Valor</label>
                    <InputText id="valor" v-model.trim="CreateParametro.valor" required="true" autofocus
                        :class="{ 'p-invalid': submittedCreate && !CreateParametro.valor }" />
                    <small class="p-invalid" v-if="submittedCreate && !CreateParametro.valor">El valor es requerido</small>
                </div>
                <div class="field">
                    <label for="">Descripcion</label>
                    <InputText id="descripcion" v-model.trim="CreateParametro.descripcion" required="true" autofocus
                        :class="{ 'p-invalid': submittedCreate && !CreateParametro.descripcion }" />
                    <small class="p-invalid" v-if="submittedCreate && !CreateParametro.descripcion">La descripcion es
                        requerida</small>
                </div>

                <template #footer>
                    <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialogCreate" />
                    <Button label="Guardar" icon="pi pi-check" class="p-button-text" :loading="saveParametroLoad"
                        @click="CrearParametro" />
                </template>
            </Dialog>
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