<script setup lang="ts">
import { getLocalTimeZone, today, type DateValue } from '@internationalized/date'

const boxesQuantity = ref<number>(0)
const unitPrice = ref<number>(0)
const selectedVariety = ref<ProductVariety>()
const expectedArrivalDate = ref<DateValue>()
const selectedSupplier = ref<Supplier>()

const purchaseOrderCartStore = usePurchaseOrderCart()

const addItemToCart = () => {
  purchaseOrderCartStore.addItem(selectedVariety.value, boxesQuantity.value, unitPrice.value)
}

watch(expectedArrivalDate, () => {
  if (expectedArrivalDate.value) {
    purchaseOrderCartStore.setExpectedArrivalDate(
      expectedArrivalDate.value.toDate(getLocalTimeZone())
    )
  }
})

watch(selectedSupplier, () => {
  if (selectedSupplier.value) {
    purchaseOrderCartStore.setSupplier(selectedSupplier.value)
  }
})
</script>

<template>
  <Card class="w-full">
    <CardHeader>
      <CardTitle>Ordens de Compra</CardTitle>
      <CardDescription>Adicione os dados para a ordem de compra</CardDescription>
    </CardHeader>
    <CardContent class="flex w-full flex-row justify-between gap-5 px-10">
      <div class="flex w-full flex-col gap-2 px-10">
        <Label>Data esperada de entrega</Label>
        <DatePicker
          :min-value="today(getLocalTimeZone())"
          :default-value="today(getLocalTimeZone())"
          v-model="expectedArrivalDate"
        />
        <Label>Fornecedor</Label>
        <SupplierComboBox v-model:supplier="selectedSupplier" />
      </div>

      <div class="flex w-full flex-col gap-2 px-10">
        <Label>Produto</Label>
        <ProductVarietyComboBox v-model:variety="selectedVariety" />
        <Label>Quantidade de caixas</Label>
        <CustomNumberInput :default-value="1" v-model:model-value="boxesQuantity" />
        <Label>Preço da caixa</Label>
        <CustomNumberInput
          :default-value="1"
          :format-options="{
            minimumFractionDigits: 1
          }"
          v-model:model-value="unitPrice"
        />
      </div>
    </CardContent>
    <CardFooter class="flex items-end justify-end gap-10 px-6 pb-6">
      <Button @click="addItemToCart">
        <iconify-icon lass="mr-3 size-4" icon="lucide:plus" />
        Adicionar item
      </Button>
    </CardFooter>
  </Card>
</template>
