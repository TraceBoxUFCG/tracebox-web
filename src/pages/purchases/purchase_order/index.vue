<script setup lang="ts">
const pageStore = usePageStore()
pageStore.title = 'Ordem de Compra'

const purchaseOrderStore = usePurchaseOrderStore()

purchaseOrderStore.fill()
</script>

<template>
  <PurchaseOrderDataTable
    :data="purchaseOrderStore.purchaseOrders"
    :pagination="{ total: purchaseOrderStore.purchaseOrdersResponse.total }"
  >
    <Button>
      <RouterLink to="/purchases/new">
        <iconify-icon lass="mr-3 size-4" icon="lucide:plus" />
        Criar pedido de compra
      </RouterLink>
    </Button>
  </PurchaseOrderDataTable>
</template>
