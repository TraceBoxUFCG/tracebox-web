<script setup lang="ts">
import { toast } from '@/components/ui/toast'
const pageStore = usePageStore()
pageStore.title = 'Fornecedores'

const supplier = ref<Supplier>(null)

const supplierStore = useSupplierStore()
supplierStore.fill()

const onClickUpdate = (s: Supplier) => {
  supplier.value = s
  toast({
    title: `Update Supplier ${s.id}`
  })
}

const onClickDelete = (supplier: Supplier) => {
  toast({
    title: `Delete Supplier ${supplier.id}`,
    variant: 'destructive'
  })
}
</script>

<template>
  <SupplierDataTable :onClickDelete="onClickDelete" :onClickUpdate="onClickUpdate">
  </SupplierDataTable>
</template>
