<script setup lang="ts">
const pageStore = usePageStore()
pageStore.title = 'Assets'

const assetStore = useAssetStore()
assetStore.fill()
</script>

<template>
  <AssetDataTable>
    <FormDialog
      dialog-title="Cadastro de Produtos"
      dialog-description="Preencha os dados para cadastrar e depois aperte o botão de salvar"
      :dialog-trigger="{ title: 'Novo Produto', icon: 'lucide:plus' }"
    >
      <ProductForm :onSubmit="() => {}" />
    </FormDialog>
  </AssetDataTable>
</template>
