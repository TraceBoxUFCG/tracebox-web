<script setup lang="ts">
const purchaseOrderCartStore = usePurchaseOrderCart()
</script>

<template>
  <div class="flex flex-col gap-5">
    <PurchaseOrderCartForm />
    <PurchaseOrderItemsCartDataTable />
    <div class="flex justify-end">
      <Button @click="purchaseOrderCartStore.place()">
        <iconify-icon lass="mr-3 size-4" icon="lucide:plus" />
        Criar Ordem de Compra
      </Button>
    </div>
  </div>
</template>
