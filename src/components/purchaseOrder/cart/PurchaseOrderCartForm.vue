<script setup lang="ts">
import { type DateValue } from '@internationalized/date'

const expectedArrivalDate = ref<DateValue>()
const boxesQuantity = ref<number>()
</script>

<template>
  <Card class="w-full">
    <CardHeader>
      <CardTitle>Ordens de Compra</CardTitle>
      <CardDescription>Adicione os dados para a ordem de compra</CardDescription>
    </CardHeader>
    <CardContent>
      <DatePicker v-model="expectedArrivalDate" />
      <CustomNumberInput v-model:model-value="boxesQuantity" />
    </CardContent>
    <CardFooter class="flex justify-between px-6 pb-6">
      <Button>Adicionar item</Button>
    </CardFooter>
  </Card>
</template>
