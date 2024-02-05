<script setup>
import { ref ,computed} from 'vue';
import { useAuth } from "../stores/AuthStore";
import AppMenuItem from './AppMenuItem.vue';
import MenuRole  from '../composables/menuModel';
//const model = ref(Model);

const auth = useAuth();
const userRole = ref(auth.user.Role); 
const Menu = MenuRole(userRole.value)
// Rol de usuario autenticado+
const filteredMenu = computed(() =>  Menu );


</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in filteredMenu" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
     
    </ul>
</template>

<style lang="scss" scoped></style>
