<script setup lang="ts">
import { PurchaseOrderStatusEnum } from '@/types/purchaseOrder'
import { useForwardPropsEmits, type SelectRootEmits, type SelectRootProps } from 'radix-vue'
import type { HTMLAttributes } from 'vue'

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

const props = defineProps<SelectRootProps & { class?: HTMLAttributes['class'] }>()
const emits = defineEmits<SelectRootEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <Select v-bind="forwarded">
    <SelectTrigger :class="props.class">
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
