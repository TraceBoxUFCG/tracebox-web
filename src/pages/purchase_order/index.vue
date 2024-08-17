<script setup lang="ts">
import PurchaseOrderDataTable from '@/components/PurchaseOrderDataTable.vue'

const pageStore = usePageStore()
pageStore.title = 'Ordem de Compra'
const purchaseOrderStore = usePurchaseOrderStore()
purchaseOrderStore.fill()
</script>

<template>
  <PurchaseOrderDataTable @click-delete="() => {}"> </PurchaseOrderDataTable>
</template>
