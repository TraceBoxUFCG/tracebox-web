<script setup lang="ts">
const pageStore = usePageStore()
pageStore.title = 'Estoque'
const { fill } = useStockStore()

fill()
</script>

<template>
  <StockDataTable />
</template>
