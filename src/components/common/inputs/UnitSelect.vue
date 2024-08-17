<script setup lang="ts">
import { UnitEnum } from '@/types/common'
import { useForwardPropsEmits, type SelectRootEmits, type SelectRootProps } from 'radix-vue'

const possibleUnits = [
  {
    label: 'Kilograma',
    value: UnitEnum.KG
  },
  {
    label: 'Unidade',
    value: UnitEnum.UN
  }
]

const props = defineProps<SelectRootProps>()
const emits = defineEmits<SelectRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <Select v-bind="forwarded">
    <SelectTrigger class="w-auto">
      <SelectValue placeholder="Selecione uma unidade" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Selecione a unidade</SelectLabel>
        <SelectItem v-for="unit in possibleUnits" :key="unit.value" :value="unit.value">
          {{ unit.label }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
