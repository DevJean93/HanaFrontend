<script setup>
import { useLayout } from '../layout/composables/layout';
import { computed } from 'vue';

const { layoutConfig } = useLayout();

const logoUrl = computed(() => {
    return `layout/images/${layoutConfig.darkTheme.value ? 'logo-white-01' : 'logo-dark-01'}.svg`;
});
</script>

<template>
    <div class="layout-footer">

        Copyright © 2023-2024
        <span class="font-medium ml-2">GALA</span>
    </div>
</template>
<style lang="scss" scoped></style>
