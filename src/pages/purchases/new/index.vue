<script setup lang="ts">
import router from '@/router'

const pageStore = usePageStore()
pageStore.title = ''
const purchaseOrderCartStore = usePurchaseOrderCart()

const placeOrder = async () => {
  await purchaseOrderCartStore.place()
  router.push({ path: '/purchases/purchase_order' })
}
</script>

<template>
  <div class="flex flex-col gap-5">
    <PurchaseOrderCartForm />
    <PurchaseOrderItemsCartDataTable />
    <div class="flex justify-end">
      <Button @click="placeOrder">
        <iconify-icon lass="mr-3 size-4" icon="lucide:plus" />
        Criar Ordem de Compra
      </Button>
    </div>
  </div>
</template>
