<script setup lang="ts">
import { toast } from '@/components/ui/toast'
const pageStore = usePageStore()
pageStore.title = 'Fornecedores'

const supplier = ref<Supplier>(null)

const supplierStore = useSupplierStore()
supplierStore.fill()

const onClickUpdate = async (s: Supplier) => {
  supplier.value = s
  toast({
    title: `Update Supplier ${s.id}`
  })
}

const onClickDelete = async (supplier: Supplier) => {
  await supplierStore.delete(supplier)
}

async function onSubmit(values: Supplier) {
  await supplierStore.createSupplier(values)
}
</script>

<template>
  <SupplierDataTable :onClickDelete="onClickDelete" :onClickUpdate="onClickUpdate">
    <FormDialog
      dialog-title="Cadastro de Fornecedores"
      dialog-description="Preencha os dados para cadastrar e depois aperte o botão de salvar"
      :dialog-trigger="{ title: 'Novo Fornecedor', icon: 'lucide:plus' }"
    >
      <SupplierForm :onSubmit="onSubmit" />
    </FormDialog>
  </SupplierDataTable>
</template>
