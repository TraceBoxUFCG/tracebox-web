<script setup lang="ts">
const pageStore = usePageStore()
pageStore.title = 'Estoque'
const stockStore = useStockStore()

stockStore.fill()
</script>

<template>
  <StockDataTable
    :data="stockStore.stock"
    :pagination="{ total: stockStore.stockResponse.total }"
  />
</template>
