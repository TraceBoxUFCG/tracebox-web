<script setup lang="ts">
const pageStore = usePageStore()
pageStore.title = 'Assets'

const assetStore = useAssetStore()
assetStore.fill()
</script>

<template>
  <AssetDataTable
    :data="assetStore.assets"
    :pagination="{ total: assetStore.assetsResponse.total }"
  >
    <FormDialog
      dialog-title="Geração de Assets"
      dialog-description="Preencha a quantidade de assets deseja gerar e depois aperte o botão de salvar"
      :dialog-trigger="{ title: 'Gerar Assets', icon: 'lucide:plus' }"
    >
      <AssetTagGenerateForm :onSubmit="assetStore.generateAssetsTags" />
    </FormDialog>
  </AssetDataTable>
</template>
