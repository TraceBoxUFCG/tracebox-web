<script setup lang="ts">
const pageStore = usePageStore()
pageStore.title = 'Ordem de Compra'
const purchaseOrderStore = usePurchaseOrderStore()
purchaseOrderStore.fill()
</script>

<template>
  <ProductVarietyDataTable @click-delete="() => {}"> </ProductVarietyDataTable>
</template>
