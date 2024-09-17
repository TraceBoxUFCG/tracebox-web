<script setup lang="ts">
const pageStore = usePageStore()
pageStore.title = 'Fornecedores'

const supplierStore = useSupplierStore()
supplierStore.fill()

const onClickDelete = async (supplier: Supplier) => {
  await supplierStore.delete(supplier)
}

async function onSubmit(supplier: Supplier) {
  await supplierStore.createSupplier(supplier)
}
</script>

<template>
  <SupplierDataTable
    :data="supplierStore.suppliers"
    :pagination="{ total: supplierStore.suppliersResponse.total }"
    :onClickDelete="onClickDelete"
  >
    <FormDialog
      dialog-title="Cadastro de Fornecedores"
      dialog-description="Preencha os dados para cadastrar e depois aperte o botão de salvar"
      :dialog-trigger="{ title: 'Novo Fornecedor', icon: 'lucide:plus' }"
    >
      <SupplierForm :onSubmit="onSubmit" />
    </FormDialog>
  </SupplierDataTable>
</template>
