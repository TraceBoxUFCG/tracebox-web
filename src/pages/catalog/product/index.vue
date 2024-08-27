<script setup lang="ts">
import ProductDataTable from '@/components/product/ProductDataTable.vue'
const pageStore = usePageStore()
pageStore.title = 'Catálogo'

const productStore = useProductStore()
productStore.fill()

const onClickDelete = async (product: Product) => {
  await productStore.delete(product)
}

async function onSubmit(product: Product) {
  await productStore.createProduct(product)
}
</script>

<template>
  <ProductDataTable :onClickDelete="onClickDelete">
    <FormDialog
      dialog-title="Cadastro de Produtos"
      dialog-description="Preencha os dados para cadastrar e depois aperte o botão de salvar"
      :dialog-trigger="{ title: 'Novo Produto', icon: 'lucide:plus' }"
    >
      <ProductForm :onSubmit="onSubmit" />
    </FormDialog>
  </ProductDataTable>
</template>
