<script setup lang="ts">
const pageStore = usePageStore()
pageStore.title = 'Fornecedores'

const supplierStore = useSupplierStore()
supplierStore.fill()
</script>

<template>
  <SupplierDataTable />
</template>
