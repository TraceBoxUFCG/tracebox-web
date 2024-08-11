<script setup lang="ts">
const pageStore = usePageStore()
const supplierStore = useSupplierStore()

pageStore.title = 'Fornecedores'
supplierStore.fill()
</script>

<template>
  <div class="flex flex-col items-end justify-center">
    <FormDialog
      dialogDescription="Preencha os dados de fornecedor"
      dialogTrigger="+ Fornecedor"
      dialogTitle="Cadastro de Fornecedores"
    />
  </div>
  <SupplierDataTable />
</template>
