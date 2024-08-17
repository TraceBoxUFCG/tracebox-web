<script setup lang="ts">
const pageStore = usePageStore()
pageStore.title = 'Nova Ordem de Compra'
</script>

<template>
  <PurchaseOrderCartForm />
  <PurchaseOrderItemsCartDataTable />
</template>
