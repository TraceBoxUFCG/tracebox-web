<script setup lang="ts">
import PurchaseOrderDataTable from '@/components/purchaseOrder/PurchaseOrderDataTable.vue'

const pageStore = usePageStore()
pageStore.title = 'Ordem de Compra'

const purchaseOrderStore = usePurchaseOrderStore()

purchaseOrderStore.fill()
</script>

<template>
  <PurchaseOrderDataTable>
    <Button>
      <RouterLink to="/purchases/new">
        <iconify-icon lass="mr-3 size-4" icon="lucide:plus" />
        Criar pedido de compra
      </RouterLink>
    </Button>
  </PurchaseOrderDataTable>
</template>
