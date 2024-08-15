<script setup lang="ts">
const pageStore = usePageStore()
pageStore.title = 'Variedade de Produtos'

const assetStore = useAssetStore()
assetStore.fill()
</script>

<template>
  <AssetDataTable>
    <FormDialog
      dialog-title="Importação de Variedades"
      dialog-description="Faça o upload do arquivo .csv para upload das variedades. O arquivo deve seguir o seguinte padrão: product_id,name"
      :dialog-trigger="{ title: 'Importar Variedades', icon: 'lucide:plus' }"
    >
      <ProductVarietyImportForm />
    </FormDialog>
  </AssetDataTable>
</template>
