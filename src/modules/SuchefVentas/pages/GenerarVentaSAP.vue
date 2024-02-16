
<script setup>
// REFERENCIAS VUE
import { ref, onMounted } from 'vue';
// COMPONENTES PRIMEVUE
import Card from 'primevue/card';
import Toolbar from 'primevue/toolbar'
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import Calendar from 'primevue/calendar';

// PINIA 
import { useTienda } from '../store/TiendasStore'
import { storeToRefs } from 'pinia';

const tienda = useTienda()
const { ListadoTiendas } = storeToRefs(tienda)

// COMPOSABLES
import { crearObjetoDropdown } from '../../../composables/Generales'
import { MensajeAlertaAuth } from '../../../composables/MensajeAlerta';

// Select Tiendas
const SelectedTienda = ref()
const icondisplay = ref();
const OptionsTiendas = ref()

onMounted(async () => {
    // crea todoso los objetos de los dropdawn
    try {
        await tienda.ObtenerTiendas()
        OptionsTiendas.value = crearObjetoDropdown(ListadoTiendas.value, ['tiendaPOS', 'descripcion'], 'id')

    } catch (error) {
        MensajeAlertaAuth('error', error, 'Error de Carga')
    }


});
</script>

<template>
    <Card>
        <template #content>
            <Toolbar class="mb-4">
                <template v-slot:start>
                    <div class="my-2 menu">
                        <span class="p-float-label">
                            <Dropdown v-model="SelectedTienda" id="dropTiendas" :options="OptionsTiendas" filter
                                resetFilterOnHide optionLabel="label" placeholder="Selecccionar Sucursal" class="mr-2">
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
                        <!-- <Button label="Crear" icon="pi pi-plus" class="p-button-success mr-2" @click="openNew" /> -->
                    </div>

                    <span class="p-float-label">
                        <Calendar inputId="calendar" v-model="icondisplay" selectionMode="range" :manualInput="false"
                            showIcon iconDisplay="input" class="mr-2">
                        </Calendar>
                        <label for="calendar">Rango de Fechas</label>
                    </span>
                    <Button label="Buscar" icon="pi pi-search" class="p-button-primary mr-2" />

                </template>

                <template v-slot:end>
               <FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" chooseLabel="Import"
                  class="mr-2 inline-block" />
               <Button label="Export" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)" />
            </template>
            </Toolbar>


        </template>

    </Card>
</template>

<style scoped></style>
