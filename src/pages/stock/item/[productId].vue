<script setup lang="ts">
import type { StockDetails } from '@/types/stock'

const pageStore = usePageStore()

const stockStore = useStockStore()
const details = ref<StockDetails>()

const route = useRoute()
const params = route.params as { productId: string }

onMounted(async () => {
  details.value = await stockStore.getStockDetails(params.productId)
  pageStore.title = details.value?.stock.product.name || ''
})
</script>

<template>
  <div class="flex w-full flex-row">
    <div class="w-full">
      <h2>Caixas</h2>
      <AssetDataTable
        :data="details?.assets || []"
        :disable-pagination="true"
        :disable-search-bar="true"
        :disable-actions="true"
      >
      </AssetDataTable>
    </div>
    <div class="w-full">
      <h2>Transações</h2>
      <TransactionsDataTable
        :data="details?.transactions || []"
        :disable-pagination="true"
        :disable-search-bar="true"
      >
      </TransactionsDataTable>
    </div>
  </div>
</template>
