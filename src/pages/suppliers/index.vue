<script setup lang="ts">
const pageStore = usePageStore()
const supplierStore = useSupplierStore()

pageStore.title = 'Fornecedores'
supplierStore.fill()
</script>

<template>
  <div class="flex flex-col items-end justify-center">
    <FormDialog
      dialog-title="Cadastro de Fornecedores"
      dialog-description="Preencha os dados para cadastrar e depois aperte o botão de salvar"
      :dialog-trigger="{ title: 'Novo Fornecedor', icon: 'lucide:plus' }"
    >
      <SupplierForm />
    </FormDialog>
  </div>
  <SupplierDataTable />
</template>
