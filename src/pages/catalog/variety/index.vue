<script setup lang="ts">
const pageStore = usePageStore()
pageStore.title = 'Variedade de Produtos'

const productVarietyStore = useProductVarietyStore()
productVarietyStore.fill()

const onSubmit = (file: File) => {
  productVarietyStore.importVarieties(file)
}

const onDelete = (productVariety: ProductVariety) => {
  productVarietyStore.delete(productVariety)
}
</script>

<template>
  <ProductVarietyDataTable @click-delete="onDelete">
    <FormDialog
      dialog-title="Importação de Variedades"
      dialog-description="Faça o upload do arquivo .csv para upload das variedades. O arquivo deve seguir o seguinte padrão: product_id,name"
      :dialog-trigger="{ title: 'Importar Variedades', icon: 'lucide:plus' }"
    >
      <ProductVarietyImportForm @submit="onSubmit" />
    </FormDialog>
  </ProductVarietyDataTable>
</template>
