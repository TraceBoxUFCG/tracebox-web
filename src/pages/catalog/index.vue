<script setup lang="ts">
import ProductDataTable from '@/components/ProductDataTable.vue'
import { toast } from '@/components/ui/toast'
const pageStore = usePageStore()
pageStore.title = 'Catálogo'

const productStore = useProductStore()
productStore.fill()

const onClickUpdate = async (s: Supplier) => {
  toast({
    title: `Update Supplier ${s.id}`
  })
}

const onClickDelete = async (product: Product) => {
  await productStore.delete(product)
}

async function onSubmit(values: Product) {
  await productStore.createProduct(values)
}
</script>

<template>
  <ProductDataTable :onClickDelete="onClickDelete" :onClickUpdate="onClickUpdate">
    <FormDialog
      dialog-title="Cadastro de Produtos"
      dialog-description="Preencha os dados para cadastrar e depois aperte o botão de salvar"
      :dialog-trigger="{ title: 'Novo Produto', icon: 'lucide:plus' }"
    >
      <ProductForm :onSubmit="onSubmit" />
    </FormDialog>
  </ProductDataTable>
</template>
