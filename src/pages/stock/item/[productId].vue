<script setup lang="ts">
import type { StockDetails } from '@/types/stock'

const pageStore = usePageStore()
pageStore.title = ''

const stockStore = useStockStore()
const details = ref<StockDetails>()

const route = useRoute()
const params = route.params as { productId: string }

onMounted(async () => {
  details.value = await stockStore.getStockDetails(params.productId)
})
</script>

<template>
  <div class="flex w-full flex-row">
    <AssetDataTable
      :data="details?.assets || []"
      :disable-pagination="true"
      :disable-search-bar="true"
    >
    </AssetDataTable>
    <AssetDataTable
      :data="details?.assets || []"
      :disable-pagination="true"
      :disable-search-bar="true"
    >
    </AssetDataTable>
  </div>
</template>
