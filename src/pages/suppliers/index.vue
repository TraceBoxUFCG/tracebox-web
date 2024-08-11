<script setup lang="ts">
const pageStore = usePageStore()
const supplierStore = useSupplierStore()
pageStore.title = 'Fornecedores'

supplierStore.fill()
</script>

<template>
  <h1>Fornecedores</h1>
</template>
