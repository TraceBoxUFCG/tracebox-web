<script setup lang="ts">
import type { StockDetails } from '@/types/stock'

const pageStore = usePageStore()
pageStore.title = ''
const stockStore = useStockStore()
const details = ref<StockDetails>()

onMounted(async () => {
  details.value = await stockStore.getStockDetails('7')
})
</script>

<template>
  <AssetDataTable
    :data="details?.assets || []"
    :disable-pagination="true"
    :disable-search-bar="true"
  >
  </AssetDataTable>
</template>
