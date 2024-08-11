<script setup lang="ts">
const pageStore = usePageStore()
const supplierStore = useSupplierStore()

pageStore.title = 'Fornecedores'
supplierStore.fill()
</script>

<template>
  <SupplierDataTable />
</template>
