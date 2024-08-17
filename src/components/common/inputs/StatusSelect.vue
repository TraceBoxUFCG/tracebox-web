<script setup lang="ts">
import { PurchaseOrderStatusEnum } from '@/types/purchaseOrder'
const status = defineModel<PurchaseOrderStatusEnum>('status')

const possibleStatus = [
  {
    label: 'Em Criação',
    value: PurchaseOrderStatusEnum.DRAFT
  },
  {
    label: 'Confirmado',
    value: PurchaseOrderStatusEnum.CONFIRMED
  },
  {
    label: 'Recebida',
    value: PurchaseOrderStatusEnum.RECEIVED
  },
  {
    label: 'Loteada',
    value: PurchaseOrderStatusEnum.LOTTED
  }
]
</script>

<template>
  <Select v-model="status">
    <SelectTrigger class="w-[300px]">
      <SelectValue placeholder="Selecione um status" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Status da ordem de compra</SelectLabel>
        <SelectItem v-for="status in possibleStatus" :key="status.value" :value="status.value">
          {{ status.label }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
