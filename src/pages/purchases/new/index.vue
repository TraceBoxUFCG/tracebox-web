<script setup lang="ts">
const pageStore = usePageStore()
pageStore.title = 'Nova Ordem de Compra'
</script>

<template>
  <Card class="w-full">
    <CardHeader>
      <CardTitle>Ordens de Compra</CardTitle>
      <CardDescription>Adicione os dados para a ordem de compra</CardDescription>
    </CardHeader>
    <CardContent>
      <h1>Aqui vao os inputs</h1>
    </CardContent>
    <CardFooter class="flex justify-between px-6 pb-6">
      <Button>Adicionar item</Button>
    </CardFooter>
  </Card>
  <PurchaseOrderItemsCartDataTable />
</template>
